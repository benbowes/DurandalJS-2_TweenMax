define(['plugins/router', 'jquery', 'TweenMax', 'durandal/system', 'utils/shared'], 
    function(router, $, TweenMax, system, shared) {
    
    return {
        
        router:router,
        $view:undefined,
        viewModel:new shared.crapVM(),
        timeline:undefined, // TweenMax Timeline
        dfd:undefined,

        // This fires first time this view loads and the DOM is ready (Views are cached)
        // It passes the partial view that this view model is associated with
        attached: function (view) { // this fires once as these views are cached
            this.$view = $(view);
            this.timeline = new shared.defaultTimelineAnimation(this.$view, this.tweenMaxAnimationCompleted, this);   
        },

        // This fires every time this view loads but is fired before the DOM is ready (TweenMax needs the DOM)
        activate: function (){
            (this.$view !== undefined) ? this.animateIn(): null;
        },

        // This fires when you attempt to leave the page by navigating away
        canDeactivate: function () {
            var self = this;
            self.animateOut();
            
            return system.defer(function (dfd){
            	self.dfd = dfd;
            });
        },

        animateIn: function (){
            this.timeline.restart();
        },

        animateOut: function (){
            this.timeline.reverse();
        },
        
        // TweenMax callback used to resolve the deferred upon animation complete
        tweenMaxAnimationCompleted: function(scope){
        	scope.dfd.resolve(true);
        }

    };

});