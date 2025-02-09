output "sg_alb_id" {
  description = "The ID of the security group for the ALB"
  value       = aws_security_group.sg_alb.id
}

output "sg_db_ssm_access_id" {
  description = "The ID of the security group for the database and SSM access"
  value       = aws_security_group.sg_db_ssm_access.id
}
