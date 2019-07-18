# docker - tools

> Set of tools to run the integration tests via Docker

___

- [Pre-requisites](#pre-requisites)
- [Start the mocked services](#start-the-mocked-services)
- [Health-checks](#health-checks)
___


## Pre-requisites

You need the following installed:
- Docker

**IMPORTANT:**

The services will download the latest Docker image of `localstack/localstack`. 


## Start the mocked services

Go to the `localstack` folder, then run:
```bash
docker-compose pull && \
TMPDIR=/private$TMPDIR docker-compose up \
  --build \
  --detach
```

This will:
```text
Spin up Localstack for the following services:
  - DynamoDB
```

You can check the logs by running:
```bash
docker-compose logs
```


## Health-checks

- To test if localstack and your tables are running:
```bash
aws dynamodb scan --table-name Person --endpoint-url=http://localhost:4569
```
