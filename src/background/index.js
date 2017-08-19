import BackgroundApp from './BackgroundApp';

console.log('entering background index.js');
const backgroundApp = new BackgroundApp();
backgroundApp.initQueryService();
backgroundApp.initUpdateWorker();
backgroundApp.initChrome();
console.log('exiting background index.js')