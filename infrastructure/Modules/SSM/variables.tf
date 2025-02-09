variable "database_subnet_id" {
  description = "The ID of the database subnet"
  type        = string
}

variable "sg_db_ssm_access_id" {
  description = "The ID of the security group for the database and SSM access"
  type        = string
}
