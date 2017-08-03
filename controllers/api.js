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
        var subscriber = new api({
			email : req.body.email
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
