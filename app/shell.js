define(['plugins/router', 'durandal/app', 'jquery', 'TweenMax', 'utils/shared', 'knockout'], 
    function (router, app, $, TweenMax, shared, ko) {
    
    ko.bindingHandlers.preloadIMG = {

        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            //console.log("h", $(element)[0], $(element).parent().find(".thumb__loader").first()[0]);
        },

        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called once when the binding is first applied to an element,
            // and again whenever the associated observable changes value.

            var $element = $(element),
                $loader = $element.parent().find(".thumb__loader").first(),
                srcURL = valueAccessor(),
                tempIMG = new Image();

            TweenMax.set($element, {autoAlpha:0});

            tempIMG.onload = function(){
                TweenMax.fromTo($element, 0.6, {marginLeft:"-260px"},{marginLeft:"0", autoAlpha:1, ease:Quint.easeOut});
                TweenMax.to($loader, 0.4, {autoAlpha:0, ease:Quint.easeOut});
                tempIMG = null;
            }
            tempIMG.src = srcURL;
        }

    };

    return {
        router: router,
        $view: undefined,
        timeline: undefined,
        
        activate: function () {
            router.map([
                {
                    route: '',
                    title:'Welcome',
                    moduleId: 'viewmodels/welcome',
                    nav: true
                },
                {
                    route: 'flickr',
                    title:'Flickr Page',
                    moduleId: 'viewmodels/flickr',
                    nav: true
                },
                {
                    route: 'detail',
                    title:'Detail page',
                    moduleId: 'viewmodels/detail',
                    nav: true
                },
                {
                    route: 'other',
                    title: 'Other',
                    moduleId: 'viewmodels/other',
                    nav: true
                },
                {
                    route: 'again',
                    title: 'Again',
                    moduleId: 'viewmodels/again',
                    nav: true
                }
            ]).buildNavigationModel();

            return router.activate();
        },

        attached: function (view) {
            var self = this,
                $view = $(view);
            
            // Create loading animation
            self.timeline = new shared.animatedLoader($view.find(".loader"));

            // Listen to the isNavigating observable...
            // When navigating, start playing from beginning
            // When not navigating, pause  
            self.router.isNavigating.subscribe(function(isNavigating) {
                if(isNavigating && !self.timeline.isActive()){
                    self.timeline.gotoAndPlay("pewpewpew");
                }else if(!isNavigating){
                    self.timeline.pause();
                }
            });
          
        }
    };
});