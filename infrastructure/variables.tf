variable "aws_profile" {
  description = "The profile name that you have configured in the file .aws/credentials"
  type        = string
}

variable "aws_region" {
  description = "The AWS Region in which you want to deploy the resources"
  type        = string
}

variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
}

variable "availability_zones" {
  description = "The list of Availability Zones in which you want to deploy the resources"
  type        = list(string)
}

variable "public_subnet_ips" {
  description = "The list of public subnet IPs in which you want to deploy the resources"
  type        = list(string)
}

variable "private_subnet_ips" {
  description = "The list of private subnet IPs in which you want to deploy the resources"
  type        = list(string)
}

variable "database_subnet_ips" {
  description = "The list of database subnet IPs in which you want to deploy the resources"
  type        = list(string)
}
