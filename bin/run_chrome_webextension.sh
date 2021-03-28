#!/bin/bash

function die {
  echo $1
  exit
}
test -z "$CHROME_LOCATION" && die "environment variable CHROME_LOCATION should point to a chrome installation"

npx parcel build src/manifest.json
export WEB_EXT_DIST_DIR=dist

"$CHROME_LOCATION" --user-data-dir=profiles/chrome/ --load-extension=$WEB_EXT_DIST_DIR --no-first-run

