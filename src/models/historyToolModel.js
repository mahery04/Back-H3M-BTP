var connection = require('../../config/db.config')

var HistoryTool = function (historytool) {
    this.id = historytool.id;
    this.history_tool_id = historytool.history_tool_id;
    this.date_transfert = historytool.date_transfert;
    this.lieu_transfert = historytool.lieu_transfert;
    this.etat = historytool.etat;
    this.observation = historytool.observation;
};

HistoryTool.findById = function (id, result) {
    connection.query("SELECT * FROM history_tool WHERE history_tool_id = ?", id, function(err,res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    })
}

HistoryTool.findAll = function (id,result) {
    connection.query("SELECT * FROM history_tool WHERE id=?", id, function (err,res) {
        if (err) {
            console.log("Error while fetching history tool: ", err);
            result(null, err)
        } else {
            console.log("history tool fetched successfully: ");
            result(null, res)
        }
    })
}

HistoryTool.update = function(id,historytool,result) {
    connection.query("UPDATE history_tool SET date_transfert=?,lieu_transfert=?,etat=?,observation=? WHERE history_tool_id=?", [historytool.date_transfert, historytool.lieu_transfert,historytool.etat,historytool.observation,id], function (err,res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err)
        } else {
            console.log("History tool monthly updated successfully: ");
            result(null, res)
        }
    })
}

HistoryTool.create = function (newHistoryTool, result) {
    connection.query("INSERT INTO history_tool set ?", newHistoryTool, function (err,res) {
        if (err) {
            console.log("error", err);
            result(null,err)
        } else {
            console.log(res);
            result(null,res)
        }
    })
}

HistoryTool.delete = function (id, result) {
    connection.query("DELETE FROM history_tool WHERE history_tool_id = ?",[id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = HistoryTool;


