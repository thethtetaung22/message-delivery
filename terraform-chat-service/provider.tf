terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  shared_config_files      = ["/home/thethtetaung/.aws/message-config"]
  shared_credentials_files = ["/home/thethtetaung/.aws/message-credentials"]
  region                   = "ap-southeast-1"
}
