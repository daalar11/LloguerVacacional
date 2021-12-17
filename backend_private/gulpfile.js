const gulp=require('gulp');
const sass=require('gulp-sass')(require('sass'));
const {series} =require('gulp');
function buildStlyes2(){
    return gulp.src('./src/main/resources/static/scss/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('./src/main/resources/static/css'))

}
function copy(){
    return gulp.src('node_modules/bootstrap/dist/js/*.js')
        .pipe(gulp.dest('src/main/resources/static/js'));
}
exports.compila2=buildStlyes2
exports.copy=copy;
exports.build=series(buildStlyes2,copy);

