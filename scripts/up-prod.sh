#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/"

docker compose -f "$DIR/../docker-compose-prod.yml" --env-file "$DIR/../.env" up