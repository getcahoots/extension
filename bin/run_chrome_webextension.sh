#!/bin/bash

function die {
  echo $1
  exit
}
test -z "$CHROME_LOCATION" && die "environment variable CHROME_LOCATION should point to a firefox developer or nightly installation"

"$CHROME_LOCATION" --user-data-dir=profiles/chrome/ --load-extension=target/exploded-chrome --no-first-run

