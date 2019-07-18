default: test
.PHONY: default

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help

install: ## installs all the dependencies (node modules)
	npm install
.PHONY: install

test: ## runs the unit tests
	npm test
.PHONY: test

seed-data: ## starts the seed data. Requires the mocked services to be up
	npm run test:integration:seed-data
.PHONY: seed-data

integration-test: seed-data ## starts the integration test suite. Requires the mocked services to be up
	npm run test:integration:coverage
.PHONY: integration-test

run-integration-test: stop-mock-services start-mock-services build integration-test ## starts the mocked services in a Docker container, then starts the seed data + integration test suite
	$(MAKE) stop-mock-services
.PHONY: run-integration-test

start-mock-services: ## starts the mocked services in a Docker container
	cd docker/localstack && \
	TMPDIR=/private$$TMPDIR \
	docker-compose up \
		--build \
		--detach
.PHONY: start-mock-services

check-mock-services: ## check the health of the mocked services running in Docker
	npx env-cmd .env.test node -e 'require("./test-integration/seed-data/checkServiceStatus").checkServiceStatus()'
.PHONY: check-mock-services

stop-mock-services: ## stops the mocked services
	cd docker/localstack && \
	docker-compose down
.PHONY: stop-mock-services

build: clean ## compiles Typescript into JS, generates the dist folder
	npm run build
.PHONY: build

clean: ## cleans all the generated files and folders
	@rm -rf ./dist
	@rm -f ./package*.zip
.PHONY: clean
