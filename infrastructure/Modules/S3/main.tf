resource "aws_s3_bucket" "s3_bucket" {
  bucket = "dutymate-bucket-${terraform.workspace}"

  tags = {
    Environment = terraform.workspace
  }
}

resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.s3_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.s3_bucket.id

  depends_on = [
    aws_s3_bucket_public_access_block.public_access
  ]

  policy = <<POLICY
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"AllowPublicReadWriteAccess",
      "Effect":"Allow",
      "Principal": "*",
      "Action":[
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource":["arn:aws:s3:::${aws_s3_bucket.s3_bucket.id}/*"],
      "Condition": {
        "StringEquals": {
          "aws:SourceVpce": "${var.vpce_s3_id}"
        }
      }
    }
  ]
}
POLICY
}
