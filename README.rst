============
jQuery.comet
============

This is a `jQuery <http://jquery.com>`_ plugin to make it easier to work with a comet server.  If your not familiar with what comet is, this `ajaxian <http://ajaxian.com/archives/comet-a-new-approach-to-ajax-applications>`_ article gives a pretty good (altho slightly out of date) overview.  jQuery.comet handles maintaining the connection to the server (long-polling) and makes server updates available as events.

Getting Started
===============

Like any other jQuery plugin, simply include ``jquery.comet.js`` in your page after your jQuery include and you will have a ``comet`` attribute available on your jQuery object (``$``).  From this comet you will be able to connect to a comet server and bind to events from that source.

Connecting to a comet server
----------------------------

To connect to a comet server call ``$.comet.connect()``.  ``connect`` takes a url and an options object as parameters.  Below are the available options:

timeout
  Time in milliseconds until the long-polling connection times out and re-establishes.  Defaults to 60000.
  
onError
  A function to be called when a non-timeout error occurs when connecting to the server.
  
requestMethod
  The method used to connect to server.  This defaults to ``GET`` and is something which you probably shouldn't change unless you have a very specific reason.
  
typeAttr
  Comet events can either be bound to all updates or updates of a given type.  The type of an event is determined by the value of a special attribute in the data pushed out by the server.  By default this is set to ``type``.  If set to ``null``, only functions bound for all events will get called.
  
dataAttr
  Similar to the typeAttr, the value of the special data attribute in the pushed data will get passed as the ``data`` attribute to bound functions.  If this is set to ``null`` or if the special data attribute isn't found in the pushed data, the full value pushed will get passed to any bound functions.
  
Binding to events
-----------------

The plugin will trigger custom events in the ``.comet`` namespace for each blob of data pushed out by the comet server.  Use the regular jQuery bind/unbind methods to attach your event handlers, and bind to ``.comet`` to catch all events (see examples below).

Event handlers will be passed the parameters ``data`` and ``type``: the value of the ``data`` attribute in the pushed data (configurable via ``dataAttr``) and the ``type`` attribute in the pushed data (configurable via ``typeAttr``). If a ``data`` attribute is unavailable or ``dataAttr`` has been set to ``null``, the whole data push will be passed in.

Example
~~~~~~~

Below is some example use of the plugin::
  
  <script src="site/js/jquery.js" type="text/javascript"></script>
  <script src="site/js/jquery.comet.js" type="text/javascript"></script>
  <script type="text/javascript">
      function updateFeed(event, data) {
          $('ul#feed').append("<li>" + data.message + "</li>");
      }
      
      function catchAll(event, data, type) {
          console.log(data);
          console.log(type);
      }
  
      $.comet.connect('/activity?channel=tweets');
      $(document).bind('feed.comet', updateFeed);
      $(document).bind('.comet', catchAll);
      
      $('#kill-button').click(function() {
          $(document).unbind('comet.feed', updateFeed);
      });
  </script>
  
  




Project Status
==============

This plugin is *very* new and has had very little testing.  In particular it has only been tested under the latest versions of firefox and chrome hitting an nginx server with the `nginx_http_push_module <http://pushmodule.slact.net/>`_.
