locals {
  availability_zone = "ap-northeast-2a"
  cidr              = "10.0.0.0/16"
  open_cidr         = "0.0.0.0/0"
}

resource "aws_vpc" "vpc" {
  cidr_block           = local.cidr # 10.0.0.0/16 (65,536 IPs)
  instance_tenancy     = "default"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "dutymate-vpc"
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = cidrsubnet(local.cidr, 4, 0) # 10.0.0.0/20 (4,096 IPs)
  availability_zone       = local.availability_zone
  map_public_ip_on_launch = true

  tags = {
    Name = "dutymate-subnet-public1"
  }
}

resource "aws_subnet" "private_subnets" {
  count             = 4
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = cidrsubnet(local.cidr, 4, count.index + 8) # 10.0.128.0/20, 10.0.144.0/20, 10.0.160.0/20, 10.0.176.0/20
  availability_zone = local.availability_zone

  tags = {
    Name = "dutymate-subnet-private${count.index + 1}"
  }
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "dutymate-internet-gateway"
  }
}

resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = local.open_cidr
    gateway_id = aws_internet_gateway.internet_gateway.id
  }

  tags = {
    Name = "dutymate-public-route-table"
  }
}

resource "aws_route_table_association" "public_route_table_subnet_association" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route" "internet_access" {
  route_table_id         = aws_route_table.public_route_table.id
  destination_cidr_block = local.open_cidr
  gateway_id             = aws_internet_gateway.internet_gateway.id
}

resource "aws_vpc_endpoint" "vpce_s3" {
  vpc_id       = aws_vpc.vpc.id
  subnet_ids   = [aws_subnet.private_subnets[0].id]
  service_name = "com.amazonaws.ap-northeast-2.s3"

  tags = {
    Name = "dutymate-vpce-s3"
  }
}
