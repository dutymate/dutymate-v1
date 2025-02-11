module "iam" {
  source = "./Modules/IAM"
}

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
  source                    = "./Modules/SSM"
  database_subnets          = module.networking.database_subnets
  sg_db_ssm_access_id       = module.security_group.sg_db_ssm_access_id
  ssm_instance_profile_name = module.iam.ssm_instance_profile_name
}

module "alb" {
  source            = "./Modules/ALB"
  vpc_id            = module.networking.vpc_id
  public_subnets    = module.networking.public_subnets
  sg_alb_id         = module.security_group.sg_alb_id
  api_cert_arn      = module.acm.api_cert_arn
  health_check_path = var.health_check_path
}

module "ecs" {
  source                    = "./Modules/ECS"
  private_subnets           = module.networking.private_subnets
  sg_ecs_id                 = module.security_group.sg_ecs_id
  target_group_arn          = module.alb.target_group_arn
  ecs_instance_profile_name = module.iam.ecs_instance_profile_name
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
  source                    = "./Modules/S3"
  vpce_s3_id                = module.networking.vpce_s3_id
  frontend_distribution_arn = module.cloudfront.frontend_distribution_arn
}

module "ecr" {
  source = "./Modules/ECR"
}

module "acm" {
  source      = "./Modules/ACM"
  domain_name = var.domain_name
}

module "route53" {
  source                                  = "./Modules/Route53"
  frontend_cert_domain_validation_options = module.acm.frontend_cert_domain_validation_options
  frontend_distribution_domain_name       = module.cloudfront.frontend_distribution_domain_name
  frontend_distribution_hosted_zone_id    = module.cloudfront.frontend_distribution_hosted_zone_id
  api_cert_domain_validation_options      = module.acm.api_cert_domain_validation_options
  alb_dns_name                            = module.alb.alb_dns_name
  alb_zone_id                             = module.alb.alb_zone_id
  route53_zone_id                         = var.route53_zone_id
  domain_name                             = var.domain_name
}

module "cloudfront" {
  source                               = "./Modules/CloudFront"
  frontend_bucket_regional_domain_name = module.s3.frontend_bucket_regional_domain_name
  frontend_cert_arn                    = module.acm.frontend_cert_arn
}
