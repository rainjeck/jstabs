var gulp = require("gulp");
var plugin = require("gulp-load-plugins")();
var http = require("http");
var st = require("st");

gulp.task("js", function() {
	return (
    gulp
      .src(["src/jstabs.js"])
      .pipe(gulp.dest("dest/"))
  );
});

gulp.task("js-minify", function() {
	return (
    gulp
      .src(["src/jstabs.js"])
      .pipe(plugin.jsmin())
      .pipe(plugin.rename({suffix: '.min'}))
      .pipe(gulp.dest("dest/"))
      .pipe(plugin.livereload())
  );
});

gulp.task("css", function() {
	return (
    gulp
      .src(["src/jstabs.css"])
      .pipe(plugin.autoprefixer({ browsers: ["last 10 versions"], cascade: false }))
      .pipe(gulp.dest("dest/"))
  );
});

gulp.task("css-minify", function() {
	return (
    gulp
      .src(["src/jstabs.css"])
      .pipe(plugin.autoprefixer({ browsers: ["last 10 versions"], cascade: false }))
      .pipe(plugin.css())
      .pipe(plugin.rename({suffix: '.min'}))
      .pipe(gulp.dest("dest/"))
      .pipe(plugin.livereload())
  );
});

// Watch
gulp.task("watch", function() {

  http.createServer(st({ path: __dirname, index: "index.html", cache: false })).listen(3000);

  plugin.livereload.listen({ basePath: "dest", start: true });

  gulp.watch("src/*.js", gulp.series("js", "js-minify"));

  gulp.watch("src/*.css", gulp.series("css", "css-minify"));

  gulp.watch("*.html", function(done) {
  	plugin.livereload.reload();
    done();
  });

  console.log("Watch on http://localhost:3000");
});

gulp.task("default", gulp.series("css", "css-minify", "js", "js-minify"), function(done) { done(); })