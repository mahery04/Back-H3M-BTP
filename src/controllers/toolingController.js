const Tooling = require('../models/toolingModel');

exports.findAll = function (req, res) {
    Tooling.findAll(function (err, tooling) {
        if (err) res.send(err);
        console.log('res', tooling);
        res.send(tooling);
    });
};

exports.findById = function (req, res) {
    Tooling.findById(req.params.id, function (err, tooling) {
        if (err) res.send(err);
        console.log(tooling);
        res.json(tooling[0]);
    });
};