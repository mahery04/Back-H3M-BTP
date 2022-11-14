const ServiceProvider = require('../models/serviceProviderModel')
const moment = require('moment')

exports.findAll = function (req, res) {
    ServiceProvider.findAll(function (err, provider) {
        if (err) res.send(err);
        console.log('res', provider);
        res.send(provider);
    });
};

exports.findById = function (req, res) {
    ServiceProvider.findById(req.params.id, function (err, provider) {
        if (err) res.send(err);
        console.log(provider);
        res.json({
            provider_id:        provider[0].provider_id,
            firstname:          provider[0].firstname,
            lastname:           provider[0].lastname,
            cin:                provider[0].cin,
            address:            provider[0].address,
            contact:            provider[0].contact,
            start_contract:     moment(provider[0].start_contract).format('YYYY-MM-DD'),
            end_contract:       moment(provider[0].end_contract).format('YYYY-MM-DD'),
            number_days:        provider[0].number_days,
            post_occupe:        provider[0].post_occupe,
            salary:             provider[0].salary,
        });
    });
};

exports.create = function (req, res) {
    const newServiceProvider = new ServiceProvider(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        ServiceProvider.create(newServiceProvider, function (err, dailyemployee) {
            if (err) res.send(err);
            res.json({ error: false, message: "Service Provider added successfully!" });
        });
    }
};

exports.update = function (req, res) {
    const newProvider = new ServiceProvider(req.body);
    console.log(newProvider);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        ServiceProvider.update(req.params.id, newProvider, function (err) {
            if (err) res.send(err);
            res.json({ error: false, message: 'Provider successfully updated' });
        });
    }
};

exports.delete = function (req, res) {
    ServiceProvider.delete(req.params.id, function (err) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Provider successfully deleted' });
    });
};