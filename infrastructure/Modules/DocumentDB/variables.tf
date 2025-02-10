variable "database_subnets" {
  type = list(string)
}

variable "sg_mongodb_id" {
  type = string
}

variable "mongodb_username" {
  type = string
}

variable "mongodb_password" {
  type = string
}
