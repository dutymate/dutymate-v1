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
  family       = "dutymate-ecs-task"
  network_mode = "awsvpc"

  container_definitions = jsonencode([
    {
      name      = "dutymate-container",
      image     = "dutymate/dutymate-api:latest",
      memory    = 512,
      cpu       = 256,
      essential = true,
      portMappings = [{
        containerPort = 8080,
        hostPort      = 8080,
        protocol      = "tcp"
      }]
    }
  ])
}

resource "aws_ecs_service" "ecs_service" {
  name            = "dutymate-service"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.ecs_task_definition.arn
  desired_count   = 2

  network_configuration {
    subnets         = var.private_subnets
    security_groups = [var.sg_ecs_id]
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_port   = 8080
    container_name   = "dutymate-container"
  }
}

data "aws_ssm_parameter" "ecs_ami" {
  name = "/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id"
}

resource "aws_launch_template" "ecs_lt" {
  name                   = "dutymate-ecs-launch-template"
  image_id               = data.aws_ssm_parameter.ecs_ami.value
  instance_type          = "t2.micro"
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

resource "aws_autoscaling_group" "asg" {
  max_size            = 3
  min_size            = 1
  desired_capacity    = 2
  vpc_zone_identifier = var.private_subnets

  launch_template {
    id      = aws_launch_template.ecs_lt.id
    version = "$Latest"
  }

  health_check_type = "ELB"
}
