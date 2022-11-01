const DailyContrat = require('../models/contratDailyEmployeeModel')


exports.findAll = function (req, res) {
    DailyContrat.findAll(req.params.id,function (err, dailycontrat) {
        if (err) res.send(err);
        console.log('res', dailycontrat);
        res.send(dailycontrat);
    });
};

exports.findById = function (req,res) {
    DailyContrat.findById(req.params.id, function(err, dailycontrat) {
        if(err) res.send(err);
        console.log(dailycontrat);
        res.json ({
            id: dailycontrat[0].id,
            contrat_id: dailycontrat[0].contrat_id,
            type_contrat: dailycontrat[0].type_contrat,
            evaluation: dailycontrat[0].evaluation,
            start_date: dailycontrat[0].start_date,
            start_motif: dailycontrat[0].start_motif,
            sanction: dailycontrat[0].sanction,
        })
    })
}

exports.new = function (req,res) {
    const newContratDailyEmployee = new DailyContrat(req.body)
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //     res.status(400).send({ error: true, message: 'Please provide all required field' });
    // } else {
        DailyContrat.create(newContratDailyEmployee, function (err, dailyemployee) {
            if (err) res.send(err);
            res.json({ error: false, message: "Contrat added successfully!" });
        });
    // }
}

exports.update = function (req,res) {
    const newContratDailyEmployee = new DailyContrat(req.body)
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //     res.status(400).send({ error: true, message: 'Please provide all required field' });
    // } else {
        DailyContrat.update(req.params.id,newContratDailyEmployee, function (err, dailycontrat) {
            if (err) res.send(err);
            res.json({ error: false, message: "Contrat updated successfully!" });
        });
    // }
}

exports.delete = function (req, res) {
    DailyContrat.delete(req.params.id, function (err, dailyemployee) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Contrat successfully deleted' });
    });
};