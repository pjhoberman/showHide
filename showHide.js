// remember to change every instance of "pluginName" to the name of your plugin!
(function($) {

    // here we go!
    $.showHide = function(element, options) {

        // plugin's default options
        // this is private property and is  accessible only from inside the plugin
        var defaults = {

            content: '', // this should default to something super easy.. $1_content, for example -- pj

            // if your plugin is event-driven, you may provide callback capabilities for its events.
            // execute these functions before or after events of your plugin, so that users may customize
            // those particular events without changing the plugin's code
            onFoo: function() {} // like, onHide... -- pj

        }

        // to avoid confusions, use "plugin" to reference the current instance of the object
        var plugin = this;

        // this will hold the merged default, and user-provided options
        // plugin's properties will be available through this object like:
        // plugin.settings.propertyName from inside the plugin or
        // element.data('pluginName').settings.propertyName from outside the plugin, where "element" is the
        // element the plugin is attached to;
        plugin.settings = {}

        var $element = $(element),  // reference to the jQuery version of DOM element the plugin is attached to
             element = element;        // reference to the actual DOM element

        // the "constructor" method that gets called when the object is created
        plugin.init = function() {
            // the plugin's final properties are the merged default and user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);
            
            // check element visibility
            if( checkVisibility( plugin.settings.content ) ){ // visible
                console.log( 'visible' );
            } // if
            else { // hidden
                console.log( 'hidden' );
            } // else
            

        }

        // public methods
        // these methods can be called like:
        // plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
        // element.data('pluginName').publicMethod(arg1, arg2, ... argn) from outside the plugin, where "element"
        // is the element the plugin is attached to;

        // a public method. for demonstration purposes only - remove it!
        //plugin.foo_public_method = function() {

            // code goes here

        //}

        // private methods
        // these methods can be called only from inside the plugin like:
        // methodName(arg1, arg2, ... argn)

        var checkVisibility = function(element){
            return $(element).is(":visible");
        
        } // check_visibility


        // fire up the plugin!
        // call the "constructor" method
        plugin.init();

    }

    // add the plugin to the jQuery.fn object
    $.fn.showHide = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('showHide')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.showHide(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
                // element.data('pluginName').settings.propertyName
                $(this).data('showHide', plugin);

            }

        });

    }

})(jQuery);