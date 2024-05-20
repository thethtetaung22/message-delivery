resource "aws_security_group" "chat" {
  name_prefix = "chat"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 15672
    to_port     = 15672
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "chat" {
  ami           = "ami-0be48b687295f8bd6" // ubuntu22.04
  instance_type = "t2.medium"
  tags = {
    Name = "test"
  }
  key_name = "thethtetaung"
  vpc_security_group_ids = [
    aws_security_group.chat.id,
  ]
  user_data = <<-EOF
    #!/bin/bash
    apt install net-tools -y
    apt update
    apt install docker.io -y
    apt install docker-compose -y 
    # Create Docker Compose file
    cat <<EOL > /home/ubuntu/docker-compose.yml
    version: '3.8'

    services:
      message:
        image: thethtet/message-message:latest
        command: npm run start:dev message
        depends_on:
          - rabbitmq
          - mongodb
      gateway:
        image: thethtet/message-gateway:latest
        command: npm run start:dev gateway
        depends_on:
          - message
          - rabbitmq
        ports:
          - '3000:3000'
      rabbitmq:
        image: rabbitmq:3-management
        container_name: rabbitmq
        hostname: rabbitmq
        volumes:
          - /var/lib/rabbitmq
        ports:
          - '5672:5672'
          - '15672:15672'
      mongodb:
        image: mongo:6-jammy
        ports:
          - '27017:27017'
        volumes:
          - dbdata6:/data/db

    volumes:
      dbdata6:
    EOL

    cd /home/ubuntu && docker-compose up -d
    EOF
}

output "public_ip" {
  value = aws_instance.chat.public_ip
}
