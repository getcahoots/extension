
# cahoots extension

## Perequisites

* npm
* bower
* grunt




### install npm + grunt-cli  + bower-cli
todo: npm
`# sudo npm install -g grunt-cli`
`# sudo npm install -g bower-cli`

### fetch project dependencies
after git clone, cd into extension and execute:

`npm install`
`bower install`
### install mozilla addon sdk (one time)
grunt mozilla-addon-sdk


## Build
Build for Firefox and Chrome:
`grunt`


### run firefox xpi
`grunt clean run_firefox`


## generate test key for chrome packaging
`openssl genrsa -out development-test.key 4096`