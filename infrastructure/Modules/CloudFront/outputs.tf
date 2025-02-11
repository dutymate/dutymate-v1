output "frontend_distribution_domain_name" {
  value = aws_cloudfront_distribution.frontend_distribution.domain_name
}

output "frontend_distribution_hosted_zone_id" {
  value = aws_cloudfront_distribution.frontend_distribution.hosted_zone_id
}

output "frontend_distribution_arn" {
  value = aws_cloudfront_distribution.frontend_distribution.arn
}

