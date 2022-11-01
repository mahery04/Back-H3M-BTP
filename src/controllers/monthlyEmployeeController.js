const Monthlyemployee = require('../models/monthlyEmployeeModel');
var moment = require('moment')

exports.findAll = function (req, res) {
    Monthlyemployee.findAll(function (err, monthlyemployee) {
        if (err) res.send(err);
        console.log('res', monthlyemployee);
        res.send(monthlyemployee);
    });
};

exports.findById = function (req, res) {
    Monthlyemployee.findById(req.params.id, function (err, monthlyemployee) {
        if (err) res.send(err);
        console.log(monthlyemployee);
        res.json({
            monthlyemployee_id: monthlyemployee[0].monthlyemployee_id,
            matricule:          monthlyemployee[0].matricule,
            firstname:          monthlyemployee[0].firstname,
            lastname:           monthlyemployee[0].lastname,
            cin:                monthlyemployee[0].cin,
            address:            monthlyemployee[0].address,
            contact:            monthlyemployee[0].contact,
            group:              monthlyemployee[0].group,
            post_id:            monthlyemployee[0].post_id,
            post_name:          monthlyemployee[0].post_name,
            salary:             monthlyemployee[0].salary,
            status:             monthlyemployee[0].status,
            code_chantier:      monthlyemployee[0].code_chantier,
            category:           monthlyemployee[0].category,
            hiring_date:        monthlyemployee[0].hiring_date,
            motif:              monthlyemployee[0].motif,
            ostie_num:          monthlyemployee[0].ostie_num,
            cnaps_num:          monthlyemployee[0].cnaps_num,
        });
    });
};

exports.create = function (req, res) {
    const newMonthlyemployee = new Monthlyemployee(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Monthlyemployee.create(newMonthlyemployee, function (err, monthlyemployee) {
            if (err) res.send(err);
            res.json({ error: false, message: "Employee added successfully!" });
        });
    }
};

exports.update = function (req, res) {
    const newMonthlyemployee = new Monthlyemployee(req.body);
    console.log(newMonthlyemployee);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Monthlyemployee.update(req.params.id, newMonthlyemployee, function (err, monthlyemployee) {
            if (err) res.send(err);
            res.json({ error: false, message: 'Employee successfully updated' });
        });
    }
};

exports.delete = function (req, res) {
    Monthlyemployee.delete(req.params.id, function (err, monthlyemployee) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Employee successfully deleted' });
    });
};

exports.getcount = function (req, res) {
    Monthlyemployee.getcount(function(err, monthlyemployee) {
        if (err) res.send(err);
        console.log('monthlyemployees', monthlyemployee);
        res.json({total_monthlyemployee: monthlyemployee});
    });
}