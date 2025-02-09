output "target_group_arn" {
  description = "The ARN of the target group"
  value       = aws_alb_target_group.alb_target_group.arn
}
