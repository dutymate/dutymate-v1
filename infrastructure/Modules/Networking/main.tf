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
    Name = "dutymate-subnet-public"
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

resource "aws_default_route_table" "default_route_table" {
  default_route_table_id = aws_vpc.vpc.default_route_table_id

  tags = {
    Name = "dutymate-default-rtb"
  }
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "dutymate-igw"
  }
}

resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = local.open_cidr
    gateway_id = aws_internet_gateway.internet_gateway.id
  }

  tags = {
    Name = "dutymate-public-rtb"
  }
}

resource "aws_eip" "nat_eips" {
  count = 2
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "dutymate-nat-eip${count.index + 1}"
  }
}

resource "aws_nat_gateway" "nat_gateways" {
  count         = 2
  allocation_id = aws_eip.nat_eips[count.index].id
  subnet_id     = aws_subnet.public_subnet.id

  tags = {
    Name = "dutymate-ngw${count.index + 1}"
  }
}

resource "aws_route_table" "private_route_tables" {
  count  = 2
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block     = local.open_cidr
    nat_gateway_id = aws_nat_gateway.nat_gateways[count.index].id
  }

  tags = {
    Name = "dutymate-private-rtb${count.index + 1}"
  }
}

resource "aws_route_table_association" "public_route_table_subnet_association" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "route_table_private_subnet_association" {
  count          = 2
  subnet_id      = aws_subnet.private_subnets[count.index].id
  route_table_id = aws_route_table.private_route_tables[count.index].id
}

resource "aws_vpc_endpoint" "vpce_s3" {
  vpc_id            = aws_vpc.vpc.id
  vpc_endpoint_type = "Gateway"
  service_name      = "com.amazonaws.ap-northeast-2.s3"
  route_table_ids   = [aws_route_table.private_route_tables[0].id]

  tags = {
    Name = "dutymate-vpce-s3"
  }
}
