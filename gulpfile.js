var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('serve', ['sass', 'dist'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: false,
        online: false,
        notify: false
    });

    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('js/cody.js', ['dist']);
    gulp.watch(['*.html', 'js/*', 'dist/*']).on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('scss/**')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['scss']
        }))
        .pipe(prefix(['last 5 versions', '> 1%'], { cascade: true }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('dist', function(){
    // gulp.src('js/cody.js')
    //     .pipe(gulp.dest('dist'));

    return gulp.src('js/cody.js')
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(rename({suffix: '.min'}))
        // .pipe(gulp.dest('dist'));
        .pipe(gulp.dest('js'));
});

gulp.task('default', ['serve']);
