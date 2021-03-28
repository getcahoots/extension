import Messenger from './Messenger';
import UiFormatter from './UiFormatter';
import '../jquery/jquery-global';
import '../../bower_components/tooltipster/js/jquery.tooltipster';

import contentProperties from './contentProperties';

export default class TooltipsterWrapper {

    applyTooltipsterHandler(document) {
        //console.log('entering applyTooltipsterHandler ', contentProperties.tooltip.animation);
        const messenger = new Messenger(chrome);
        const uiFormatter = new UiFormatter(document);

        //console.log('> call tooltipster');
        jQuery('span[class*=CahootsID]', document).tooltipster({
            contentAsHTML: false,
            content: jQuery('<span/>').text(contentProperties.snippets.loading_text),
            interactive: contentProperties.tooltip.interactive,
            animation: contentProperties.tooltip.animation,
            delay: contentProperties.tooltip.delay,
            speed: contentProperties.tooltip.speed,
            timer: contentProperties.tooltip.timer,
            autoClose: contentProperties.tooltip.autoClose,
            functionBefore: function (origin, continueTooltip) {
                //console.log('functionBefore enter')
                continueTooltip();
                const id = jQuery(this).attr('class').replace(' tooltipstered', '');
                const strippedId = id.split("_")[1];

                messenger.findAuthorDetails(strippedId).then(data => {
                    //console.log('creating details view');
                    const fullCahootsOverlayContent = uiFormatter.createDetailsView(document, this, data);
                    origin.tooltipster('content', fullCahootsOverlayContent);
                    //console.log('creating details view done');
                });
                //console.log('functionBefore exit')
            }
        });
        //console.log('< called tooltipster')
    }
}
