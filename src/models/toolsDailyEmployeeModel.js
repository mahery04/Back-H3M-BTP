var connection = require('../../config/db.config')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var ToolsDailyEmployee = function (toolsdailyemployee) {
    this.tools_dailyemployee_id = toolsdailyemployee.tools_dailyemployee_id;
    this.tool_id                = toolsdailyemployee.tool_id;
    this.number                 = toolsdailyemployee.number;
    this.loan_date              = toolsdailyemployee.loan_date;
    this.rendered               = toolsdailyemployee.rendered;
    this.delivery_date          = toolsdailyemployee.delivery_date;
    this.dailyemployee_id       = toolsdailyemployee.dailyemployee_id;
}

ToolsDailyEmployee.getById = function (id, result) {
    connection.query("SELECT tools_dailyemployee_id, article_name, number, loan_date, rendered, delivery_date FROM tools_dailyemployee td JOIN daily_employee de ON td.`dailyemployee_id`=de.`dailyemployee_id` JOIN personnal_tools pt ON td.`tool_id`=pt.`tool_id` WHERE de.`dailyemployee_id`=? AND rendered=0", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    })
}

ToolsDailyEmployee.getOne = function (id, result) {
    connection.query("SELECT * FROM tools_dailyemployee WHERE tools_dailyemployee_id=?", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    })
}

ToolsDailyEmployee.getNumber = function(id, result) {
    connection.query("SELECT material_number FROM personnal_tools WHERE tool_id=?",id, function (err,res) {
        if (err) {
            console.log("error ",err);
            result(null, err)
        }else {
            result(null,res)
        }
        
    })
}

ToolsDailyEmployee.new = function (newToolsDailyEmployee, result) {
    newToolsDailyEmployee.rendered = 0
    newToolsDailyEmployee.delivery_date = null
    connection.query("INSERT INTO tools_dailyemployee SET ?", newToolsDailyEmployee, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null,err)
        } else {
            console.log(res);
            result(null,res)
            connection.query(`SELECT material_number FROM personnal_tools WHERE tool_id=${newToolsDailyEmployee.tool_id}`, function(err, number) {
                const newNumber = number[0].material_number - newToolsDailyEmployee.number;
                console.log(newNumber)
                connection.query(`UPDATE personnal_tools SET material_number=${newNumber} WHERE tool_id=${newToolsDailyEmployee.tool_id}`)
            })
        }
    })
}

ToolsDailyEmployee.render = function (id, tools_dailyemployee, result) {
    connection.query(`SELECT number FROM tools_dailyemployee WHERE tools_dailyemployee_id=${id}`, function (err, loan_number) {
        console.log("NOMBRE EMPRUNT: ",loan_number[0].number, "NOMBRE REMISE ", tools_dailyemployee.number)
        if (loan_number[0].number == tools_dailyemployee.number) {
            connection.query("UPDATE tools_dailyemployee SET number=?,rendered=?,delivery_date=? WHERE tools_dailyemployee_id=?", [0, 1, date, id], function (err, res) {
                connection.query(`SELECT * FROM tools_dailyemployee WHERE tools_dailyemployee_id=${id}`, function (err, tool) {
                    connection.query(`SELECT material_number FROM personnal_tools WHERE tool_id=${tool[0].tool_id}`, function (err, number) {
                        const renderNumber = loan_number[0].number + number[0].material_number
                        connection.query(`UPDATE personnal_tools SET material_number=${renderNumber} WHERE tool_id=${tool[0].tool_id}`)
                    })
                })
            })
        } else {
            const renderNumber = loan_number[0].number - tools_dailyemployee.number
            connection.query(`SELECT * FROM tools_dailyemployee WHERE tools_dailyemployee_id=${id}`, function (err, tool) {
                connection.query(`SELECT material_number FROM personnal_tools WHERE tool_id=${tool[0].tool_id}`, function (err,  number) {
                    const setNumber = parseInt(tools_dailyemployee.number) + parseInt(number[0].material_number)
                    connection.query(`UPDATE tools_dailyemployee SET number=${renderNumber},delivery_date='${date}' WHERE tools_dailyemployee_id=${id}`)
                    connection.query(`UPDATE personnal_tools SET material_number=${setNumber} WHERE tool_id=${tool[0].tool_id}`)
                })
            })            
        }
    })
}

module.exports = ToolsDailyEmployee