variable "environment_name" {
  description = "The name of the environment (e.g., dev, staging, prod)"
  type        = string
}

variable "bucket_name" {
  description = "The base name of the S3 bucket"
  type        = string
}
