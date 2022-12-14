const Permission = require('../models/permissionModel')
const moment = require('moment')

exports.getEmployee = function (req, res) {
    Permission.getEmployee(function (err, presence) {
        if (err) res.send(err);
        console.log('res', presence);
        res.send(presence);
    })
}

exports.create = function (req, res) {
    const newPermission = new Permission(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Permission.create(newPermission, function (err, presence) {
            if (err) res.send(err);
            res.json({ error: false, message: "Permission added successfully!" });
        });
    }
};

exports.validation = function (req, res) {
    Permission.validation(req.params.id, function (err, conge) {
        if (err) res.send(err);
        res.json({ error: false, message: "Validation changed successfully!" });
    });
};


exports.update = function (req, res) {
    const newPermission = new Permission(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Permission.update(req.params.id,newPermission, function (err, presence) {
            if (err) res.send(err);
            res.json({ error: false, message: "Presence added successfully!" });
        });
    }
};

exports.findAll = function (req, res) {
    Permission.findAll(function (err, presence) {
        if (err) res.send(err);
        console.log('res', presence);
        res.send(presence);
    });
};

exports.findById = function (req, res) {
    Permission.findById(req.params.id, function (err, presence) {
        if (err) res.send(err);
        console.log("TEST CHECK ", presence);
        res.json({
            permission_id: presence[0].permission_id,
            monthlyemployee_id: presence[0].monthlyemployee_id,
            date_permission: presence[0].date_permission,
            permission_reason: presence[0].permission_reason,
            start_hour_time : presence[0].start_hour_time,
            return_hour_time : presence[0].return_hour_time,
            start_minute_time : presence[0].start_minute_time,
            return_minute_time : presence[0].return_minute_time,
            number_time_permission: presence[0].number_time_permission,
            permission_hour_before_request: presence[0].permission_hour_before_request,
            permission_minute_before_request: presence[0].permission_minute_before_request,
            new_solde_permission: presence[0].new_solde_permission,
            visa_rh: presence[0].visa_rh,
            approval_direction: presence[0].approval_direction,
            par: presence[0].par
        });
    });
};

exports.delete = function (req, res) {
    Permission.delete(req.params.id, function (err, presence) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Permission successfully deleted' });
    });
};
