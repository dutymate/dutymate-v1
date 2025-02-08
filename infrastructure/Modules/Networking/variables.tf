variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
}

variable "availability_zones" {
  description = "The list of Availability Zones in which you want to deploy the resources"
  type        = list(string)
}

variable "public_subnets" {
  description = "The list of public subnets in which you want to deploy the resources"
  type        = list(string)
}

variable "private_subnets" {
  description = "The list of private subnets in which you want to deploy the resources"
  type        = list(string)
}

variable "database_subnets" {
  description = "The list of database subnets in which you want to deploy the resources"
  type        = list(string)
}
