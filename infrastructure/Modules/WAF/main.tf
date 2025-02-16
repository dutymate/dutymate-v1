resource "aws_wafv2_web_acl" "waf_web_acl" {
  name  = "dutymate-waf-web-acl"
  scope = "REGIONAL"

  default_action {
    allow {}
  }

  rule {
    name     = "RateLimitRule"
    priority = 100

    statement {
      rate_based_statement {
        limit              = 1000
        aggregate_key_type = "IP"
      }
    }

    action {
      block {}
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      sampled_requests_enabled   = true
      metric_name                = "RateLimitRule"
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    sampled_requests_enabled   = true
    metric_name                = "WebACLVisibilityConfig"
  }

  tags = {
    Name = "dutymate-waf-web-acl"
  }
}

resource "aws_wafv2_web_acl_association" "waf_alb_association" {
  resource_arn = var.alb_arn
  web_acl_arn  = aws_wafv2_web_acl.waf_web_acl.arn
}
