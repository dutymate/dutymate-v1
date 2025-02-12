variable "private_subnets" {
  type = list(string)
}

variable "sg_ecs_id" {
  type = string
}

variable "target_group_arn" {
  type = string
}

variable "ecs_instance_profile_name" {
  type = string
}

variable "ecs_task_execution_role_arn" {
  type = string
}

variable "ecr_repository_url" {
  type = string
}

variable "asset_bucket_arn" {
  type = string
}
