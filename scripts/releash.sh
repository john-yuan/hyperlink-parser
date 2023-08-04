#!/bin/bash

cd $(dirname $0)/..

pwd

rm -rf build
rm -rf es
rm -rf dist

npm run build
npm run build:es
