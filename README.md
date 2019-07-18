# integration-tests

> Sample project to demonstrate the use of integration tests

___

- [Install dependencies](#install-dependencies)
- [Compile](#compile)
- [Unit tests](#unit-tests)
- [Integration tests](#integration-tests)
- [Environment variables](#environment-variables)
___


## Install dependencies

Requirements:
* NodeJS (v8.10+)
* Typescript
* Jest (for testing)
* Docker (for integration tests)

```
make install
```

## Compile

Run:
```
make build
```

This will compile the content of the `src` folder and generate the *js* code in the `dist` folder.


## Unit tests

Run:
```
make test
```

## Integration tests

Run:
```
make run-integration-test
```


## Environment variables

The following environment variables need to be populated:
```
# APP
SERVER_PORT=
LOGGER_LEVEL=

# AWS
AWS_SECRET_ACCESS_KEY=
AWS_ACCESS_KEY_ID=
AWS_REGION=

# ENDPOINTS
DYNAMODB_ENDPOINT=
```

Note that before the unit tests are run, the environment variables are predefined
(see `.env.test`) for their definition details.


This will use *jest* framework to run the tests matching the `*.spec.ts` naming pattern.

