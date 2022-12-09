const Conge = require('../models/congeModel')
const moment = require('moment')


exports.getEmployee = function (req, res) {
    Conge.getEmployee(function (err, conge) {
        if (err) res.send(err);
        console.log('res', conge);
        res.send(conge);
    })
}

exports.create = function (req, res) {
    const newConge = new Conge(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Conge.create(newConge, function (err, conge) {
            if (err) res.send(err);
            res.json({ error: false, message: "Conge added successfully!" });
        });
    }
};

exports.validation = function (req, res) {
    Conge.validation(req.params.id, function (err, conge) {
        if (err) res.send(err);
        res.json({ error: false, message: "Validation changed successfully!" });
    });
};

exports.novalidation = function (req, res) {
    Conge.novalidation(req.params.id, function (err, conge) {
        if (err) res.send(err);
        res.json({ error: false, message: "Validation changed successfully!" });
    });
};

exports.update = function (req, res) {
    const newConge = new Conge(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Conge.update(req.params.id,newConge, function (err, conge) {
            if (err) res.send(err);
            res.json({ error: false, message: "Conge added successfully!" });
        });
    }
};

exports.findAll = function (req, res) {
    Conge.findAll(function (err, conge) {
        if (err) res.send(err);
        console.log('res', conge);
        res.send(conge);
    });
};

exports.findById = function (req, res) {
    Conge.findById(req.params.id, function (err, conge) {
        if (err) res.send(err);
        console.log(conge);
        res.json({
            conge_id: conge[0].conge_id,
            monthlyemployee_id: conge[0].monthlyemployee_id,
            conge_motif: conge[0].conge_motif,
            start_conge: moment(conge[0].start_conge).format('YYYY-MM-DD'),
            end_conge: moment(conge[0].end_conge).format('YYYY-MM-DD'),
            number_days: conge[0].number_days,
            // conge_before_request: conge[0].conge_before_request,
            new_solde_conge : conge[0].new_solde_conge,
            visa_rh: conge[0].visa_rh,
            approval_direction : conge[0].approval_direction
        });
    });
};

exports.delete = function (req, res) {
    Conge.delete(req.params.id, function (err, conge) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Conge successfully deleted' });
    });
};

exports.updateLastDay = function (req, res) {
    Conge.updateLastDay(function (err, conge) {
        if (err) res.send(err);
        res.json({ error: false, message: "Conge added successfully!" });
        // console.log(conge)
    });
};