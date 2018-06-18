var gulp = require("gulp"),
	nodemon = require("gulp-nodemon"),
	gulpMocha = require("gulp-mocha")
	env = require("gulp-env"),
	supertest = require("supertest");

gulp.task('default', function() {
	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			PORT: 3333
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', function() {
		console.log("Server restarting");
	})
})

gulp.task('test', function() {
	env({VARS: {ENV: 'Test'}});
	gulp.src('tests/*.js', {read: false})
		.pipe(gulpMocha({reporter: 'nyan'}));
})