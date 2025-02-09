output "sg_alb_id" {
  value = aws_security_group.sg_alb.id
}

output "sg_db_ssm_access_id" {
  value = aws_security_group.sg_db_ssm_access.id
}
