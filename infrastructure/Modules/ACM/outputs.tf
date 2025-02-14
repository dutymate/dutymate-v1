output "cloudfront_certificate_arn" {
  value = aws_acm_certificate.cloudfront_certificate.arn
}

output "alb_certificate_arn" {
  value = aws_acm_certificate.alb_certificate.arn
}
