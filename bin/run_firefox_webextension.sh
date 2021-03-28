#!/bin/bash

function die {
  echo $1
  exit
}
test -z $FIREFOX_LOCATION && die "environment variable FIREFOX_LOCATION should point to a firefox developer or nightly installation"

npx parcel build src/manifest.json
export WEB_EXT_SOURCE_DIR=dist
npx web-ext run --firefox=$FIREFOX_LOCATION --verbose
