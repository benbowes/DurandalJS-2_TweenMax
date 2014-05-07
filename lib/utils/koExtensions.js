define(['jquery', 'TweenMax', 'knockout'], function ($, TweenMax, ko) {

    ko.bindingHandlers.preloadIMG = {

        //init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {},

        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

            // This will be called once when the binding is first applied to an element,
            // and again whenever the associated observable changes value.

            var $element = $(element),
                $loader = $element.parent().find(".thumb__loader").first(), 
                srcURL = valueAccessor(),
                tempIMG = new Image();


            // Set image alpha and visibility to 0/hidden
            TweenMax.set($element, {x:"-260px"});

            // Create a temporary image plus an onload for this image
            // When load completes, fade in and kill temp img
            tempIMG.onload = function(){

                TweenMax.fromTo($element, 1, {x:"-260px"},{x:"0", ease:Power4.easeOut});
                
                TweenMax.set($loader, {delay: 0.4, autoAlpha:0});
                
                tempIMG = null;
            
            }
            
            // Start load of temporary img
            tempIMG.src = srcURL;
        }
    };

});