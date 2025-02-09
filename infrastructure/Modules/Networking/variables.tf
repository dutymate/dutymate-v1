variable "vpc_cidr" {
  type = string
}

variable "availability_zones" {
  type = list(string)
}

variable "public_subnet_cidr_block" {
}

variable "private_subnet_cidr_block" {
  type = list(string)
}

variable "database_subnet_cidr_block" {
  type = list(string)
}
