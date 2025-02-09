module "networking" {
  source                     = "./Modules/Networking"
  vpc_cidr                   = var.vpc_cidr
  availability_zones         = var.availability_zones
  public_subnet_cidr_block   = var.public_subnet_cidr_block
  private_subnet_cidr_block  = var.private_subnet_cidr_block
  database_subnet_cidr_block = var.database_subnet_cidr_block
}

module "security_group" {
  source                     = "./Modules/SecurityGroup"
  vpc_id                     = module.networking.vpc_id
  private_subnet_cidr_block  = var.private_subnet_cidr_block
  database_subnet_cidr_block = var.database_subnet_cidr_block
}

module "ssm" {
  source              = "./Modules/SSM"
  database_subnet_id  = module.networking.database_subnet_id
  sg_db_ssm_access_id = module.security_group.sg_db_ssm_access_id
}

module "alb" {
  source            = "./Modules/ALB"
  vpc_id            = module.networking.vpc_id
  public_subnet_id  = module.networking.public_subnet_id
  sg_alb_id         = module.security_group.sg_alb_id
  health_check_path = var.health_check_path
}

module "s3" {
  source     = "./Modules/S3"
  vpce_s3_id = module.networking.vpce_s3_id
}

module "ecr" {
  source = "./Modules/ECR"
}
