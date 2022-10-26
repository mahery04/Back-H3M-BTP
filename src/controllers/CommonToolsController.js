const CommonTools = require('../models/CommonToolsModel');
var moment = require('moment')

exports.findAll = function (req, res) {
    CommonTools.findAll(function (err, commontools) {
        if (err) res.send(err);
        console.log('res', commontools);
        res.send(commontools);
    });
};

exports.findById = function (req, res) {
    CommonTools.findById(req.params.id, function (err, commontools) {
        if (err) res.send(err);
        console.log(commontools);
        // res.json(commontools[0]);
        res.json({
            tool_id:                commontools[0].tool_id,
            purchase_date:          moment(commontools[0].purchase_date).format('YYYY-MM-DD'),
            identification_number:  commontools[0].identification_number,
            article_name:           commontools[0].article_name,
            assignation_place:      commontools[0].assignation_place,
            statue:                 commontools[0].statue,
            historical:             commontools[0].historical,
            material_number:        commontools[0].material_number,
            tooling_id:             commontools[0].tooling_id,
        })
    });
};

exports.create = function (req, res) {
    const newCommonTools = new CommonTools(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        CommonTools.create(newCommonTools, function (err, commontools) {
            if (err) res.send(err);
            res.json({ error: false, message: "Tool added successfully!" });
        });
    }
};

exports.update = function (req, res) {
    const newCommonTools = new CommonTools(req.body);
    console.log(newCommonTools);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        CommonTools.update(req.params.id, newCommonTools, function (err, commontools) {
            if (err) res.send(err);
            res.json({ error: false, message: 'Tool successfully updated' });
        });
    }
};

exports.delete = function (req, res) {
    CommonTools.delete(req.params.id, function (err, commontools) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Tool successfully deleted' });
    });
};