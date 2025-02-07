resource "aws_ecr_repository" "ecr_repository" {
  for_each             = var.service_names
  name                 = "dutymate/${each.value}"
  image_tag_mutability = "MUTABLE"

  tags = {
    Service = each.value
  }
}

resource "aws_ecr_lifecycle_policy" "lifecycle_policy" {
  for_each   = var.service_names
  repository = aws_ecr_repository.ecr_repository[each.key].name

  policy = <<EOF
  {
    "rules": [
      {
        "rulePriority": 1,
        "description": "Keep image deployed with tag latest",
        "selection": {
          "tagStatus": "tagged",
          "tagPrefixList": ["latest"],
          "countType": "imageCountMoreThan",
          "countNumber": 1
        },
        "action": {
          "type": "expire"
        }
      },
      {
        "rulePriority": 2,
        "description": "Keep last 2 any images",
        "selection": {
          "tagStatus": "any",
          "countType": "imageCountMoreThan",
          "countNumber": 2
        },
        "action": {
          "type": "expire"
        }
      }
    ]
  }
  EOF
}
