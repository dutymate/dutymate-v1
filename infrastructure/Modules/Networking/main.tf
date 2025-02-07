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
  count             = 2
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = cidrsubnet(local.cidr, 4, count.index + 8) # 10.0.128.0/20, 10.0.144.0/20
  availability_zone = local.availability_zone

  tags = {
    Name = "dutymate-subnet-private${count.index + 1}"
  }
}

resource "aws_default_route_table" "route_table_default" {
  default_route_table_id = aws_vpc.vpc.default_route_table_id

  tags = {
    Name = "dutymate-rtb-default"
  }
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "dutymate-igw"
  }
}

resource "aws_route_table" "route_table_public" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = local.open_cidr
    gateway_id = aws_internet_gateway.internet_gateway.id
  }

  tags = {
    Name = "dutymate-rtb-public"
  }
}

resource "aws_eip" "nat_eip" {
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "dutymate-nat-eip"
  }
}

resource "aws_nat_gateway" "nat_gateway" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public_subnet.id

  tags = {
    Name = "dutymate-ngw"
  }
}

resource "aws_route_table" "route_table_private1" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block     = local.open_cidr
    nat_gateway_id = aws_nat_gateway.nat_gateway.id
  }

  tags = {
    Name = "dutymate-rtb-private1"
  }
}

resource "aws_route_table" "route_table_private2" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "dutymate-rtb-private2"
  }
}

resource "aws_route_table_association" "route_table_public_subnet_association" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.route_table_public.id
}

resource "aws_route_table_association" "route_table_private_subnet1_association" {
  subnet_id      = aws_subnet.private_subnets[0].id
  route_table_id = aws_route_table.route_table_private1.id
}

resource "aws_route_table_association" "route_table_private_subnet2_association" {
  subnet_id      = aws_subnet.private_subnets[1].id
  route_table_id = aws_route_table.route_table_private2.id

}

resource "aws_vpc_endpoint" "vpce_s3" {
  vpc_id            = aws_vpc.vpc.id
  vpc_endpoint_type = "Gateway"
  service_name      = "com.amazonaws.ap-northeast-2.s3"
  route_table_ids   = [aws_route_table.route_table_private1.id]

  tags = {
    Name = "dutymate-vpce-s3"
  }
}
