#!/bin/sh

cd /app
meteor npm install .
cp packages.json packages/packages.json
meteor &
