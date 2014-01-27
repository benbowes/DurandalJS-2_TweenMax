define(['jquery', 'TweenMax', 'durandal/system', 'utils/shared', 'knockout'], 
    function($, TweenMax, system, shared, ko) {
    
    return {

        $view:undefined,
        viewModel:new shared.crapVM(),
        timeline:undefined,
        animatedNumber: ko.observable(),

        // This fires first time this view loads and the DOM is ready (Views are cached)
        // It passes the partial view that this view model is associated with
        attached: function (view) {
            this.$view = $(view);
            this.timeline = new shared.defaultTimelineAnimation(this.$view);
            this.animateText();
        },

        // This fires every time this view loads but is fired before the DOM is ready (TweenMax needs the DOM)
        activate: function(){
            this.animatedNumber(0),
            this.$view ? this.animateIn(): null;
        },

        // This fires when you attempt to leave the page by navigating away
        canDeactivate: function () {
            var self = this;
           
            return system.defer(function(dfd) {
                self.animateOut();
                setTimeout(function(){

                    TweenMax.killTweensOf(self);
                    
                    dfd.resolve(true);
                }, (self.timeline.duration() * 1000) );
            
            });
        },

        // Create my tweenmax timeline intro animation
        animateIn: function(){
            this.animateText();
            this.timeline.restart();
        },

        animateOut: function(){
            this.timeline.reverse();
        },

        // tween from one num,ber to another and update our observable
        animateText: function(){
            var self = this;

            self.aVar = 0;
            
            TweenMax.to(self, 6, {
                aVar:'1000',
                roundProps:"aVar",
                onUpdate: function(){

                    self.animatedNumber(self.aVar);
                    
                },
                overwrite:1,
                ease:Linear.easeNone
            });
        }

    };

});