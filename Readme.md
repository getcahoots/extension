# Chrome/Firefox webextension 
Cahoots WebExtension for firefox and chrome. 

## install and build

cahoots webextension requires yarn.

1. install dependencies

    ```
    yarn install
    ```
2. build

    ```
    yarn run build
    ```

3. run in browser
    
    
    1. launch firefox: 

    ```
    export FIREFOX_LOCATION=<path to firefox installation>
    yarn run firefox
    ```

    2. launch chrome: 

    ```
    export CHROME_LOCATION=<path to chrome installation>
    yarn run chrome
    ``` 


## details


Firefox packaging uses [web-ext](https://github.com/mozilla/web-ext). 



