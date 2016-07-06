"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************

var gulp        = require("gulp"),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    runSequence = require("run-sequence"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    cleanCSS    = require("gulp-clean-css"),
    concat      = require("gulp-concat");

//******************************************************************************
//* LINT ALL
//******************************************************************************
gulp.task("lint", function() {
    
    var config =  { emitError: (process.env.CI) ? true : false };
    
    return gulp.src([
        "src/**/**.ts",
        "test/**/**.test.ts"
    ])
    .pipe(tslint())
    .pipe(tslint.report("verbose", config));
});

//******************************************************************************
//* BUILD SOURCE
//******************************************************************************
var tsLibProject = tsc.createProject("tsconfig.json");

gulp.task("build", function() {
    return gulp.src([
        "typings/index.d.ts",
        "node_modules/reflect-metadata/reflect-metadata.d.ts",
        "node_modules/inversify-dts/inversify-devtools/inversify-devtools.d.ts",
        "src/**/**.ts"
    ])
    .pipe(tsc(tsLibProject))
    .on("error", function (err) {
        process.exit(1);
    })
    .js.pipe(gulp.dest("temp/"));
});

//******************************************************************************
//* BUNDLE SOURCE
//******************************************************************************
gulp.task("bundle", function() {

  var mainFilePath = "temp/main.js";
  var outputFolder   = "dist";
  var outputFileName = "app.js";

  var bundler = browserify({
    debug: true
  });

  // TS compiler options are in tsconfig.json file
  return bundler.add(mainFilePath)
                .bundle()
                .pipe(source(outputFileName))
                .pipe(buffer())
                .pipe(gulp.dest(outputFolder));
});

//******************************************************************************
//* BUNDLE CSS
//******************************************************************************

gulp.task("bundle-css", [ "copy-fonts", "copy-main", "copy-media" ], function() {

    return gulp.src([
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "node_modules/font-awesome/css/font-awesome.min.css",
        "node_modules/inversify-devtools/style/scrollbar.css",
        "node_modules/inversify-devtools/style/tree.css",
        "node_modules/inversify-devtools/style/site.css"
    ])
    .pipe(concat("app.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/"));

});

gulp.task("copy-fonts", function() {
    return gulp.src([
        "node_modules/font-awesome/fonts/**/*"
    ]).pipe(gulp.dest("dist/fonts"));
});

gulp.task("copy-media", function() {
    return gulp.src([
        "media/**/*"
    ]).pipe(gulp.dest("dist/media"));
});

gulp.task("copy-main", function() {
    return gulp.src([
        "devtools.html",
        "index.html",
        "manifest.json"
    ]).pipe(gulp.dest("dist"));
});

//******************************************************************************
//* TASK GROUPS
//******************************************************************************
gulp.task("default", function (cb) {
  runSequence(
    "lint",
    "build",
    "bundle",
    "bundle-css",
    cb);
});
