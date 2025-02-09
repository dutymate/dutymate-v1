variable "vpc_id" {
  type = string
}

variable "private_subnet_cidr_block" {
  type = list(string)
}

variable "database_subnet_cidr_block" {
  type = list(string)
}
