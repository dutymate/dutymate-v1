locals {
  service_names = toset(["backend", "frontend"])
}

module "networking" {
  source   = "./Modules/Networking"
  vpc_cidr = "10.0.0.0/16"
}

module "s3" {
  source     = "./Modules/S3"
  vpce_s3_id = module.networking.vpce_s3_id
}

module "ecr" {
  source        = "./Modules/ECR"
  service_names = local.service_names
}
