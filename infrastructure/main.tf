provider "aws" {
  profile     = var.aws_profile
  region      = var.aws_region
}

module "s3" {
  source = "./Modules/S3"

  bucket_name      = "dutymate-bucket-${var.environment_name}"
  environment_name = var.environment_name
}
