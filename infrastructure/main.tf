module "networking" {
  source              = "./Modules/Networking"
  vpc_cidr            = var.vpc_cidr
  availability_zones  = var.availability_zones
  public_subnet_ips   = var.public_subnet_ips
  private_subnet_ips  = var.private_subnet_ips
  database_subnet_ips = var.database_subnet_ips
}

module "security_group" {
  source = "./Modules/SecurityGroup"
  vpc_id = module.networking.vpc_id
}

module "s3" {
  source     = "./Modules/S3"
  vpce_s3_id = module.networking.vpce_s3_id
}

module "ecr" {
  source = "./Modules/ECR"
}
