"use strict";

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    htmlmin = require("gulp-htmlmin"),
    uglify = require("gulp-uglify"),
    merge = require("merge-stream"),
    del = require("del"),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    bundleconfig = require("./bundleconfig.json"); // make sure bundleconfig.json doesn't contain any comments

gulp.task("min", ["concat:js", "concat:css", "min:js", "min:css", "min:html"]);
gulp.task("build-", ["min"]);
gulp.task("build-Debug", ["min"]);
gulp.task("build-Release", ["min"]);
gulp.task("build-cordova", ["min", "html:cordova"]);
gulp.task("default", ["min", "html:cordova"]);
gulp.task("build-web", ["min", "html:web", "copy:web"]);
gulp.task('clean:web', function(){
    return del('../web/wwwroot/**/*', { force: true });
});

gulp.task('copy:web', ['clean:web'], function () {

    /*
echo f | xcopy %~dp0\client\outscripts\webbundle.js %~dp0\web\client\scripts\webbundle.js /F/R/Y
echo f | xcopy %~dp0\client\outscripts\sbsbundle.js %~dp0\web\client\scripts\sbsbundle.js /F/R/Y
echo f | xcopy %~dp0\client\content\manifest.webmanifest %~dp0\web\client\content\manifest.webmanifest /F/R/Y
echo f | xcopy %~dp0\client\content\*.css %~dp0\web\client\content\ /F/R/Y
echo f | xcopy %~dp0\client\content\v1\*.* %~dp0\web\client\content\v1\ /F/R/Y/S
echo f | xcopy %~dp0\client\content\fonts\*.* %~dp0\web\client\content\fonts\ /F/R/Y/S
    */
    var copyJs = gulp.src(['./outscripts/webbundle.js', './outscripts/sbsbundle.js']).pipe(gulp.dest('../web/wwwroot/js/'));
    var copyManifest = gulp.src(['./content/manifest.webmanifest', '*.css']).pipe(gulp.dest('../web/wwwroot/'));
    var copyCss = gulp.src(['./content/sbsbundle.css', './content/sbsbundle.css.min.css']).pipe(gulp.dest('../web/wwwroot/'));
    var copyImages = gulp.src(['./content/v1/**/*']).pipe(gulp.dest('../web/wwwroot/'));
    var copyFonts = gulp.src(['./content/fonts/**/*']).pipe(gulp.dest('../web/wwwroot/fonts/'));

    return merge(copyJs, copyManifest, copyCss, copyImages, copyFonts);
});

gulp.task('html:web', function () {
    var templateData = {
    },
        options = {
            compile: { noEscape: true },
            partials: {
            },
            batch: ['./html/partials', './html/pages'],
            helpers: {
                capitals: function (str) {
                    return str.toUpperCase();
                },
                getImage: function (imageName) {
                    return "@RenderHelper.GetCDNUrl(\"/images/" + imageName + "\")";
                },
                getImageNoCDN: function (imageName) {
                    return "@Url.Content(\"~/images/" + imageName + "\")";
                },
                filterDialogBind: function (forJunction) {
                    return forJunction ? 'with:selectedJunction' : '';
                },
                linkClick: function () {
                    return "";
                }

            }
        }

    return gulp.src('html/web.handlebars')
        .pipe(handlebars(templateData, options))
        /*.pipe(htmlmin({ collapseWhitespace: true, removeComments: true, minifyJS: true, processScripts: ["text/html"] }))*/
        .pipe(rename('Main.cshtml'))
        .pipe(gulp.dest('./../web/Views'));
});

gulp.task('html:cordova', function () {
    var templateData = {
    },
        cordovaOptions = {
            ignorePartials: true,
            partials: {
            },
            batch: ['./html/partials', './html/pages'],
            helpers: {
                capitals: function (str) {
                    return str.toUpperCase();
                },
                getImage: function (imageName) {
                    return "images/" + imageName;
                },
                getImageNoCDN: function (imageName) {
                    return "images/" + imageName;
                },
                filterDialogBind: function (forJunction) {
                    return forJunction ? 'with:selectedJunction' : '';
                },
                linkClick: function () {
                    return "window.open(this.href, '_system', 'location=yes'); return false;";
                }
            }
        }

    return gulp.src('html/cordova.handlebars')
        .pipe(handlebars(templateData, cordovaOptions))
        /*.pipe(htmlmin({ collapseWhitespace: true, removeComments: true, minifyJS: true, processScripts: ["text/html"] }))*/
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./../cordova/www'));
});


gulp.task("minWebBundle:js", function () {
    return gulp.src(["outscripts/webBundle.js"])
        .pipe(concat("outscripts/webBundle.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:js", function () {
    var tasks = getBundles(".js").map(function (bundle) {
        return gulp.src(bundle.inputFiles, { base: "." })
            .pipe(concat(bundle.outputFileName + ".min.js"))
            .pipe(uglify())
            .pipe(gulp.dest("."));
    });
    return merge(tasks);
});

gulp.task("concat:js", function () {
    var tasks = getBundles(".js").map(function (bundle) {
        return gulp.src(bundle.inputFiles, { base: "." })
            .pipe(concat(bundle.outputFileName))
            .pipe(gulp.dest("."));
    });
    return merge(tasks);
});

gulp.task("min:css", function () {
    var tasks = getBundles(".css").map(function (bundle) {
        return gulp.src(bundle.inputFiles, { base: "." })
            .pipe(concat(bundle.outputFileName + ".min.css"))
            .pipe(cssmin())
            .pipe(gulp.dest("."));
    });
    return merge(tasks);
});

gulp.task("concat:css", function () {
    var tasks = getBundles(".css").map(function (bundle) {
        return gulp.src(bundle.inputFiles, { base: "." })
            .pipe(concat(bundle.outputFileName))
            .pipe(gulp.dest("."));
    });
    return merge(tasks);
});

gulp.task("min:html", function () {
    var tasks = getBundles(".html").map(function (bundle) {
        return gulp.src(bundle.inputFiles, { base: "." })
            .pipe(concat(bundle.outputFileName + ".html"))
            .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true }))
            .pipe(gulp.dest("."));
    });
    return merge(tasks);
});

gulp.task("clean", function () {
    var files = bundleconfig.map(function (bundle) {
        return bundle.outputFileName;
    });

    return del(files);
});

gulp.task("watch", function () {
    getBundles(".js").forEach(function (bundle) {
        gulp.watch(bundle.inputFiles, ["min:js"]);
    });

    getBundles(".css").forEach(function (bundle) {
        gulp.watch(bundle.inputFiles, ["min:css"]);
    });

    getBundles(".html").forEach(function (bundle) {
        gulp.watch(bundle.inputFiles, ["min:html"]);
    });
});

function getBundles(extension) {
    return bundleconfig.filter(function (bundle) {
        return new RegExp(extension).test(bundle.outputFileName);
    });
}