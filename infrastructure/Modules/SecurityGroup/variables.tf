variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
}

variable "private_subnet_ips" {
  description = "The list of private subnet IPs in which you want to deploy the resources"
  type        = list(string)
}

variable "database_subnet_ips" {
  description = "The list of database subnet IPs in which you want to deploy the resources"
  type        = list(string)
}
