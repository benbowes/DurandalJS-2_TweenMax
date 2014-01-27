requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.0.0',
        'jquery': '../lib/jquery/jquery-1.11.0.min',
        'utils': '../lib/utils',
        
        'TweenMax': '../lib/greensock/src/minified/TweenMax.min',
        'TweenLite': '../lib/greensock/src/minified/TweenMax.min',
        'TimelineLite': '../lib/greensock/src/minified/TweenMax.min',
        'TimelineMax': '../lib/greensock/src/minified/TweenMax.min',
    },
    shim: {
        /*'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       }*/
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],  function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Durandal Starter Kit';

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('shell', 'entranceTweenMax');
    });
});