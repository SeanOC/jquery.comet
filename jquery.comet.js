jQuery.comet = {
    fetching: false,
    settings: {},
    url: '',
    bound: {},
    connect: function(url, options) {
        jQuery.comet.settings = jQuery.extend({
            timeout: 60000,
            onError: null,
            requestMethod: 'GET',
            typeAttr: 'type',
            dataAttr: 'data'
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
                        jQuery.comet.fetch()
                    } else {
                        if (jQuery.comet.settings.onError != null) {
                            jQuery.comet.settings.onError(XMLHttpRequest, textStatus, errorThrown);
                        }
                        setTimeout(jQuery.comet.fetch, 10000);
                    }
                    
                }
            });
        }
    },
    handle_update: function(update) {
        type = null;
        data = update;
        
        if (update[jQuery.comet.settings.typeAttr]) {
            type = update[jQuery.comet.settings.typeAttr];
        }
        if (update[jQuery.comet.settings.dataAttr]) {
            data = update[jQuery.comet.settings.dataAttr];
        }
        
        jQuery.comet.trigger(type, data);
    },
    bind: function(func, type) {
        if (!type) {
            type = '__all__';
        }
        if (jQuery.isArray(jQuery.comet.bound[type])) {
            if (!jQuery.inArray(func, jQuery.comet.bound)) {
                jQuery.comet.bound[type].push(func);
            }
        } else {
            jQuery.comet.bound[type] = [func];
        }
    },
    unbind: function(func, type) {
        if (!type) {
            type = '__all__';
        }
        if (jQuery.isArray(jQuery.comet.bound[type])) {
            index = jQuery.inArray(func, jQuery.comet.bound[type]);
            if (index != -1) {
                jQuery.comet.bound[type].splice(index, 1);
            }
        }
    },
    trigger: function(type, data) {
        call = function (index, func) {
            func(data, type);
        }
        bound = jQuery.comet.bound;
        if (bound['__all__']) {
            jQuery.each(bound.__all__, call);
        }
        if (jQuery.isArray(bound[type])) {
            jQuery.each(bound[type], call);
        }
    }
};
