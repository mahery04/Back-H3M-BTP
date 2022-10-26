var connection = require('../../config/db.config')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var ToolsMonthlyEmployee = function (toolsmonthlyemployee) {
    this.tools_monthlyemployee_id   = toolsmonthlyemployee.tools_monthlyemployee_id;
    this.tool_id                    = toolsmonthlyemployee.tool_id;
    this.number                     = toolsmonthlyemployee.number;
    this.loan_date                  = toolsmonthlyemployee.loan_date;
    this.rendered                   = toolsmonthlyemployee.rendered;
    this.delivery_date              = toolsmonthlyemployee.delivery_date;
    this.monthlyemployee_id         = toolsmonthlyemployee.monthlyemployee_id;
}

ToolsMonthlyEmployee.getById = function (id, result) {
    connection.query("SELECT tools_monthlyemployee_id, article_name, number, loan_date, rendered, delivery_date FROM tools_monthlyemployee td JOIN monthly_employee de ON td.`monthlyemployee_id`=de.`monthlyemployee_id` JOIN personnal_tools pt ON td.`tool_id`=pt.`tool_id` WHERE de.`monthlyemployee_id`=? AND rendered=0", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    })
}

ToolsMonthlyEmployee.getOne = function (id, result) {
    connection.query("SELECT * FROM tools_monthlyemployee WHERE tools_monthlyemployee_id=?", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    })
}

ToolsMonthlyEmployee.getNumber = function(id, result) {
    connection.query("SELECT material_number FROM personnal_tools WHERE tool_id=?",id, function (err,res) {
        if (err) {
            console.log("error ",err);
            result(null, err)
        }else {
            result(null,res)
        }
        
    })
}

ToolsMonthlyEmployee.new = function (newToolsMonthlyEmployee, result) {
    newToolsMonthlyEmployee.rendered = 0
    connection.query("INSERT INTO tools_monthlyemployee SET ?", newToolsMonthlyEmployee, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null,err)
        } else {
            console.log(res);
            result(null,res)
            connection.query(`SELECT material_number FROM personnal_tools WHERE tool_id=${newToolsMonthlyEmployee.tool_id}`, function(err, number) {
                const newNumber = number[0].material_number - newToolsMonthlyEmployee.number;
                console.log(newNumber)
                connection.query(`UPDATE personnal_tools SET material_number=${newNumber} WHERE tool_id=${newToolsMonthlyEmployee.tool_id}`)
            })
            
        }
    })
}

// ToolsMonthlyEmployee.new = function (newToolsMonthlyEmployee, result) {
//     newToolsMonthlyEmployee.rendered = 0
//     newToolsMonthlyEmployee.delivery_date = date
//     connection.query("INSERT INTO tools_monthlyemployee SET ?", newToolsMonthlyEmployee, function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(null,err)
//         } else {
//             console.log(res);
//             result(null,res)
//             connection.query(`SELECT material_number FROM personnal_tools WHERE tool_id=${newToolsMonthlyEmployee.tool_id}`, function(err, number) {
//                 const newNumber = number[0].material_number - newToolsMonthlyEmployee.number;
//                 console.log(newNumber)
//                 connection.query(`UPDATE personnal_tools SET material_number=${newNumber} WHERE tool_id=${newToolsMonthlyEmployee.tool_id}`)
//             })
//         }
//     })
// }

ToolsMonthlyEmployee.render = function (id, tools_monthlyemployee, result) {
    connection.query(`SELECT number FROM tools_monthlyemployee WHERE tools_monthlyemployee_id=${id}`, function (err, loan_number) {
        console.log("NOMBRE EMPRUNT: ",loan_number[0].number, "NOMBRE REMISE ", tools_monthlyemployee.number)
        if (loan_number[0].number == tools_monthlyemployee.number) {
            connection.query("UPDATE tools_monthlyemployee SET number=?,rendered=?,delivery_date=? WHERE tools_monthlyemployee_id=?", [0, 1, date, id], function (err, res) {
                connection.query(`SELECT * FROM tools_monthlyemployee WHERE tools_monthlyemployee_id=${id}`, function (err, tool) {
                    connection.query(`SELECT material_number FROM personnal_tools WHERE tool_id=${tool[0].tool_id}`, function (err, number) {
                        const renderNumber = loan_number[0].number + number[0].material_number
                        connection.query(`UPDATE personnal_tools SET material_number=${renderNumber} WHERE tool_id=${tool[0].tool_id}`)
                    })
                })
            })
        } else {
            const renderNumber = loan_number[0].number - tools_monthlyemployee.number
            connection.query(`SELECT * FROM tools_monthlyemployee WHERE tools_monthlyemployee_id=${id}`, function (err, tool) {
                connection.query(`SELECT material_number FROM personnal_tools WHERE tool_id=${tool[0].tool_id}`, function (err,  number) {
                    const setNumber = parseInt(tools_monthlyemployee.number) + parseInt(number[0].material_number)
                    connection.query(`UPDATE tools_monthlyemployee SET number=${renderNumber},delivery_date='${date}' WHERE tools_monthlyemployee_id=${id}`)
                    connection.query(`UPDATE personnal_tools SET material_number=${setNumber} WHERE tool_id=${tool[0].tool_id}`)
                })
            })            
        }
    })
}

module.exports = ToolsMonthlyEmployee