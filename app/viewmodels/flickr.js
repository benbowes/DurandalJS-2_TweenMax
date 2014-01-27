define(['plugins/http', 'durandal/app', 'knockout', 'jquery', 'TweenMax', 'durandal/system', 'utils/shared'], 
    function (http, app, ko, $, TweenMax, system, shared) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    return {
        $view:undefined,
        displayName: 'Casa Batlló',
        images: ko.observableArray([]),
        timeline:undefined,
        loaderTimeline:undefined,

        // This fires first time this view loads and the DOM is ready (Views are cached)
        // It passes the partial view that this view model is associated with
        attached: function (view) {
            this.$view = $(view);
            this.timeline = new TimelineMax();

            this.loaderTimeline = new shared.animatedLoaderSmall(this.$view.find(".thumb__loader"));
            
            this.timeline.timeScale(1).staggerFromTo(this.$view.find("h2, blockquote, h3, li, .alert"), 
                0.4, 
                {
                    css:{'opacity':0, 'top':"40px", 'position':'relative'}
                }, 
                {
                    css:{'opacity':1, 'top':"0px"}, ease:Back.easeOut 
                }, 
                0.05
            );
        },
        
        // This fires every time this view loads but is fired before the DOM is ready (TweenMax needs the DOM)
        activate: function () {
            var self = this;

            if(this.$view !== undefined){
                self.animateIn();
            }

            if (self.images().length > 0) {
                return;
            }else{
                return http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', { tags: self.displayName, tagmode: 'any', format: 'json' }, 'jsoncallback').then(function(response) {
                    self.images(response.items);
                });
            }
        },
       
        // This fires when you attempt to leave the page by navigating away
        canDeactivate: function () {
            var self = this;
            self.animateOut();

            return system.defer(function(dfd) {
                setTimeout((function(){
                   dfd.resolve(true); 
                }), self.timeline.duration() * 1000 );
            });
        },

        // Create my tweenmax timeline intro animation
        animateIn: function(){
            this.timeline.timeScale(1).restart(); 
        },

        // On animate away my tweenmax timeline intro animation reverses at 1.5 times speed
        animateOut: function(){
            this.timeline.timeScale(1.5).reverse();
        }

        /*,
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
         //   return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        }*/

    };
});