provider "aws" {
  region = "us-east-1"
  alias  = "virginia"
}

resource "aws_acm_certificate" "frontend_cert" {
  provider          = aws.virginia
  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "dutymate-acm-cert"
  }

}

resource "aws_acm_certificate" "api_cert" {
  domain_name       = "api.${var.domain_name}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "dutymate-acm-cert"
  }
}
