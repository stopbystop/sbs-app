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
gulp.task("default", ["min", "html:cordova", "html:web"]);


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
                return "@RenderHelper.GetCDNUrl(\"/client/content/v1/images/" + imageName + "\")";
            },
            getImageNoCDN: function (imageName) {
                return "/client/content/v1/images/" + imageName;
            }
        }
    }

    return gulp.src('html/web.handlebars')
        .pipe(handlebars(templateData, options))
        /*.pipe(htmlmin({ collapseWhitespace: true, removeComments: true, minifyJS: true, processScripts: ["text/html"] }))*/
        .pipe(rename('Main.cshtml'))
        .pipe(gulp.dest('./../web/client/Views'));
});

gulp.task('html:cordova', function () {
    var templateData = {
    },
    options = {
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
            }
        }
    }

    return gulp.src('html/cordova.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true, minifyJS: true, processScripts: ["text/html"] }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./../cordova/www'));
});


gulp.task("minWebBundle:js", function () {
    return gulp.src(["OutScripts/webBundle.js"])
        .pipe(concat("OutScripts/webBundle.min.js"))
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