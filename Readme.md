# Chrome/Firefox webextension 
Cahoots WebExtension for firefox and chrome. 

## build distribution bundle from source code
This information is also relevant to code reviewers from Mozila, Google etc. 

The Cahoots webextension requires yarn to build. 
In order to create the bundle as shipped in the extension, follow these steps: 

1. checkout the source code repo with git
2. install dependencies

    ```
    yarn install
    ```
2. build

    ```
    yarn run build
    ```

Now you've got the bundle as shipped in the extension. 

## run locally in browser

For both you first need to build the bundle as described above. 

1. to run in firefox: 

```
export FIREFOX_LOCATION=<path to firefox installation>
yarn run firefox
```
note: firefox developer edition might be required.

2. to run in chrome: 

```
export CHROME_LOCATION=<path to chrome installation>
yarn run chrome
``` 


## details


Packaging uses [web-ext](https://github.com/mozilla/web-ext) and [parcel](https://v2.parceljs.org/). 



