define(['jquery', 'TweenMax', 'durandal/system', 'utils/shared'], 
    function($, TweenMax, system, shared) {
    
    return {
        $view:undefined,
        viewModel:new shared.crapVM(),
        timelineIn:undefined,
        timelineOut:undefined,

        // This fires first time this view loads and the DOM is ready (Views are cached)
        // It passes the partial view that this view model is associated with
        attached: function (view) {
            this.$view = $(view);
            this.animateIn();
        },

        // This fires every time this view loads but is fired before the DOM is ready (TweenMax needs the DOM)
        activate: function(){
            if(this.$view !== undefined){
                this.timelineIn.restart();
            }
        },

        // This fires when you attempt to leave the page by navigating away
        canDeactivate: function () {
            var self = this;
            self.animateOut();
            
            return system.defer(function(dfd) {

                setTimeout(function(){
                    dfd.resolve(true);
                }, (self.timelineOut.duration() * 1000) + 1 );
            
            });
        },

        animateIn: function(){
            var self = this;
            this.timelineIn = new shared.defaultTimelineAnimation(this.$view);
            this.timelineIn.addCallback(function(){
                TweenMax.to(self.$view, 0, {'marginTop': '0px'});
            }, 0);
        },

        animateOut: function(){
            if(!this.timelineOut){
                this.timelineOut = new TimelineMax();
                this.timelineOut.staggerFromTo(this.$view.find("h2, blockquote, h3, li, .alert"), 
                    0.4, 
                    
                    {ease:Back.easeOut, css:{'opacity':1, 'top':"0px"}}, 
                    {css:{'opacity':0, 'top':"-40px", 'position':'relative'}}, 
                    0.02
                );
            }else{
                this.timelineOut.restart();
            }
        }


    };

});