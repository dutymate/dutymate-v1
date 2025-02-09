variable "vpc_id" {
  description = "The ID of the VPC in which you want to deploy the resources"
  type        = string
}

variable "public_subnet_id" {
  description = "The list of public subnets in which you want to deploy the resources"
  type        = string
}

variable "sg_alb_id" {
  description = "The ID of the security group for the ALB"
  type        = string
}

variable "health_check_path" {
  description = "The path to use for the health check"
  type        = string
}
