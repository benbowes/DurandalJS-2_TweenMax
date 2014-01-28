define(['jquery', 'TweenMax', 'durandal/system', 'utils/shared'], 
    function($, TweenMax, system, shared) {
    
    return {
        $view:undefined,
        viewModel:new shared.crapVM(),
        timelineIn:undefined,
        timelineOut:undefined,
        dfd:undefined,

        // This fires first time this view loads and the DOM is ready (Views are cached)
        // It passes the partial view that this view model is associated with
        attached: function (view) {
        	var self = this;
            this.$view = $(view);
            this.timelineIn = new shared.defaultTimelineAnimation(this.$view);   
            this.timelineIn.addCallback(function(){
                TweenMax.to(self.$view, 0, {'marginTop': '0px'});
            }, 0);
  
            this.timelineOut = new TimelineMax({onComplete:this.tweenMaxAnimationCompleted, onCompleteParams:[this]});
			this.timelineOut.staggerFromTo(this.$view.find("h2, blockquote, h3, li, .alert"), 
				0.4, 
				{ease:Back.easeOut, css:{'opacity':1, 'top':"0px"}}, 
				{css:{'opacity':0, 'top':"-40px", 'position':'relative'}}, 
				0.02
			);
			this.timelineOut.pause();
		
        },

        // This fires every time this view loads but is fired before the DOM is ready (TweenMax needs the DOM)
        activate: function(){
            (this.$view !== undefined) ? this.animateIn(): null;
        },

        // This fires when you attempt to leave the page by navigating away
        canDeactivate: function () {
            var self = this;
            self.animateOut();
            
            return system.defer(function(dfd){
            	self.dfd = dfd;
            });
        },

        animateIn: function(){
            this.timelineIn.restart();
        },

        animateOut: function(){
            this.timelineOut.restart();
        },

		// TweenMax callback used to resolve the deferred upon animation complete
        tweenMaxAnimationCompleted: function(scope){
        	scope.dfd.resolve(true);
        }
        
    };

});