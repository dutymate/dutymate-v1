resource "aws_vpc" "vpc" {
  cidr_block           = var.cidr_block # 10.0.0.0/16 (65,536 IPs)
  instance_tenancy     = "default"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "dutymate-vpc"
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = cidrsubnet(var.cidr_block, 4, 0) # 10.0.0.0/20 (4,096 IPs)
  availability_zone       = var.availability_zone
  map_public_ip_on_launch = true

  tags = {
    Name = "dutymate-subnet-public1"
  }
}

resource "aws_subnet" "private_subnets" {
  count             = 4
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = cidrsubnet(var.cidr_block, 4, count.index + 8) # 10.0.128.0/20, 10.0.144.0/20, 10.0.160.0/20, 10.0.176.0/20
  availability_zone = var.availability_zone

  tags = {
    Name = "dutymate-subnet-private${count.index + 1}"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "dutymate-igw"
  }
}

resource "aws_route_table" "public_rtb" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = var.destination_cidr_block
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "dutymate-public-rtb"
  }
}

resource "aws_route_table_association" "rtb_subnet_asso" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rtb.id
}

resource "aws_route" "public_internet_access" {
  route_table_id         = aws_route_table.public_rtb.id
  destination_cidr_block = var.destination_cidr_block
  gateway_id             = aws_internet_gateway.igw.id
}

resource "aws_vpc_endpoint" "vpce_s3" {
  vpc_id       = aws_vpc.vpc.id
  subnet_ids   = [aws_subnet.private_subnets[0].id]
  service_name = "com.amazonaws.ap-northeast-2.s3"

  tags = {
    Name = "dutymate-vpce-s3"
  }
}
