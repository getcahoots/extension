import ContentScript from './ContentScript';
import Messenger from './Messenger';
import DocumentScanner from './DocumentScanner';
import Highlighter from './Highlighter';
import TooltipsterWrapper from './TooltipsterWrapper';

// console.log('entering content index.js');

const messenger = new Messenger(chrome);
const documentScanner = new DocumentScanner(document);
const highlighter = new Highlighter();
const tooltipsterWrapper = new TooltipsterWrapper();

const contentScript = new ContentScript(
    messenger,
    documentScanner,
    highlighter,
    tooltipsterWrapper
);
contentScript.runInTab(document);
// console.log('exiting content index.js')
