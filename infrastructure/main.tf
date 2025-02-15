module "acm" {
  source          = "./Modules/ACM"
  domain_name     = var.domain_name
  route53_zone_id = var.route53_zone_id
}

module "alb" {
  source              = "./Modules/ALB"
  vpc_id              = module.networking.vpc_id
  public_subnets      = module.networking.public_subnets
  sg_alb_id           = module.security_group.sg_alb_id
  alb_certificate_arn = module.acm.alb_certificate_arn
  health_check_path   = var.health_check_path
}

module "cloudfront" {
  source                               = "./Modules/CloudFront"
  frontend_bucket_regional_domain_name = module.s3.frontend_bucket_regional_domain_name
  cloudfront_certificate_arn           = module.acm.cloudfront_certificate_arn
  aws_region                           = var.aws_region
  domain_name                          = var.domain_name
}

module "cloudwatch" {
  source = "./Modules/CloudWatch"
}

module "documentdb" {
  source           = "./Modules/DocumentDB"
  database_subnets = module.networking.database_subnets
  sg_mongodb_id    = module.security_group.sg_mongodb_id
  mongodb_username = var.mongodb_username
  mongodb_password = var.mongodb_password
}

module "ecr" {
  source = "./Modules/ECR"
}

module "ecs" {
  source                      = "./Modules/ECS"
  aws_region                  = var.aws_region
  private_subnets             = module.networking.private_subnets
  sg_ecs_id                   = module.security_group.sg_ecs_id
  target_group_arn            = module.alb.target_group_arn
  ecs_instance_profile_name   = module.iam.ecs_instance_profile_name
  ecs_service_role_arn        = module.iam.ecs_service_role_arn
  ecs_task_execution_role_arn = module.iam.ecs_task_execution_role_arn
  ecs_task_role_arn           = module.iam.ecs_task_execution_role_arn
  ecr_repository_url          = module.ecr.ecr_repository_url
  asset_bucket_arn            = module.s3.asset_bucket_arn
  log_group_name              = module.cloudwatch.log_group_name
}

module "elasticache" {
  source           = "./Modules/ElastiCache"
  database_subnets = module.networking.database_subnets
  sg_valkey_id     = module.security_group.sg_valkey_id
}

module "iam" {
  source = "./Modules/IAM"
}

module "networking" {
  source                     = "./Modules/Networking"
  aws_region                 = var.aws_region
  vpc_cidr                   = var.vpc_cidr
  availability_zones         = var.availability_zones
  public_subnet_cidr_block   = var.public_subnet_cidr_block
  private_subnet_cidr_block  = var.private_subnet_cidr_block
  database_subnet_cidr_block = var.database_subnet_cidr_block
  sg_vpce_ecr_id             = module.security_group.sg_vpce_ecr_id
  sg_vpce_ssm_id             = module.security_group.sg_vpce_ssm_id
}

module "rds" {
  source           = "./Modules/RDS"
  database_subnets = module.networking.database_subnets
  sg_mysql_id      = module.security_group.sg_mysql_id
  mysql_username   = var.mysql_username
  mysql_password   = var.mysql_password
}

module "route53" {
  source                                 = "./Modules/Route53"
  cloudfront_distribution_domain_name    = module.cloudfront.cloudfront_distribution_domain_name
  cloudfront_distribution_hosted_zone_id = module.cloudfront.cloudfront_distribution_hosted_zone_id
  alb_dns_name                           = module.alb.alb_dns_name
  alb_zone_id                            = module.alb.alb_zone_id
  route53_zone_id                        = var.route53_zone_id
  domain_name                            = var.domain_name
}

module "s3" {
  source                      = "./Modules/S3"
  vpce_s3_id                  = module.networking.vpce_s3_id
  cloudfront_distribution_arn = module.cloudfront.cloudfront_distribution_arn
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
  sg_ssm_ec2_id             = module.security_group.sg_ssm_ec2_id
  ssm_instance_profile_name = module.iam.ssm_instance_profile_name
}
