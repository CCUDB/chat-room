#!/bin/bash

command -v crystal > /dev/null 2>&1 || { echo 'Require crystal to build. Abort'; exit 1; }

cd eazydb
crystal deps build eazydb

cd ..
cd node_modules/node-eazydb
yarn install
yarn run build

