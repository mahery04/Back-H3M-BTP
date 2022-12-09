const Trash = require('../models/trashModel');
var moment = require('moment')

exports.findAll = function (req, res) {
    Trash.findAll(function (err, trash) {
        if (err) res.send(err);
        console.log('res', trash);
        res.send(trash);
    });
};

exports.create = function (req, res) {
    const newTrash = new Trash(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Trash.create(newTrash, function (err, Trash) {
            if (err) res.send(err);
            res.json({ error: false, message: "Trash added successfully!" });
        });
    }
};

exports.delete = function (req, res) {
    Trash.delete(req.params.id, function (err, Trash) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Trash successfully deleted' });
    });
};