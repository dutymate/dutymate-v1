output "vpc_id" {
  value = aws_vpc.vpc.id
}

output "public_subnet_id" {
  value = aws_subnet.public_subnet.id
}

output "private_subnet_id" {
  value = aws_subnet.private_subnet.id
}

output "database_subnet_id" {
  value = aws_subnet.database_subnet.id
}

output "vpce_s3_id" {
  value = aws_vpc_endpoint.vpce_s3.id
}
