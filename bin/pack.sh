#!/usr/bin/env bash

# TODO add build version from package.json to target file name

pushd dist
zip -r cahoots-webextension-submittable .
popd -
