output "vpce_s3_id" {
  description = "The ID of the VPC endpoint for S3"
  value       = aws_vpc_endpoint.vpce_s3.id
}
