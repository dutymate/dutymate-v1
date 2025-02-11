output "api_cert_arn" {
  value = aws_acm_certificate.api_cert.arn
}

output "api_cert_domain_validation_options" {
  value = aws_acm_certificate.api_cert.domain_validation_options
}
