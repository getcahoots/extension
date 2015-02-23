
# cahoots plugin build infos

## Perequisites

* mozilla addon sdk
* npm
* bower
* grunt

### install addon sdk
todo 

### install npm+bower
todo
npm -g install bower

### install grunt 
`npm install -g grunt-cli`

### prepare project
after git clone, execute: 

`npm install`

## Build

### activate addon sdk
`source bin/activate`
(run this in addon sdl folder)


### run blank firefox with addon
`grunt clean build_firefox mozilla-cfx`

### build firefox xpi
`grunt clean build_firefox mozilla-cfx-xpi`