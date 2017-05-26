var through = require('through2');
var gutil = require('gulp-util');
var _ = require('underscore');
var async = require('async');
var path = require('path');

var S = require('string');
//var upath = require('upath');
var attrs = {
    width: new RegExp('w(.*)'),
    heigth: new RegExp('h(.*)')
};

var imageMagick = require('gm').subClass({
    imageMagick: true
});

var querystring = require('querystring');
var fs = require('fs');
// Consts
const PLUGIN_NAME = 'gulp-images';

// Exporting the plugin main function
module.exports = function(config) {

    return through.obj(function(image, enc, cb) {
        if (image.isNull())
            return cb(null, image);
        if (image.isStream()) {
            console.log('stream not supported');
            return cb(null, image);
        }

        var save = this;

        // if (file.isBuffer()) assets = JSON.parse(file.contents.toString());
        var file = path.parse(image.relative);
        if (path.extname(image.relative) == '.json') {
            return cb(null);
        }


        try {
            var commands = JSON.parse(fs.readFileSync(image.path + '.json', 'utf8'))
        } catch (e) {
            console.log(e);
            return cb(null);
        }

        //var commands = S(file.name).between('(', ')').s;
        //file.name = file.name.replace(/\(.*\)/, "");
        //file.base = file.name + file.ext;

        //(file, path.format(file));

        var img = imageMagick(image.contents);
        img.identify(function(err, info) {
            // var newImage = _.clone(img);
            // newImage.resize(values.width * factor, values.heigth * factor).toBuffer(sufix.split('.')[1], function(err, buffer){

            //     var newFile = new gutil.File({
            //      path: onlyName + "@" + sufix,
            //         contents: buffer
            //     });
            //     save.push(newFile);
            // });
            var size = info.size;

            //console.log(querystring.stringify(demo, ';', ':'));

            async.each(_.pairs(commands), function(tmp, done) {

                var current = _.clone(img);
                var format = S(file.ext).chompLeft('.').s;
                async.each(_.pairs(tmp[1]), function(_action, done) {
                    var value = _action[1];
                    switch (_action[0]) {
                        case 'format':
                            format = value;
                            done();
                            break;
                        case 'factor':
                            current.resize(size.width * value, size.height * value);
                            done();
                            break;
                        case 'size':
                            var tmp_size = value.toLowerCase().split('x');
                            size.width = tmp_size[0];
                            size.height = tmp_size[1] || tmp_size[0];
                            current.resize(size.width, size.height);
                            done();
                            break;
                        case 'fixDensity':
                        if (value)
                            current.density(info.size.width, info.size.height);
                            done();
                            break;
                        default:
                            var action = _action[0];
                            if (!_.isArray(value)) value = [value];
                            current[action].apply(current, value);
                            done();
                            break;
                    }

                }, function() {
                    current.toBuffer(format, function(err, buffer) {
                        var newFile = new gutil.File({
                            path: (function() {
                                var newFileName = _.clone(file);
                                newFileName.name = newFileName.name + tmp[0];
                                newFileName.base = newFileName.name + '.' + format;
                                return path.format(newFileName);
                            })(),
                            contents: buffer
                        });
                        save.push(newFile);
                        done();
                    });



                })

            }, function(err) {
                cb(null)
            })

        })


    });
};