output "sg_alb_id" {
  value = aws_security_group.sg_alb.id
}

output "sg_mysql_id" {
  value = aws_security_group.sg_mysql.id
}

output "sg_db_ssm_access_id" {
  value = aws_security_group.sg_db_ssm_access.id
}
