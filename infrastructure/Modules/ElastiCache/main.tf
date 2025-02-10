resource "aws_elasticache_serverless_cache" "valkey" {
  name                 = "dutymate-valkey"
  engine               = "valkey"
  major_engine_version = "7"
  security_group_ids   = [var.sg_valkey_id]
  subnet_ids           = var.database_subnets

  cache_usage_limits {
    data_storage {
      maximum = 1
      unit    = "GB"
    }
    ecpu_per_second {
      maximum = 1000
    }
  }

  tags = {
    Name = "dutymate-valkey"
  }
}
