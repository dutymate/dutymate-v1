provider "aws" {
  profile = var.aws_profile
  region  = var.aws_region
}

module "networking" {
  source                 = "./Modules/Networking"
  availability_zone      = "ap-northeast-2a"
  cidr_block             = "10.0.0.0/16"
  destination_cidr_block = "0.0.0.0/0"
}

module "s3" {
  source      = "./Modules/S3"
  bucket_name = "dutymate-bucket-${terraform.workspace}"
}

module "ecr" {
  source           = "./Modules/ECR"
  repository_names = toset(["dutymate-backend", "dutymate-frontend"])
}
