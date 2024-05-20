# Message Delivery System

## Installation

```bash
yarn
```

# Prerequirements

```bash
# Run with Docker
- Install and configure docker

# Run local
- Install and configure RabbitMQ server
- Install and configure MongoDB server
```

## Running the app

```bash
# Docker 
$ docker-compose build
$ docker-compose up

# For running in local machine

# development
$ yarn run start gateway
$ yarn run start message

# watch mode
$ yarn run start:dev gateway
$ yarn run start:dev message

# production mode
$ yarn run start:prod gateway
$ yarn run start:prod message
```

## Terraform

1. Create config file named "message-config" and add following

```bash
[default]
region = ap-southeast-1
output = json

```

2. Create credential file named "message-credential" and add following

```bash
[default]
aws_access_key_id=REPLACE_WITH_YOUR_KEY
aws_secret_access_key=REPLACE_WITH_YOUR_KEY

```

Update Config file directory in terraform-chat-service/provider.tf

3. Create ssh key

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/my_new_key1
```

4. Run commands

```bash
terraform init
terraform plan
terraform apply
```
