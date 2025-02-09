variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
}

variable "availability_zones" {
  description = "The list of Availability Zones in which you want to deploy the resources"
  type        = list(string)
}

variable "public_subnet_cidr_block" {
  description = "The list of public subnet IPs in which you want to deploy the resources"
}

variable "private_subnet_cidr_block" {
  description = "The list of private subnet IPs in which you want to deploy the resources"
  type        = list(string)
}

variable "database_subnet_cidr_block" {
  description = "The list of database subnet IPs in which you want to deploy the resources"
  type        = list(string)
}
