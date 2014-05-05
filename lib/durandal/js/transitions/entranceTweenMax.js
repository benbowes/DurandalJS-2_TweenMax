/**
 * Durandal 2.0.1 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
 * Available via the MIT license.
 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
 */
/**
 * The entrance transition module.
 * @module entranceTweenMax
 * @requires system
 * @requires composition
 * @requires jquery
 */
define(['durandal/system', 'durandal/composition', 'jquery', 'TweenMax'], function(system, composition, $, TweenMax) {

    /**
     * @class EntranceModule
     * @constructor
     */
    var entranceTweenMax = function(context) {
        return system.defer(function(dfd) {

            var self = this,
                $child = $(context.child),
                $activeView = $(context.activeView);
			
			TweenMax.to($child, 0, {'display':'block', autoAlpha:0});
			
            function endTransition() {
                //console.log("endTransition");
                dfd.resolve();
            }

            function scrollIfNeeded() {
                if (!context.keepScrollPosition) {
                    $(document).scrollTop(0);
                }
            }

            if (!context.child) {
               TweenMax.to( $activeView, 0.2, {css:{autoAlpha:0, 'display':'none', ease:Quint.easeIn}, onCompleteScope:self,  onComplete:endTransition });
            } else {

                function startTransition() {
                    //console.log("startTransition");

                    scrollIfNeeded();
                    context.triggerAttach();
                    
                    try{
                        TweenMax.killChildTweensOf($child);
                    }catch(err){
                        // console.log("Child tweens do not exist");
                    }

                    $child.css('opacity',0);
                    TweenMax.to( $child, 0.6, {css:{autoAlpha:1, 'display':'block'}, onCompleteScope:self,  onComplete:endTransition });
                }

                if (context.activeView) {
                    TweenMax.to( $activeView, 0.2, {css:{autoAlpha:0, 'display':'none', ease:Quint.easeIn}, onCompleteScope:self,  onComplete:startTransition });
                } else {
                    startTransition();
                }
            }
        }).promise();
    };

    return entranceTweenMax;
});
