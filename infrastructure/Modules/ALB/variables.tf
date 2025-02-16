variable "alb_certificate_arn" {
  type = string
}

variable "health_check_path" {
  type = string
}

variable "public_subnets" {
  type = list(string)
}

variable "sg_alb_id" {
  type = string
}

variable "vpc_id" {
  type = string
}
