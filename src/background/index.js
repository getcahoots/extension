import BackgroundScript from './BackgroundScript';

//console.log('entering background index.js');
const backgroundScript = new BackgroundScript();
backgroundScript.initQueryService();
backgroundScript.initUpdateWorker();
backgroundScript.initChrome(chrome);
//console.log('exiting background index.js')