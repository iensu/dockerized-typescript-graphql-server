#!/bin/bash

docker-compose -f docker-compose.yml -f docker-compose.integration-test.yml \
               up \
               --build --abort-on-container-exit --exit-code-from test-runner
docker-compose down --volumes
