const ToolsDailyEmployee = require('../models/toolsDailyEmployeeModel')
var moment = require('moment')

exports.getById = function (req, res) {
    ToolsDailyEmployee.getById(req.params.id, function (err, toolsdailyemployee) {
        if (err) res.send (err)
        res.send(toolsdailyemployee)
    })
}

exports.getOne = function (req, res) {
    ToolsDailyEmployee.getOne(req.params.id, function (err, toolsdailyemployee) {
        if (err) res.send(err);
        console.log(toolsdailyemployee)
        res.json({
            tools_dailyemployee_id: toolsdailyemployee[0].tools_dailyemployee_id,
            tool_id:                toolsdailyemployee[0].tool_id,
            number:                 toolsdailyemployee[0].number,
            loan_date:              moment(toolsdailyemployee[0].loan_date).format('YYYY-MM-DD'),
            rendered:               toolsdailyemployee[0].rendered,
            delivery_date:          moment(toolsdailyemployee[0].delivery_date).format('YYYY-MM-DD'),
        })
    })
}

exports.getNumber = function (req,res) {
    ToolsDailyEmployee.getNumber(req.params.id, function (err, toolsdailyemployee) {
        if (err) {
            res.send(err)
        } else {
            res.send(toolsdailyemployee)
        }
    })
}

exports.new = function (req, res) {
    const newToolsDailyEmployee = new ToolsDailyEmployee(req.body)
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //     res.status(400).send({ error: true, message: 'Please provide all required field' });
    // } else {
        ToolsDailyEmployee.new(newToolsDailyEmployee, function (err, tools_dailyemployee) {
            if (err) res.send(err)
            res.json({error: false, message: 'Tools added'})
        })
    // }
}

exports.render = function (req, res) {
    const newToolsDailyEmployee = new ToolsDailyEmployee(req.body)
    ToolsDailyEmployee.render(req.params.id, newToolsDailyEmployee, function (err, toolsdailyemployee) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Tool successfully updated' });
    })
}