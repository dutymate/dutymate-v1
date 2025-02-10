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
  database_subnets    = module.networking.database_subnets
  sg_db_ssm_access_id = module.security_group.sg_db_ssm_access_id
}

module "alb" {
  source            = "./Modules/ALB"
  vpc_id            = module.networking.vpc_id
  public_subnets    = module.networking.public_subnets
  sg_alb_id         = module.security_group.sg_alb_id
  health_check_path = var.health_check_path
}

module "rds" {
  source           = "./Modules/RDS"
  database_subnets = module.networking.database_subnets
  sg_mysql_id      = module.security_group.sg_mysql_id
  mysql_username   = var.mysql_username
  mysql_password   = var.mysql_password
}

module "elasticache" {
  source           = "./Modules/ElastiCache"
  database_subnets = module.networking.database_subnets
  sg_valkey_id     = module.security_group.sg_valkey_id
}

module "documentdb" {
  source           = "./Modules/DocumentDB"
  database_subnets = module.networking.database_subnets
  sg_mongodb_id    = module.security_group.sg_mongodb_id
  mongodb_username = var.mongodb_username
  mongodb_password = var.mongodb_password
}

module "s3" {
  source     = "./Modules/S3"
  vpce_s3_id = module.networking.vpce_s3_id
}

module "ecr" {
  source = "./Modules/ECR"
}
