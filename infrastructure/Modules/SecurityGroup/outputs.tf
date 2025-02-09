output "sg_alb_id" {
  description = "The ID of the security group for the ALB"
  value       = aws_security_group.sg_alb.id
}
