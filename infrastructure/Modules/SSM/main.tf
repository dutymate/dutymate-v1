data "aws_ami" "amazonlinux2" {
  owners      = ["amazon"]
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm*"]
  }
}

resource "aws_iam_role" "ssm_role" {
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = { Service = "ec2.amazonaws.com" },
        Action    = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name = "dutymate-ssm-role"
  }
}

resource "aws_iam_role_policy_attachment" "ssm_attach" {
  role       = aws_iam_role.ssm_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ssm_instance_profile" {
  role = aws_iam_role.ssm_role.name

  tags = {
    Name = "dutymate-ssm-instance-profile"
  }
}

resource "aws_instance" "db_access_instance" {
  ami                         = data.aws_ami.amazonlinux2.id
  instance_type               = "t2.micro"
  subnet_id                   = var.database_subnet_id
  associate_public_ip_address = false
  iam_instance_profile        = aws_iam_instance_profile.ssm_instance_profile.name
  vpc_security_group_ids      = [var.sg_db_ssm_access_id]

  tags = {
    Name = "dutymate-db-access-instance"
  }
}
