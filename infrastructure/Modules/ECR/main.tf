resource "aws_ecr_repository" "aws_ecr_repository" {
  for_each             = var.repository_names
  name                 = each.value
  image_tag_mutability = "MUTABLE"
}
