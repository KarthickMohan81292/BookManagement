var gulp = require("gulp");
var nodemon = require("gulp-nodemon");

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