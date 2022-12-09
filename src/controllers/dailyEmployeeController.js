const Dailyemployee = require('../models/dailyEmployeeModel');

exports.findAll = function (req, res) {
    Dailyemployee.findAll(function (err, dailyemployee) {
        if (err) res.send(err);
        console.log('res', dailyemployee);
        res.send(dailyemployee);
    });
};

exports.findById = function (req, res) {
    Dailyemployee.findById(req.params.id, function (err, dailyemployee) {
        if (err) res.send(err);
        console.log(dailyemployee);
        res.json({
            dailyemployee_id:   dailyemployee[0].dailyemployee_id,
            matricule:          dailyemployee[0].matricule,
            firstname:          dailyemployee[0].firstname,
            lastname:           dailyemployee[0].lastname,
            cin:                dailyemployee[0].cin,
            address:            dailyemployee[0].address,
            contact:            dailyemployee[0].contact,
            post_id:            dailyemployee[0].post_id,
            post_name:          dailyemployee[0].post_name,
            salary:             dailyemployee[0].salary,
            code_chantier:      dailyemployee[0].code_chantier,
            group:              dailyemployee[0].group,
            category:           dailyemployee[0].category,
            hiring_date:        dailyemployee[0].hiring_date,
            type_contrat:       dailyemployee[0].type_contrat,
            evaluation:         dailyemployee[0].evaluation,
            start_date:         dailyemployee[0].start_date,
            start_motif:        dailyemployee[0].start_motif,
            sanction:           dailyemployee[0].sanction,
            status:             dailyemployee[0].status,
            remarque:           dailyemployee[0].remarque,
            par:                dailyemployee[0].par,
        });
    });
};

exports.create = function (req, res) {
    const newDailyemployee = new Dailyemployee(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Dailyemployee.create(newDailyemployee, function (err, dailyemployee) {
            if (err) res.send(err);
            res.json({ error: false, message: "Employee added successfully!" });
        });
    }
};

exports.update = function (req, res) {
    const newDailyemployee = new Dailyemployee(req.body);
    if (newDailyemployee.start_date == "Invalid date" ) {
        newDailyemployee.start_date == null
    } else if (newDailyemployee.hiring_date == "Invalid date") {
        newDailyemployee.hiring_date == null
    }
    console.log(newDailyemployee);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Dailyemployee.update(req.params.id, newDailyemployee, function (err, dailyemployee) {
            if (err) res.send(err);
            res.json({ error: false, message: 'Employee successfully updated' });
        });
    }
};

exports.delete = function (req, res) {
    Dailyemployee.delete(req.params.id, function (err, dailyemployee) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Employee successfully deleted' });
    });
};

exports.getcount = function (req, res) {
    Dailyemployee.getcount(function(err, dailyemployee) {
        if (err) res.send(err);
        console.log('dailyemployees', dailyemployee);
        res.json({total_dailyemployee: dailyemployee});
    });
}