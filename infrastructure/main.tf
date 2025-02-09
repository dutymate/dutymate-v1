module "networking" {
  source              = "./Modules/Networking"
  vpc_cidr            = var.vpc_cidr
  availability_zones  = var.availability_zones
  public_subnet_ips   = var.public_subnet_ips
  private_subnet_ips  = var.private_subnet_ips
  database_subnet_ips = var.database_subnet_ips
}

module "security_group" {
  source              = "./Modules/SecurityGroup"
  vpc_id              = module.networking.vpc_id
  private_subnet_ips  = var.private_subnet_ips
  database_subnet_ips = var.database_subnet_ips
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
