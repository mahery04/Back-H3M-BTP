const SalaryServiceProvider = require('../models/SalaryServiceProviderModel');

exports.findAll = function (req, res) {
    SalaryServiceProvider.findAll(req.params.id,function (err, SalaryServiceProvider) {
        if (err) res.send(err);
        console.log('res', SalaryServiceProvider);
        res.send(SalaryServiceProvider);
    });
}

exports.findById = function (req, res) {
    SalaryServiceProvider.findById(req.params.id, function (err, salaryserviceprovider) {
        if (err) res.send (err)
        console.log(salaryserviceprovider);
        // res.send(SalaryServiceProvider)
        res.json ({
            id: salaryserviceprovider[0].id,
            salary_provider_id: salaryserviceprovider[0].salary_provider_id,
            date_paiement: salaryserviceprovider[0].date_paiement,
            start_date: salaryserviceprovider[0].start_date,
            end_date: salaryserviceprovider[0].end_date,
            salary: salaryserviceprovider[0].salary,
        })
    })
}

// exports.findById = function (req, res) {
//     SalaryServiceProvider.findById(req.params.id, function (err, salaryserviceprovider) {
//         if (err) res.send (err)
//         res.send(salaryserviceprovider)
//     })
// }

// exports.create = function (req, res) {
//     const newSalaryServiceProvider = new SalaryServiceProvider(req.body);
//     // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     //     res.status(400).send({ error: true, message: 'Please provide all required field' });
//     // } else {
//         SalaryServiceProvider.create(newSalaryServiceProvider, function (err, SalaryServiceProvider) {
//             if (err) res.send(err);
//             res.json({ error: false, message: "Employee added successfully!" });
//         });
//     //}
// }

exports.new = function (req,res) {
    const newSalaryServiceProvider = new SalaryServiceProvider(req.body)
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //     res.status(400).send({ error: true, message: 'Please provide all required field' });
    // } else {
        SalaryServiceProvider.create(newSalaryServiceProvider, function (err, monthlyemployee) {
            if (err) res.send(err);
            res.json({ error: false, message: "Salary service provider monthly added successfully!" });
        });
    // }
}

exports.update = function (req, res) {
    const newSalaryServiceProvider = new SalaryServiceProvider(req.body);
    console.log(newSalaryServiceProvider);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        SalaryServiceProvider.update(req.params.id, newSalaryServiceProvider, function (err, SalaryServiceProvider) {
            if (err) res.send(err);
            res.json({ error: false, message: 'Employee successfully updated' });
        });
    }
};

exports.delete = function (req, res) {
    SalaryServiceProvider.delete(req.params.id, function (err, SalaryServiceProvider) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Employee successfully deleted' });
    });
};

