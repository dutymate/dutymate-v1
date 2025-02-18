module "acm" {
  source          = "./Modules/ACM"
  domain_name     = var.domain_name
  route53_zone_id = var.route53_zone_id
}

module "alb" {
  source              = "./Modules/ALB"
  alb_certificate_arn = module.acm.alb_certificate_arn
  health_check_path   = var.health_check_path
  public_subnets      = module.networking.public_subnets
  sg_alb_id           = module.security_group.sg_alb_id
  vpc_id              = module.networking.vpc_id
}

module "cloudfront" {
  source                               = "./Modules/CloudFront"
  aws_region                           = var.aws_region
  cloudfront_certificate_arn           = module.acm.cloudfront_certificate_arn
  domain_name                          = var.domain_name
  frontend_bucket_regional_domain_name = module.s3.frontend_bucket_regional_domain_name
}

module "cloudwatch" {
  source = "./Modules/CloudWatch"
}

module "documentdb" {
  source           = "./Modules/DocumentDB"
  database_subnets = module.networking.database_subnets
  mongodb_password = var.mongodb_password
  mongodb_username = var.mongodb_username
  sg_mongodb_id    = module.security_group.sg_mongodb_id
}

module "ecr" {
  source = "./Modules/ECR"
}

module "ecs" {
  source                      = "./Modules/ECS"
  asset_bucket_arn            = module.s3.asset_bucket_arn
  aws_region                  = var.aws_region
  ecr_repository_url          = module.ecr.ecr_repository_url
  ecs_instance_profile_name   = module.iam.ecs_instance_profile_name
  ecs_service_role_arn        = module.iam.ecs_service_role_arn
  ecs_task_execution_role_arn = module.iam.ecs_task_execution_role_arn
  ecs_task_role_arn           = module.iam.ecs_task_role_arn
  log_group_name              = module.cloudwatch.log_group_name
  private_subnets             = module.networking.private_subnets
  sg_ecs_id                   = module.security_group.sg_ecs_id
  target_group_arn            = module.alb.target_group_arn
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
  availability_zones         = var.availability_zones
  database_subnet_cidr_block = var.database_subnet_cidr_block
  private_subnet_cidr_block  = var.private_subnet_cidr_block
  public_subnet_cidr_block   = var.public_subnet_cidr_block
  sg_vpce_ecr_id             = module.security_group.sg_vpce_ecr_id
  sg_vpce_ssm_id             = module.security_group.sg_vpce_ssm_id
  vpc_cidr                   = var.vpc_cidr
}

module "rds" {
  source           = "./Modules/RDS"
  database_subnets = module.networking.database_subnets
  mysql_password   = var.mysql_password
  mysql_username   = var.mysql_username
  sg_mysql_id      = module.security_group.sg_mysql_id
}

module "route53" {
  source                                 = "./Modules/Route53"
  alb_dns_name                           = module.alb.alb_dns_name
  alb_zone_id                            = module.alb.alb_zone_id
  cloudfront_distribution_domain_name    = module.cloudfront.cloudfront_distribution_domain_name
  cloudfront_distribution_hosted_zone_id = module.cloudfront.cloudfront_distribution_hosted_zone_id
  domain_name                            = var.domain_name
  google_site_verification_code          = var.google_site_verification_code
  route53_zone_id                        = var.route53_zone_id
}

module "s3" {
  source                      = "./Modules/S3"
  cloudfront_distribution_arn = module.cloudfront.cloudfront_distribution_arn
  vpce_s3_id                  = module.networking.vpce_s3_id
}

module "security_group" {
  source                     = "./Modules/SecurityGroup"
  database_subnet_cidr_block = var.database_subnet_cidr_block
  private_subnet_cidr_block  = var.private_subnet_cidr_block
  vpc_id                     = module.networking.vpc_id
}

module "ssm" {
  source                    = "./Modules/SSM"
  database_subnets          = module.networking.database_subnets
  sg_ssm_ec2_id             = module.security_group.sg_ssm_ec2_id
  ssm_instance_profile_name = module.iam.ssm_instance_profile_name
}

module "waf" {
  source  = "./Modules/WAF"
  alb_arn = module.alb.alb_arn
}
