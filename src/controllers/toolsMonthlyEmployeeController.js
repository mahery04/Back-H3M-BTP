const ToolsMonthlyEmployee = require('../models/toolsMonthlyEmployeeModel')
var moment = require('moment')

exports.getById = function (req, res) {
    ToolsMonthlyEmployee.getById(req.params.id, function (err, toolsmonthlyemployee) {
        if (err) res.send (err)
        res.send(toolsmonthlyemployee)
    })
}

exports.getOne = function (req, res) {
    ToolsMonthlyEmployee.getOne(req.params.id, function (err, toolsmonthlyemployee) {
        if (err) res.send(err);
        console.log(toolsmonthlyemployee)
        res.json({
            tools_monthlyemployee_id: toolsmonthlyemployee[0].tools_monthlyemployee_id,
            tool_id:                toolsmonthlyemployee[0].tool_id,
            number:                 toolsmonthlyemployee[0].number,
            loan_date:              moment(toolsmonthlyemployee[0].loan_date).format('YYYY-MM-DD'),
            rendered:               toolsmonthlyemployee[0].rendered,
            delivery_date:          moment(toolsmonthlyemployee[0].delivery_date).format('YYYY-MM-DD'),
        })
    })
}

exports.getNumber = function (req,res) {
    ToolsMonthlyEmployee.getNumber(req.params.id, function (err, toolsmonthlyemployee) {
        if (err) {
            res.send(err)
        } else {
            res.send(toolsmonthlyemployee)
        }
    })
}

exports.new = function (req, res) {
    const newToolsMonthlyEmployee = new ToolsMonthlyEmployee(req.body)
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //     res.status(400).send({ error: true, message: 'Please provide all required field' });
    // } else {
        ToolsMonthlyEmployee.new(newToolsMonthlyEmployee, function (err, tools_monthlyemployee) {
            if (err) res.send(err)
            res.json({error: false, message: 'Tools added'})
        })
    // }
}

exports.render = function (req, res) {
    const newToolsMonthlyEmployee = new ToolsMonthlyEmployee(req.body)
    ToolsMonthlyEmployee.render(req.params.id, newToolsMonthlyEmployee, function (err, toolsmonthlyemployee) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Tool successfully updated' });
    })
}