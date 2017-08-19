#!/bin/bash

function die {
  echo $1
  exit
}
test -z "$CHROME_LOCATION" && die "environment variable CHROME_LOCATION should point to a chrome installation"

"$CHROME_LOCATION" --user-data-dir=profiles/chrome/ --load-extension=build --no-first-run

