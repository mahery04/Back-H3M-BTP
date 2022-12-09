const HistoryTool = require('../models/historyToolModel')


exports.findAll = function (req, res) {
    HistoryTool.findAll(req.params.id,function (err, HistoryTool) {
        if (err) res.send(err);
        console.log('res', HistoryTool);
        res.send(HistoryTool);
    });
};

exports.findById = function (req,res) {
    HistoryTool.findById(req.params.id, function(err, historytool) {
        if(err) res.send(err);
        console.log(historytool);
        res.json ({
            id: historytool[0].id,
            history_tool_id: historytool[0].history_tool_id,
            date_transfert: historytool[0].date_transfert,
            lieu_transfert: historytool[0].lieu_transfert,
            etat: historytool[0].etat,
            observation: historytool[0].observation,
        })
    })
}

exports.new = function (req,res) {
    const newHistoryTool = new HistoryTool(req.body)
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //     res.status(400).send({ error: true, message: 'Please provide all required field' });
    // } else {
        HistoryTool.create(newHistoryTool, function (err, historytool) {
            if (err) res.send(err);
            res.json({ error: false, message: "History tool added successfully!" });
        });
    // }
}

exports.update = function (req,res) {
    const newHistoryTool = new HistoryTool(req.body)
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //     res.status(400).send({ error: true, message: 'Please provide all required field' });
    // } else {
        HistoryTool.update(req.params.id,newHistoryTool, function (err, historytool) {
            if (err) res.send(err);
            res.json({ error: false, message: "History tool updated successfully!" });
        });
    // }
}

exports.delete = function (req, res) {
    HistoryTool.delete(req.params.id, function (err, historytool) {
        if (err) res.send(err);
        res.json({ error: false, message: 'History tool successfully deleted' });
    });
};