jQuery.comet = {
    fetching: false,
    settings: {},
    url: '',
    connect: function(url, options) {
        jQuery.comet.settings = jQuery.extend({
            timeout: 60000,
            onError: null,
            requestMethod: 'GET',
        }, options);
        jQuery.comet.url = url;
        jQuery.comet.fetch();
    },
    fetch: function() {
        if (!jQuery.comet.fetching) {
            jQuery.comet.fetching = true;
            $.ajax({
                type: jQuery.comet.settings.requestMethod,
                url: jQuery.comet.url,
            
                async: true,
                cache: true,
                timeout: jQuery.comet.settings.timeout,
                ifModified: true,
            
                success: function(data) {
                    jQuery.comet.fetching = false;
                    jQuery.comet.handle_update(data);
                    jQuery.comet.fetch();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    jQuery.comet.fetching = false;
                    if (textStatus == 'timeout') {
                        jQuery.comet.fetch();
                    } else {
                        if (jQuery.comet.settings.onError != null) {
                            jQuery.comet.settings.onError(XMLHttpRequest, textStatus, errorThrown);
                        }
                    }
                    
                },
            });
        }
    },
    handle_update: function(update) {
        event_name = 'comet_' + update.type + '_update';
        $('body').trigger(event_name, update.data);
    }
};