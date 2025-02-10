variable "private_subnets" {
  type = list(string)
}

variable "sg_ecs_id" {
  type = string
}

variable "target_group_arn" {
  type = string
}
