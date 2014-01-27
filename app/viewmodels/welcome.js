define(['jquery', 'TweenMax', 'durandal/system', 'utils/shared'], 
    function($, TweenMax, system, shared) {
    
    return {
        
        $view:undefined,
        viewModel:new shared.crapVM(),
        timeline:undefined,

        // This fires first time this view loads and the DOM is ready (Views are cached)
        // It passes the partial view that this view model is associated with
        attached: function (view) { // this fires once as these views are cached
            this.$view = $(view);
            this.timeline = new shared.defaultTimelineAnimation(this.$view);
        },

        // This fires every time this view loads but is fired before the DOM is ready (TweenMax needs the DOM)
        activate: function(){
            this.$view ? this.animateIn(): null;
        },

        // This fires when you attempt to leave the page by navigating away
        canDeactivate: function () {
            var self = this;
            self.animateOut();

            return system.defer(function(dfd) {
                setTimeout((function(){
                   dfd.resolve(true); 
                }), self.timeline.duration() * 1000);

            });
        },

        animateIn: function(){
            this.timeline.restart();
        },

        animateOut: function(){
            this.timeline.reverse();
        }

    };

});