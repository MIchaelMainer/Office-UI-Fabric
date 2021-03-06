var gulp = require('gulp');

var Utilites = require('./modules/Utilities');
var Config = require('./modules/Config');
var ConsoleHelper = require('./modules/ConsoleHelper');
var ErrorHandling = require('./modules/ErrorHandling');
var Plugins = require('./modules/Plugins');

//
// Sample Index Page Build
// ----------------------------------------------------------------------------

gulp.task('FabricDemoPage', ['Fabric', 'FabricComponents', 'ComponentSamples', 'Samples'], function() {
    var getComponentFolders = Utilites.getFolders(Config.paths.distSampleComponents);
    var getSamplesFolders =  Utilites.getFolders(Config.paths.distSamples);
    
    var index = getSamplesFolders.indexOf("Components");
    getSamplesFolders.splice(index, 1);
    
    return gulp.src(Config.paths.templatePath + '/'+ 'samples-index.html')
    .pipe(Plugins.plumber(ErrorHandling.oneErrorInPipe))
    .pipe(Plugins.data(function () {
        return { 
                    "components" : getComponentFolders, 
                    "samples": getSamplesFolders
               };
    }))
    .pipe(Plugins.template())
    .pipe(Plugins.rename('index.html'))
    .pipe(gulp.dest(Config.paths.distSamples));
});
