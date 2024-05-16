# Message Delivery System

## Installation

```bash
$ yarn
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

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```