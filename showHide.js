(function($) {

    $.showHide = function(element, options) {

        var $element = $(element),
            element = element;
        
        // plugin's default options
        // this is private property and is  accessible only from inside the plugin
        var defaults = {

            content: $( '#' + $element.attr('id') + '_content'), // this should default to something super easy.. $1_content, for example -- pj
            text_visible: $element.html(),
            text_hidden: $element.html(),
            animate: false,

            onHide: function() {},
            onShow: function() {}

        }

        // to avoid confusions, use "plugin" to reference the current instance of the object
        var plugin = this;

        // this will hold the merged default, and user-provided options
        // plugin's properties will be available through this object like:
        // plugin.settings.propertyName from inside the plugin or
        // element.data('pluginName').settings.propertyName from outside the plugin, where "element" is the
        // element the plugin is attached to;
        plugin.settings = {}

        plugin.init = function() {
            // the plugin's final properties are the merged default and user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);
            
            // click the element, toggle the content
            $element.click(function(){
                var content = $(plugin.settings.content);
                
                // check the visibility of the content, and the toggle
                checkVisibility(content) ? hideContent(content) : showContent(content);
            });

        }

        var checkVisibility = function(element){
            return element.is(":visible");
        } // checkVisibility
        
        var hideContent = function(content){
            if( plugin.settings.animate )
                content.slideUp();
            else
                content.hide();
            $element.html(plugin.settings.text_hidden);
            if(typeof plugin.settings.onHide === "function" )
                plugin.settings.onHide();
        } // hideContent
        
        var showContent = function(content){
            if( plugin.settings.animate )
                content.slideDown();
            else
                content.show();
            $element.html(plugin.settings.text_visible);
            if(typeof plugin.settings.onShow === "function" )
                plugin.settings.onShow();
        } // showContent


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