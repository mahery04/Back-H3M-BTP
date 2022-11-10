const MonthlyPresence = require('../models/monthlyPresenceModel')
const moment = require('moment')

exports.getEmployee = function (req, res) {
    MonthlyPresence.getEmployee(function (err, presence) {
        if (err) res.send(err);
        console.log('res', presence);
        res.send(presence);
    })
}

exports.create = function (req, res) {
    const newPresence = new MonthlyPresence(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        MonthlyPresence.create(newPresence, function (err, presence) {
            if (err) res.send(err);
            res.json({ error: false, message: "Presence added successfully!" });
        });
    }
};

exports.validation = function (req, res) {
    MonthlyPresence.validation(req.params.id, function (err, conge) {
        if (err) res.send(err);
        res.json({ error: false, message: "Validation changed successfully!" });
    });
};


exports.update = function (req, res) {
    const newPresence = new MonthlyPresence(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        MonthlyPresence.update(req.params.id,newPresence, function (err, presence) {
            if (err) res.send(err);
            res.json({ error: false, message: "Presence added successfully!" });
        });
    }
};

exports.findAll = function (req, res) {
    MonthlyPresence.findAll(function (err, presence) {
        if (err) res.send(err);
        console.log('res', presence);
        res.send(presence);
    });
};

exports.findById = function (req, res) {
    MonthlyPresence.findById(req.params.id, function (err, presence) {
        if (err) res.send(err);
        console.log("TEST CHECK ", presence);
        res.json({
            monthlypresence_id: presence[0].monthlypresence_id,
            monthlyemployee_id: presence[0].monthlyemployee_id,
            absence_reason: presence[0].absence_reason,
            start_date: moment(presence[0].start_date).format('YYYY-MM-DD'),
            return_date: moment(presence[0].return_date).format('YYYY-MM-DD'),
            number_days_absence: presence[0].number_days_absence,
            visa_rh: presence[0].visa_rh,
            approval_direction: presence[0].approval_direction
        });
    });
};

exports.delete = function (req, res) {
    MonthlyPresence.delete(req.params.id, function (err, presence) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Presence successfully deleted' });
    });
};
