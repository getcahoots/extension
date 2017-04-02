# Chrome/Firefox webextension for developers

## Firefox

### install

Install jpm and web-ext: 
```
npm -g install jpm
npm -g install web-ext
```

For more information see here:
https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm

### run
- Install Firefox version "developer" or "nightly" 
- set env var like this:  
```export FIREFOX_LOCATION=/Applications/FirefoxDeveloperEdition.app```
- run 
```bin/run_firefox_webextension.sh```

## Chrome

- run grunt clean default
- open chrome and manually add extension (extensions > load unpacked extension > ...)


