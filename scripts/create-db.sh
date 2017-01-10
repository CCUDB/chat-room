#!/bin/bash

cd "$(dirname "$0")/.."
mkdir -p db
eazydb/bin/eazydb <<< 'create {"path": "db/chat-db", "schema": [["uid", "str"], ["content", "str"]]}'
