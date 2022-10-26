const Cantine = require('../models/cantineModel');

exports.getAll = function (req, res) {
    Cantine.getAll(function (err, cantine) {
        if (err) res.send(err);
        console.log('res', cantine);
        res.send(cantine);
    });
};

exports.create = function (req, res) {
    const data = req.body
    const Tvary = data.select_one * data.nb_people
    const Tvoamaina = data.select_two * data.nb_people
    const total_budget_vary = Tvary * data.price_one
    const total_budget_voamaina = Tvoamaina * data.price_two
    const total_depense = total_budget_vary + total_budget_voamaina
    const Object = {
        month:                  data.month,
        date:                   data.date,
        nb_people:              data.nb_people,
        total_kapoka_vary:      parseFloat(Tvary).toFixed(1),
        total_budget_vary:      total_budget_vary,
        total_kapoka_voamaina:  parseFloat(Tvoamaina).toFixed(1),
        total_budget_voamaina:  total_budget_voamaina,
        total_depense:          total_depense
    }
    const newCantine = eval(Object)

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Cantine.create(newCantine, function (err, cantine) {
            if (err) res.send(err);
            res.json({ error: false, message: "Cantine added successfully!" })
        })
    }
}

exports.delete = function (req, res) {
    Cantine.delete(req.params.id, function (err) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Cantine successfully deleted' });
    });
};