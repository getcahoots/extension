import BackgroundApp from './BackgroundApp';

const backgroundApp = new BackgroundApp();
backgroundApp.initQueryService();
backgroundApp.initUpdateWorker();
backgroundApp.initChrome();
