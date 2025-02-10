output "ssm_instance_profile_name" {
  value = aws_iam_instance_profile.ssm_instance_profile.name
}

output "ecs_instance_profile_name" {
  value = aws_iam_instance_profile.ecs_instance_profile.name
}
