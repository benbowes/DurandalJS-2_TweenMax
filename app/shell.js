define(['plugins/router', 'durandal/app', 'jquery', 'TweenMax', 'utils/shared', 'knockout'], 
    function (router, app, $, TweenMax, shared, ko) {
    
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
            self.router.isNavigating.subscribe( function (isNavigating) {

                if(isNavigating && !self.timeline.isActive()){
                
                    self.timeline.gotoAndPlay("pewpewpew");
                
                }else if(!isNavigating){
                
                    self.timeline.pause();
                
                }
            });
        }
    };
});