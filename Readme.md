# Chrome/Firefox webextension 
Cahoots WebExtension for firefox and chrome. 

## build distribution bundle from source code
Information given in this section is also relevant for code reviewers from Mozila, Google etc. 


The Cahoots web-extension requires node version 12 and yarn to build (newer versions of node might work). 
In order to create the bundle as shipped with the extension, follow these steps: 

1. get the source code 
   Unless you haven't received the source code already: check out the git repo on github.
   (as mozilla reviewer you might have received a copy of the code and don't need to checkout the repo)
   
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



