resource "aws_vpc" "vpc" {
  cidr_block           = var.vpc_cidr
  instance_tenancy     = "default"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "dutymate-vpc"
  }
}

resource "aws_subnet" "public_subnets" {
  count                   = 2
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.public_subnet_cidr_block[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "dutymate-public-subnet${count.index + 1}"
  }
}

resource "aws_subnet" "private_subnets" {
  count             = 2
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = var.private_subnet_cidr_block[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "dutymate-private-subnet${count.index + 1}"
  }
}

resource "aws_subnet" "database_subnets" {
  count             = 2
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = var.database_subnet_cidr_block[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "dutymate-database-subnet${count.index + 1}"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "dutymate-igw"
  }
}

resource "aws_eip" "ngw_eip" {
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "dutymate-ngw-eip"
  }
}

resource "aws_nat_gateway" "ngw" {
  allocation_id = aws_eip.ngw_eip.id
  subnet_id     = aws_subnet.public_subnets[0].id

  tags = {
    Name = "dutymate-ngw"
  }
}

resource "aws_default_route_table" "default_route_table" {
  default_route_table_id = aws_vpc.vpc.default_route_table_id

  tags = {
    Name = "dutymate-default-route-table"
  }
}

resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "dutymate-public-route-table"
  }
}

resource "aws_route_table_association" "public_route_table_assoc" {
  count          = 2
  subnet_id      = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table" "private_route_table" {
  count  = 2
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.ngw.id
  }

  tags = {
    Name = "dutymate-private-route-table${count.index + 1}"
  }
}

resource "aws_route_table_association" "private_route_table_assoc" {
  count          = 2
  subnet_id      = aws_subnet.private_subnets[count.index].id
  route_table_id = aws_route_table.private_route_table[count.index].id
}

resource "aws_route_table" "database_route_table" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "dutymate-database-route-table"
  }
}

resource "aws_route_table_association" "database_route_table_assoc" {
  count          = 2
  subnet_id      = aws_subnet.database_subnets[count.index].id
  route_table_id = aws_route_table.database_route_table.id
}

resource "aws_vpc_endpoint" "vpce_s3" {
  vpc_id            = aws_vpc.vpc.id
  vpc_endpoint_type = "Gateway"
  service_name      = "com.amazonaws.${var.aws_region}.s3"
  route_table_ids   = [aws_route_table.private_route_table[0].id, aws_route_table.private_route_table[1].id]

  tags = {
    Name = "dutymate-vpce-s3"
  }
}

resource "aws_vpc_endpoint" "vpec_ecr_api" {
  vpc_id              = aws_vpc.vpc.id
  vpc_endpoint_type   = "Interface"
  service_name        = "com.amazonaws.${var.aws_region}.ecr.api"
  private_dns_enabled = true
  subnet_ids          = aws_subnet.private_subnets[*].id
  security_group_ids  = [var.sg_vpce_ecr_id]

  tags = {
    Name = "dutymate-vpce-ecr-api"
  }
}

resource "aws_vpc_endpoint" "vpec_ecr_dkr" {
  vpc_id              = aws_vpc.vpc.id
  vpc_endpoint_type   = "Interface"
  service_name        = "com.amazonaws.${var.aws_region}.ecr.dkr"
  private_dns_enabled = true
  subnet_ids          = aws_subnet.private_subnets[*].id
  security_group_ids  = [var.sg_vpce_ecr_id]

  tags = {
    Name = "dutymate-vpce-ecr-dkr"
  }
}

resource "aws_vpc_endpoint" "vpce_ssm" {
  vpc_id              = aws_vpc.vpc.id
  vpc_endpoint_type   = "Interface"
  service_name        = "com.amazonaws.${var.aws_region}.ssm"
  subnet_ids          = aws_subnet.database_subnets[*].id
  security_group_ids  = [var.sg_vpce_ssm_id]
  private_dns_enabled = true

  tags = {
    Name = "dutymate-vpce-ssm"
  }
}

resource "aws_vpc_endpoint" "vpce_ssmmessages" {
  vpc_id              = aws_vpc.vpc.id
  vpc_endpoint_type   = "Interface"
  service_name        = "com.amazonaws.${var.aws_region}.ssmmessages"
  subnet_ids          = aws_subnet.database_subnets[*].id
  security_group_ids  = [var.sg_vpce_ssm_id]
  private_dns_enabled = true

  tags = {
    Name = "dutymate-vpce-ssmmessages"
  }
}

resource "aws_vpc_endpoint" "vpce_ec2messages" {
  vpc_id              = aws_vpc.vpc.id
  vpc_endpoint_type   = "Interface"
  service_name        = "com.amazonaws.${var.aws_region}.ec2messages"
  subnet_ids          = aws_subnet.database_subnets[*].id
  security_group_ids  = [var.sg_vpce_ssm_id]
  private_dns_enabled = true

  tags = {
    Name = "dutymate-vpce-ec2messages"
  }
}
