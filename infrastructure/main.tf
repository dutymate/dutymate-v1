provider "aws" {
  profile = var.aws_profile
  region  = var.aws_region
}

module "s3" {
  source = "./Modules/S3"

  bucket_name = "dutymate-bucket-${terraform.workspace}"
}
