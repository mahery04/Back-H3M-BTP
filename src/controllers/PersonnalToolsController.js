const PersonnalTools = require('../models/personnalToolsModel');
var moment = require('moment')

exports.findAll = function (req, res) {
    PersonnalTools.findAll(function (err, personnaltools) {
        if (err) res.send(err);
        console.log('res', personnaltools);
        res.send(personnaltools);
    });
};

exports.findById = function (req, res) {
    PersonnalTools.findById(req.params.id, function (err, personnaltools) {
        if (err) res.send(err);
        console.log(personnaltools);
        // res.json(personnaltools[0]);
        res.json({
            tool_id:                personnaltools[0].tool_id,
            purchase_date:          moment(personnaltools[0].purchase_date).format('YYYY-MM-DD'),
            identification_number:  personnaltools[0].identification_number,
            vendor:                 personnaltools[0].vendor,
            invoice_number:         personnaltools[0].invoice_number,
            article_name:           personnaltools[0].article_name,
            // assignation_place:      personnaltools[0].assignation_place,
            statue:                 personnaltools[0].statue,
            material_number:        personnaltools[0].material_number,
        })
    });
};

exports.create = function (req, res) {
    const newPersonnalTools = new PersonnalTools(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        PersonnalTools.create(newPersonnalTools, function (err, personnaltools) {
            if (err) res.send(err);
            res.json({ error: false, message: "Tool added successfully!" });
        });
    }
};

exports.update = function (req, res) {
    const newPersonnalTools = new PersonnalTools(req.body);
    console.log(newPersonnalTools);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        PersonnalTools.update(req.params.id, newPersonnalTools, function (err, personnaltools) {
            if (err) res.send(err);
            res.json({ error: false, message: 'Tool successfully updated' });
        });
    }
};

exports.delete = function (req, res) {
    PersonnalTools.delete(req.params.id, function (err, personnaltools) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Tool successfully deleted' });
    });
};