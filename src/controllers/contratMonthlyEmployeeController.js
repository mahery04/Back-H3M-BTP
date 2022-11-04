const MonthlyContrat = require('../models/contratMonthlyEmployeeModel')


exports.findAll = function (req, res) {
    MonthlyContrat.findAll(req.params.id,function (err, monthlycontrat) {
        if (err) res.send(err);
        console.log('res', monthlycontrat);
        res.send(monthlycontrat);
    });
};

exports.findById = function (req,res) {
    MonthlyContrat.findById(req.params.id, function(err, monthlycontrat) {
        if(err) res.send(err);
        console.log(monthlycontrat);
        res.json ({
            id: monthlycontrat[0].id,
            contrat_id: monthlycontrat[0].contrat_id,
            type_contrat: monthlycontrat[0].type_contrat,
            evaluation: monthlycontrat[0].evaluation,
            start_date: monthlycontrat[0].start_date,
            start_motif: monthlycontrat[0].start_motif,
            sanction: monthlycontrat[0].sanction,
        })
    })
}

exports.new = function (req,res) {
    const newContratMonthlyEmployee = new MonthlyContrat(req.body)
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //     res.status(400).send({ error: true, message: 'Please provide all required field' });
    // } else {
        MonthlyContrat.create(newContratMonthlyEmployee, function (err, monthlyemployee) {
            if (err) res.send(err);
            res.json({ error: false, message: "Contrat monthly added successfully!" });
        });
    // }
}

exports.update = function (req,res) {
    const newContratMonthlyEmployee = new MonthlyContrat(req.body)
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //     res.status(400).send({ error: true, message: 'Please provide all required field' });
    // } else {
        MonthlyContrat.update(req.params.id,newContratMonthlyEmployee, function (err, monthlycontrat) {
            if (err) res.send(err);
            res.json({ error: false, message: "Contrat updated successfully!" });
        });
    // }
}

exports.delete = function (req, res) {
    MonthlyContrat.delete(req.params.id, function (err, monthlyemployee) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Contrat successfully deleted' });
    });
};