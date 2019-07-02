COMPOSE_PROJECT_NAME=gestionale-admin

COMPOSE=docker-compose --project-name=$(COMPOSE_PROJECT_NAME) -f docker/docker-compose.yml
DEVCOMPOSE=$(COMPOSE)
PRODCOMPOSE=$(COMPOSE)

.PHONY: upd
upd:
	$(PRODCOMPOSE) up -d

.PHONY: up
up:
	$(PRODCOMPOSE) up

.PHONY: down
down:
	$(PRODCOMPOSE) down

.PHONY: devup
devup:
	$(COMPOSE) build
	$(DEVCOMPOSE) up

.PHONY: devupd
devupd:
	$(DEVCOMPOSE) up -d

.PHONY: build
build:
	$(COMPOSE) build

.PHONY: devdown
devdown:
	$(DEVCOMPOSE) down

.PHONY: devclear
devclear:
	$(DEVCOMPOSE) rm