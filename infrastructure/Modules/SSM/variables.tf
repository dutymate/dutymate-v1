variable "database_subnets" {
  type = list(string)
}

variable "sg_db_ssm_access_id" {
  type = string
}

variable "ssm_instance_profile_name" {
  type = string
}
