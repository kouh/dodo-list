var gulp = require('gulp');
var electron = require('gulp-electron');
var packageJson = require('./src/package.json');

var option = {
  src: './src',
  packageJson: packageJson,
  release: './release',
  cache: './cache',
  version: 'v0.27.1',
  rebuild: false,
  platforms: ['darwin-x64']
  // ['darwin','win32','linux','darwin-x64','linux-ia32','linux-x64','win32-ia32','win64-64']
};

gulp.task('app', function(){
  return gulp.src("")
    .pipe(electron(option))
    .pipe(gulp.dest(""));
});

gulp.task('electron', ['app'], function() {
  //MacのICON
  return gulp.src("./atom.icns")
    .pipe(gulp.dest(option.release + '/' + option.version + "/darwin-x64/" + packageJson.name + ".app/Contents/Resources/"));
});

gulp.task('default', ['electron']);

