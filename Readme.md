# Chrome/Firefox webextension 
work in progress. 

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
    yarn run firefox
    ```

    2. launch chrome: 

    ```
    yarn run chrome
    ``` 


## details
(should not be necessary anymore)
### Firefox

#### install

Install jpm and web-ext: 
```
npm -g install jpm
npm -g install web-ext
```

For more information see here:
https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm

#### run
- Install Firefox version "developer" or "nightly" 
- set env var like this:  
```export FIREFOX_LOCATION=/Applications/FirefoxDeveloperEdition.app```
- run 
```bin/run_firefox_webextension.sh```

### Chrome

- run grunt clean default
- open chrome and manually add extension (extensions > load unpacked extension > ...)


