const MonthlySalary = require('../models/monthlySalaryModel');

exports.getMonth = function (req,res) {
    MonthlySalary.getMonth(function(err, monthlysalary) {
        if (err) res.send(err)
        console.log('res', monthlysalary);
        res.send(monthlysalary);
    })
}

exports.findAll = function (req, res) {
    MonthlySalary.findAll(req.params.id,function (err, monthlySalary) {
        if (err) res.send(err);
        console.log('res', monthlySalary);
        res.send(monthlySalary);
    });
};

exports.findById = function (req, res) {
    MonthlySalary.findById(req.params.id, function (err, monthlySalary) {
        if (err) res.send(err);
        console.log(monthlySalary);
        res.json({
            monthlyemployee_id: monthlySalary[0].monthlyemployee_id,
            monthlysalary_id: monthlySalary[0].monthlySalary_id,
            month: monthlySalary[0].month,
            montant_supplementaire: monthlySalary[0].montant_supplementaire,
            prime: monthlySalary[0].prime,
            conge: monthlySalary[0].conge,
            indeminite_transport: monthlySalary[0].indeminite_transport,
            autres_indeminités: monthlySalary[0].autres_indeminités,
            montant_non_imposable: monthlySalary[0].montant_non_imposable,
            avance_quinzaine: monthlySalary[0].avance_quinzaine,
            avance_speciale: monthlySalary[0].avance_speciale,
            enfant_charge: monthlySalary[0].enfant_charge,
            autres_deductions: monthlySalary[0].autres_deductions,

        });
    });
};

exports.getEmployees = function (req, res) {
    MonthlySalary.getEmployees(function (err, conge) {
        if (err) res.send(err);
        console.log('res', conge);
        res.send(conge);
    })
}

exports.globalView = function (req, res) {
    const newMonthlySalary = new MonthlySalary(req.body)
    MonthlySalary.globalView(newMonthlySalary, function (err, monthlysalary) {
        if (err) res.send(err)
        console.log('res', monthlysalary);
        res.send(monthlysalary);
    })
}

exports.create = function (req, res) {
    const newMonthlySalary = new MonthlySalary(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        MonthlySalary.create(newMonthlySalary, function (err, monthlySalary) {
            if (err) res.send(err);
            res.json({ error: false, message: "Salaries added successfully!" });
        });
    }
};

exports.update = function (req, res) {
    const newMonthlySalary = new MonthlySalary(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        MonthlySalary.update(req.params.id, newMonthlySalary, function (err, MonthlySalary) {
            if (err) res.send(err);
            res.json({ error: false, message: 'Salary successfully updated' });
        });
    }
};

exports.delete = function (req, res) {
    MonthlySalary.delete(req.params.id, function (err, MonthlySalary) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Salary successfully deleted' });
    });
};

