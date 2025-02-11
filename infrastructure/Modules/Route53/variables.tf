variable "frontend_cert_domain_validation_options" {
  type = set(object({
    domain_name           = string
    resource_record_name  = string
    resource_record_value = string
    resource_record_type  = string
  }))
}

variable "frontend_distribution_domain_name" {
  type = string
}

variable "frontend_distribution_hosted_zone_id" {
  type = string
}

variable "api_cert_domain_validation_options" {
  type = set(object({
    domain_name           = string
    resource_record_name  = string
    resource_record_value = string
    resource_record_type  = string
  }))
}

variable "alb_dns_name" {
  type = string
}

variable "alb_zone_id" {
  type = string
}


variable "route53_zone_id" {
  type = string
}

variable "domain_name" {
  type = string
}
