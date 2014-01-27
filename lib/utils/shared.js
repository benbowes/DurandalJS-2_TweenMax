define(['jquery', 'TimelineMax'], function ($, TimelineMax) {

    var shared = {
        
        defaultTimelineAnimation: function($view){
        	tl = new TimelineMax();
        	tl.staggerFromTo($view.find("h2, blockquote, h3, li, .alert"), 
                0.4,
                {
                    css:{'opacity':0, 'top':"40px", 'position':'relative'}
                }, 
                {
                    ease:Back.easeOut, css:{'opacity':1, 'top':"0px"}
                }, 
                0.02
            );

            return tl;
        },

        crapVM: function(){
            return {
                    displayName:'Barcelona!',
                    description:'Here are some interesting facts about the Spanish/Catalonian city of Barcelona',
                    features:[
                        'Barcelona is the 4th best European city in which to locate a business, (according to the European Cities Monitor conducted by Cushman & Wakefield) trailing only London, Paris and Frankfurt.',
                        'In 2010 Barcelona was the 48th most populated city in the world ranked by population density.',
                        '268,000 foreigners currently live in Barcelona.',
                        'The Sagrada Familia has taken longer to build than the great pyramids.',
                        'Barcelona attracts over one million visitors every week.',
                        'Barcelona has four and a half kilometers of sandy beaches. There were no beaches in Barcelona until 1992. The seaside of the city was owned by the local industries, but when the city decided to host the Olympic Games the seaside was converted into a leisure zone. Ten percent of the city is covered by parks.',
                        'Barcelona is famous for having no less than 130 hectares (260 football fields) dedicated to pedestrian zones.',
                        'The most walked street in Spain is in Barcelona. Approximately 3500 pedestrians walk down the Portal de l\'Ángel every hour.',
                        'Over 35% of trips taken by people around the city are walked or biked and not done by car.'
                        ]
            };
        },

        animatedInfiniteRotation: function($el){
            return TweenMax.to($el, 1, {rotation:"360", repeat:-1, ease:Linear.easeNone})
        },

        animatedLoader: function($loader){
            var timeline = new TimelineMax({repeat:-1}),
                $loader_line = $loader.find(".loader__long");

            // Swipe across bar - peeeeeeew
            timeline.to($loader_line, 0,
                {
                    css:{'width':'0%', 'left':'0px','right':'auto'}
                }, "peeeeeeew"
            );
            timeline.to($loader_line, 0.5,
                {
                    css:{'width':'100%'}, ease:Quint.easeInOut
                }
            );
            timeline.to($loader_line, 0,
                {
                    css:{'width':'100%', 'left':'auto', 'right':'0px'}, ease:Quint.easeInOut
                }
            );
            timeline.to($loader_line, 0.5,
                {
                    css:{'width':'0%'}, ease:Quint.easeInOut
                }
            );

            // Little swipes - pew pew pew
            timeline.staggerFromTo($loader.find(".loader__dot"), 1,
                {
                    css:{ 'left':'0%', 'marginLeft':'-100px'}
                },
                {
                    css:{ 'left':'100%', 'marginLeft':'0px'}, ease:Quint.easeInOut
                },
                0.15,
                "pewpewpew"
            );
            
            timeline.to($loader_line, 0,
                {
                    css:{'width':'0%', 'left':'0px','right':'auto'}
                }
            );

            return timeline;
        },

        animatedLoaderSmall: function($loader){
            var tween = TweenMax.fromTo($loader.find(".thumb__loader__long"), 1,
                {
                    css:{'marginLeft':'-260px'}
                },
                {
                    css:{'marginLeft':'100%'}, ease:Quint.easeInOut, repeat:-1, repeatDelay:0
                }
            );
            
            return tween;
        }

    };
    
    return shared;
});