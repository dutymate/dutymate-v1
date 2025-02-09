output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.vpc.id
}

output "public_subnet_id" {
  description = "The list of public subnets in which you want to deploy the resources"
  value       = aws_subnet.public_subnet.id
}

output "private_subnet_id" {
  description = "The list of private subnets in which you want to deploy the resources"
  value       = aws_subnet.private_subnet.id
}

output "database_subnet_id" {
  description = "The list of database subnets in which you want to deploy the resources"
  value       = aws_subnet.database_subnet.id
}

output "vpce_s3_id" {
  description = "The ID of the VPC endpoint for S3"
  value       = aws_vpc_endpoint.vpce_s3.id
}
