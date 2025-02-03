variable "aws_profile" {
  description = "The profile name that you have configured in the file .aws/credentials"
  type        = string
  default     = "dutymate-admin"
}

variable "aws_region" {
  description = "The AWS Region in which you want to deploy the resources"
  type        = string
  default     = "ap-northeast-2"
}
