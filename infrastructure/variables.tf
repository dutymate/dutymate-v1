variable "aws_profile" {
  type = string
}

variable "aws_region" {
  type = string
}

variable "vpc_cidr" {
  type = string
}

variable "availability_zones" {
  type = list(string)
}

variable "public_subnet_cidr_block" {
  type = list(string)
}

variable "private_subnet_cidr_block" {
  type = list(string)
}

variable "database_subnet_cidr_block" {
  type = list(string)
}

variable "health_check_path" {
  type = string
}
