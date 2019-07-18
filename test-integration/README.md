# integration tests

> Integration tests suite + seed data

___

- [How it works](#how-it-works)
- [Important](#important)
- [Pre-requisite](#pre-requisite)
- [Run the test suite](#run-the-test-suite)
- [List of commands](#list-of-commands)
___


## How it works

The folder is divided into the following:
- `seed-data`: the scripts used to initialise the dependencies and seed the data prior to running the tests.
- `tests`: the various integration tests separated into endpoint / functionality.


## Important

The `seed-data` scripts need to be run before the tests suite. This is so the AWS services are provided with the appropriate configuration and initial data (ie, DB tables are created, SSM parameters are present...).


## Pre-requisite

Before being able to run the `integration tests`, you will need the **mocked services** to be up-and-running.

To do so:
- check out the steps detailed in [docker README](../docker/README.md#start-the-mocked-services)
- or from the root of the project, run: `make start-mock-services`
 
 
## Run the test suite
 
From the root of the project, run: `make integration-test`
 
 
## List of commands
 
- make `seed-data`
- make `integration-test`
- make `run-integration-test`
- make `start-mock-services`
- make `check-mock-services`
- make `stop-mock-services`
