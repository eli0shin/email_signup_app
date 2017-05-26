var api = require('../models/api.js');
var csv = require('./csv-express.js');

/**
 * api.js
 *
 * @description :: Server-side logic for managing subscriber.
 */
module.exports = {

    /**
     * api.list()
     */
    list: function (req, res) {
        api.find(function (err, subscribers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting subscriber.',
                    error: err
                });
            }
            console.log(subscribers);
            return res.csv(subscribers, ['email'], ['Email Address'], '');
            /*var newJSON = {};
            var emails = subscribers.map(function(){

            });*/
            /*var fields = ['email'];
            var csv = json2csv({ data: subscribers, fields: fields, fieldNames: ['Email Address'], quotes: '' });

            console.log(csv);*/
            //var path="../public/csvFile" + Date.now() + ".csv";
            /*console.log(path);
            var csvFile = fs.writeFile(path, csv, function(err,data) {
                if (err) {
                    console.log( err +data);
                    throw err;
                }
            });*/
            //var csvFile = fs.createWriteStream(path);

            /*tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
              if (err) throw err;

              console.log("File: ", path);
              console.log("Filedescriptor: ", fd);

                fs.wr

              // If we don't need the file anymore we could manually call the cleanupCallback
              // But that is not necessary if we didn't pass the keep option because the library
              // will clean after itself.
              cleanupCallback();
            });
            return res.sendFile(path, { root: __dirname });*/
            //return res.send(csv);
    });
},

    /**
     * api.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        api.findOne({_id: id}, function (err, subscriber) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting subscriber.',
                    error: err
                });
            }
            if (!subscriber) {
                return res.status(404).json({
                    message: 'No such subscriber'
                });
            }
            return res.json(subscriber);
        });
    },

    /**
     * api.create()
     */
    create: function (req, res) {
        var subscriber = new api({			email : req.body.email
        });
        console.log(subscriber.email);
        console.log(req.body);
        console.log(req.body.email);
        subscriber.save(function (err, subscriber) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Error when creating subscriber',
                    error: err
                });
            }
            return res.status(201).json(subscriber);
        });
    },

    /**
     * api.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        api.findOne({_id: id}, function (err, subscriber) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting subscriber',
                    error: err
                });
            }
            if (!subscriber) {
                return res.status(404).json({
                    message: 'No such subscriber'
                });
            }

            subscriber.email = req.body.email ? req.body.email : subscriber.email;
            subscriber.save(function (err, subscriber) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating subscriber.',
                        error: err
                    });
                }

                return res.json(subscriber);
            });
        });
    },

    /**
     * api.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        api.findByIdAndRemove(id, function (err, subscriber) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the subscriber.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
