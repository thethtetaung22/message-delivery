terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  shared_config_files      = ["/Users/thethtetaung/message-config"]
  shared_credentials_files = ["/Users/thethtetaung/message-credential"]
  region                   = "ap-southeast-1"
}
