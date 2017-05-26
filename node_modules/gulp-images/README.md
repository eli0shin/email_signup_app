# gulp-images

[![Build Status](https://travis-ci.org/okvic77/gulp-images.svg)](https://travis-ci.org/okvic77/gulp-images)

```javascript
var gulp = require('gulp'), images = require('./app.js');


gulp.task('default', function(){
    return gulp.src('images/*').pipe(images()).pipe(gulp.dest('build'));
});
```

File **image.png** The file can be any supported by [gm][]

File **image.png.json**, need to be within the image.

If you want to apply any of the [gm][] functions, just set a string or an array for more than two arguments. For example for ``gm("img.png").gaussian(radius [,sigma])`` use ``gaussian: radius`` or ``gaussian: [radius, sigma]``

```json
{
	"@2x": {
		"size": "200",
		"fixDensity": true,
		"format": "png",
		"gaussian": [5, 5]
	},
	"@1x": {
		"format": "png",
		"size": "100"
	},
	"-favicon": {
		"size": "30x30",
		"format": "ico"
	}
}
```

[gm]: http://aheckmann.github.io/gm/ "Gm"