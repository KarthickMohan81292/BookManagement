const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulpMocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const isparta = require('isparta');

gulp.task('default', () => {
	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			PORT: 3333,
		},
		ignore: ['./node_modules/**'],
	});
});

gulp.task('pre-test', () => gulp.src(['lib/**/*.js'])
	// Covering files
	.pipe(istanbul({ instrumenter: isparta.Instrumenter }))
	// Force `require` to return covered files
	.pipe(istanbul.hookRequire()));

gulp.task('test', ['pre-test'], () => {
	process.env.ENV = 'Test';
	gulp.src('tests/*.js', { read: false })
		.pipe(gulpMocha({ reporter: 'nyan' }));
});

