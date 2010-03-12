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
  
Example
~~~~~~~

.. code-block:: html
  
  <script src="site/js/jquery.js" type="text/javascript"></script>
  <script src="site/js/jquery.comet.js" type="text/javascript"></script>
  <script type="text/javascript">
      $.comet.connect('/activity?channel=tweets');
  </script>
  
  
Binding to events
-----------------

This bit is a work in progress


Project Status
==============

This plugin is *very* new and has had very little testing.  In particular it has only been tested under the latest versions of firefox and chrome hitting an nginx server with the `nginx_http_push_module <http://pushmodule.slact.net/>`_.