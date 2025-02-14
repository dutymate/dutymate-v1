resource "aws_ecs_cluster" "ecs_cluster" {
  name = "dutymate-ecs-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "dutymate-ecs-cluster"
  }
}

resource "aws_ecs_task_definition" "ecs_task_definition" {
  family             = "dutymate-ecs-task"
  network_mode       = "awsvpc"
  execution_role_arn = var.ecs_task_execution_role_arn
  task_role_arn      = var.ecs_task_role_arn

  container_definitions = jsonencode([
    {
      name      = "dutymate-container",
      image     = "${var.ecr_repository_url}:latest",
      memory    = 1024,
      cpu       = 512,
      essential = true,
      portMappings = [{
        containerPort = 8080,
        hostPort      = 8080,
        protocol      = "tcp"
      }],
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          "awslogs-group"         = "${var.log_group_name}",
          "awslogs-region"        = "${var.aws_region}",
          "awslogs-stream-prefix" = "app"
        }
      },
      environmentFiles = [
        {
          value = "${var.asset_bucket_arn}/environments/.env",
          type  = "s3"
        }
      ]
    }
  ])

  tags = {
    Name = "dutymate-ecs-task"
  }
}

resource "aws_ecs_service" "ecs_service" {
  name                               = "dutymate-service"
  cluster                            = aws_ecs_cluster.ecs_cluster.id
  task_definition                    = aws_ecs_task_definition.ecs_task_definition.arn
  desired_count                      = 2
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 100

  load_balancer {
    target_group_arn = var.target_group_arn
    container_port   = 8080
    container_name   = "dutymate-container"
  }

  network_configuration {
    subnets         = var.private_subnets
    security_groups = [var.sg_ecs_id]
  }
}

data "aws_ssm_parameter" "ecs_ami" {
  name = "/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id"
}

resource "aws_launch_template" "ecs_launch_template" {
  name                   = "dutymate-ecs-launch-template"
  image_id               = data.aws_ssm_parameter.ecs_ami.value
  instance_type          = "t3.small"
  vpc_security_group_ids = [var.sg_ecs_id]

  iam_instance_profile {
    name = var.ecs_instance_profile_name
  }

  instance_market_options {
    market_type = "spot"
  }

  user_data = base64encode(<<EOF
#!/bin/bash
echo ECS_CLUSTER=${aws_ecs_cluster.ecs_cluster.name} >> /etc/ecs/ecs.config
EOF
  )
}

resource "aws_autoscaling_group" "ecs_asg" {
  name                  = "dutymate-ecs-asg"
  max_size              = 3
  min_size              = 1
  desired_capacity      = 2
  vpc_zone_identifier   = var.private_subnets
  health_check_type     = "EC2"
  protect_from_scale_in = true

  enabled_metrics = [
    "GroupMinSize",
    "GroupMaxSize",
    "GroupDesiredCapacity",
    "GroupInServiceInstances",
    "GroupPendingInstances",
    "GroupStandbyInstances",
    "GroupTerminatingInstances",
    "GroupTotalInstances"
  ]

  launch_template {
    id      = aws_launch_template.ecs_launch_template.id
    version = "$Latest"
  }

  instance_refresh {
    strategy = "Rolling"
  }

  lifecycle {
    create_before_destroy = true
  }

  tag {
    key                 = "Name"
    value               = "dutymate-ecs-asg"
    propagate_at_launch = true
  }
}

resource "aws_ecs_capacity_provider" "capacity_provider" {
  name = "dutymate-capacity-provider"

  auto_scaling_group_provider {
    auto_scaling_group_arn         = aws_autoscaling_group.ecs_asg.arn
    managed_termination_protection = "ENABLED"

    managed_scaling {
      maximum_scaling_step_size = 5
      minimum_scaling_step_size = 1
      status                    = "ENABLED"
      target_capacity           = 100
    }
  }

  tags = {
    Name = "dutymate-capacity-provider"
  }
}

resource "aws_ecs_cluster_capacity_providers" "capacity_provider_association" {
  cluster_name       = aws_ecs_cluster.ecs_cluster.name
  capacity_providers = [aws_ecs_capacity_provider.capacity_provider.name]
}
