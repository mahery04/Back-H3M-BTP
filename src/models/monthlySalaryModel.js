var connection = require('../../config/db.config')

var MonthlySalary = function (monthlysalary) {
    this.monthlysalary_id = monthlysalary.monthlysalary_id
    this.monthlypresence_id = monthlysalary.monthlypresence_id
    this.month = monthlysalary.month
    this.monthlyemployee_id = monthlysalary.monthlyemployee_id
    this.number_work = monthlysalary.number_work
    this.montant_supplementaire = monthlysalary.montant_supplementaire
    this.absence = monthlysalary.absence
    this.prime = monthlysalary.prime
    this.conge = monthlysalary.conge
    this.indeminite_transport = monthlysalary.indeminite_transport
    this.autres_indeminités = monthlysalary.autres_indeminités
    this.salary_brut = monthlysalary.salary_brut
    this.ostie_part_employee = monthlysalary.ostie_part_employee
    this.cnaps_part_employee = monthlysalary.cnaps_part_employee
    this.montant_heure_imposable = monthlysalary.montant_heure_imposable
    this.irsa = monthlysalary.irsa
    this.montant_non_imposable = monthlysalary.montant_non_imposable
    this.avance_quinzaine = monthlysalary.avance_quinzaine
    this.avance_speciale = monthlysalary.avance_speciale
    this.enfant_charge = monthlysalary.enfant_charge
    this.autres_deductions = monthlysalary.autres_deductions
    this.salary_net = monthlysalary.salary_net
    this.ostie_part_patronale = monthlysalary.ostie_part_patronale
    this.cnaps_part_patronale = monthlysalary.cnaps_part_patronale
    this.fmpf = monthlysalary.fmpf
}

MonthlySalary.getMonth = function (result) {
    connection.query('SELECT MIN(monthlysalary_id) AS id, month FROM monthly_salary GROUP BY month', function (err,res) {
        if (err) {
            console.log("Error on fetch month",err);
            result(null,err)
        } 
        else {
            console.log(res);
            result(null,res)
        }
    }) 
}

MonthlySalary.globalView = function (month, result) {
    connection.query('SELECT * FROM monthly_salary ms JOIN monthly_presence mp ON ms.monthlypresence_id = mp.monthlypresence_id JOIN monthly_employee me ON ms.monthlyemployee_id = me.monthlyemployee_id WHERE ms.month=?', month.month, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    })
}

MonthlySalary.getEmployees = function (result) {
    connection.query("SELECT * FROM monthly_employee", function (err, res) {
        if (err) {
            console.log("Error while fetching employees: ", err);
            result(null, err);
        }
        else {
            console.log('Employees fetched successfully: ');
            result(null, res);
        }
    })
}

MonthlySalary.create = function (newMonthlySalary, result) {
    connection.query(`SELECT * FROM monthly_presence WHERE monthlyemployee_id=${newMonthlySalary.monthlyemployee_id} ORDER BY monthlyemployee_id DESC LIMIT 0,1`, function(err, absence) {
        connection.query(`SELECT * FROM monthly_employee WHERE monthlyemployee_id=${newMonthlySalary.monthlyemployee_id}`, function(err, employee) {
                // var numberDaysOneMonth = 30
                // var number_work_days = numberDaysOneMonth-absence[0].number_days_absence
                // var salaryBrut = (employee[0].salary * number_work_days / 30) + newMonthlySalary.montant_supplementaire - absence[0].number_days_absence + newMonthlySalary.prime + newMonthlySalary.indeminite_transport + newMonthlySalary.conge + newMonthlySalary.autres_indeminités
                // var ostiePartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
                // var cnapsPartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
                // var montant_heure_imposable = (salaryBrut-ostiePartEmployee-cnapsPartEmployee).toFixed(2)
                // if (montant_heure_imposable <= 400000) {
                //     var Irsa = Math.max((5/100)*(montant_heure_imposable-350000)).toFixed(2)
                // } else if(montant_heure_imposable <= 500000) {
                //     var Irsa = Math.max((montant_heure_imposable-400000)*(10/100) + 2500).toFixed(2)
                // } else if (montant_heure_imposable <= 600000) {
                //     var Irsa = Math.max((montant_heure_imposable-500000)*(15/100) + 12500).toFixed(2)
                // } else if(montant_heure_imposable > 600000) {
                //     var Irsa = Math.max((montant_heure_imposable-600000)*(20/100) + 27500).toFixed(2)
                // } else {
                //     var Irsa = 3000
                // }

                // var salary_net = (montant_heure_imposable - Irsa - newMonthlySalary.avance_quinzaine - newMonthlySalary.avance_speciale - newMonthlySalary.enfant_charge + newMonthlySalary.montant_non_imposable - newMonthlySalary.autres_deductions).toFixed(2)
                // var ostie_patronale = Math.min((217000*8)*(5/100),(salaryBrut*(5/100))).toFixed(2)
                // var cnaps_patronale = Math.min((217000*8)*(13/100),(salaryBrut*(13/100))).toFixed(2)
                // var fmpf = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)

                // console.log(
                //     "SALAIRE DE BASE ", employee[0].salary,
                //     "Nombre absence ", absence[0].number_days_absence,
                //     "MONTANT SUPPLEMENTAIRE ", newMonthlySalary.montant_supplementaire,
                //     "NUMBER WORK " ,number_work_days, 
                //     "SALARY BRUT ", salaryBrut,
                //     "OSTIE PART EMPLOYEE ", ostiePartEmployee,
                //     "CNAPS PART ELMPLOYEE ", cnapsPartEmployee,
                //     "MONTANT HEURE IMPOSZABLE ", montant_heure_imposable,
                //     "IRSA ", Irsa,
                //     "SALARY NET ", salary_net,
                //     "OSTIE PATRONALE ", ostie_patronale,
                //     "CNAPS PATRONALE ", cnaps_patronale,
                //     "FMPF ", fmpf
                // );

                if (!absence[0]) {
                    var numberDaysOneMonth = 30
                    var number_days_absence = 0
                    var number_work_days = numberDaysOneMonth-number_days_absence
                    // var salaryBrut = (employee[0].salary * number_work_days / 30) + newMonthlySalary.montant_supplementaire - number_days_absence + newMonthlySalary.prime + newMonthlySalary.indeminite_transport + newMonthlySalary.conge + newMonthlySalary.autres_indeminités
                    var salaryBrutPart1 = employee[0].salary * number_work_days
                    var salaryBrutPart2 = salaryBrutPart1/30
                    var salaryBrut = salaryBrutPart2 + parseInt(newMonthlySalary.montant_supplementaire) - number_days_absence + parseInt(newMonthlySalary.prime) + parseInt(newMonthlySalary.indeminite_transport) + parseInt(newMonthlySalary.conge) + parseInt(newMonthlySalary.autres_indeminités)
                    var ostiePartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
                    var cnapsPartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
                    var montant_heure_imposable = (salaryBrut-ostiePartEmployee-cnapsPartEmployee).toFixed(2)
                    if (montant_heure_imposable <= 400000) {
                        var Irsa = Math.max((5/100)*(montant_heure_imposable-350000)).toFixed(2)
                    } else if(montant_heure_imposable <= 500000) {
                        var Irsa = Math.max((montant_heure_imposable-400000)*(10/100) + 2500).toFixed(2)
                    } else if (montant_heure_imposable <= 600000) {
                        var Irsa = Math.max((montant_heure_imposable-500000)*(15/100) + 12500).toFixed(2)
                    } else if(montant_heure_imposable > 600000) {
                        var Irsa = Math.max((montant_heure_imposable-600000)*(20/100) + 27500).toFixed(2)
                    } else {
                        var Irsa = 3000
                    }
    
                    var salary_net = (montant_heure_imposable - Irsa - parseInt(newMonthlySalary.avance_quinzaine) - parseInt(newMonthlySalary.avance_speciale) - parseInt(newMonthlySalary.enfant_charge) + parseInt(newMonthlySalary.montant_non_imposable) - parseInt(newMonthlySalary.autres_deductions)).toFixed(2)
                    
                    var ostie_patronale = Math.min((217000*8)*(5/100),(salaryBrut*(5/100))).toFixed(2)
                    var cnaps_patronale = Math.min((217000*8)*(13/100),(salaryBrut*(13/100))).toFixed(2)
                    var fmpf = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)

                    console.log("salaire brut = ", salaryBrut);

                    connection.query(`INSERT INTO monthly_salary set month="${newMonthlySalary.month}", monthlypresence_id = 0, monthlyemployee_id = ${newMonthlySalary.monthlyemployee_id},number_work=${number_work_days}, montant_supplementaire = ${newMonthlySalary.montant_supplementaire}, absence=${number_days_absence}, prime = ${newMonthlySalary.prime}, conge = ${newMonthlySalary.conge}, indeminite_transport = ${newMonthlySalary.indeminite_transport}, autres_indeminités = ${newMonthlySalary.autres_deductions}, salary_brut= ${salaryBrut}, ostie_part_employee=${ostiePartEmployee}, cnaps_part_employee=${cnapsPartEmployee}, montant_heure_imposable=${montant_heure_imposable}, irsa=${Irsa}, montant_non_imposable = ${newMonthlySalary.montant_non_imposable}, avance_quinzaine = ${newMonthlySalary.avance_quinzaine}, avance_speciale = ${newMonthlySalary.avance_speciale}, enfant_charge = ${newMonthlySalary.enfant_charge}, autres_deductions = ${newMonthlySalary.autres_deductions}, salary_net=${salary_net}, ostie_part_patronale=${ostie_patronale}, cnaps_part_patronale=${cnaps_patronale}, fmpf=${fmpf}`, function (err, res) {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err)
                        } else {
                            console.log(res);
                            result(null, res)
                        }
                    })

                } else {
                    var numberDaysOneMonth = 30
                    var number_work_days = numberDaysOneMonth-absence[0].number_days_absence
                    var salaryBrutPart1 = employee[0].salary * number_work_days
                    var salaryBrutPart2 = salaryBrutPart1/30
                    var salaryBrut = salaryBrutPart2 + parseInt(newMonthlySalary.montant_supplementaire) - absence[0].number_days_absence + parseInt(newMonthlySalary.prime) + parseInt(newMonthlySalary.indeminite_transport) + parseInt(newMonthlySalary.conge) + parseInt(newMonthlySalary.autres_indeminités)
                    var ostiePartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
                    var cnapsPartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
                    var montant_heure_imposable = (salaryBrut-ostiePartEmployee-cnapsPartEmployee).toFixed(2)
                    if (montant_heure_imposable <= 400000) {
                        var Irsa = Math.max((5/100)*(montant_heure_imposable-350000)).toFixed(2)
                    } else if(montant_heure_imposable <= 500000) {
                        var Irsa = Math.max((montant_heure_imposable-400000)*(10/100) + 2500).toFixed(2)
                    } else if (montant_heure_imposable <= 600000) {
                        var Irsa = Math.max((montant_heure_imposable-500000)*(15/100) + 12500).toFixed(2)
                    } else if(montant_heure_imposable > 600000) {
                        var Irsa = Math.max((montant_heure_imposable-600000)*(20/100) + 27500).toFixed(2)
                    } else {
                        var Irsa = 3000
                    }

                    var salary_net = (montant_heure_imposable - Irsa - newMonthlySalary.avance_quinzaine - newMonthlySalary.avance_speciale - newMonthlySalary.enfant_charge + newMonthlySalary.montant_non_imposable - newMonthlySalary.autres_deductions).toFixed(2)
                    var ostie_patronale = Math.min((217000*8)*(5/100),(salaryBrut*(5/100))).toFixed(2)
                    var cnaps_patronale = Math.min((217000*8)*(13/100),(salaryBrut*(13/100))).toFixed(2)
                    var fmpf = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)

                
                    connection.query(`INSERT INTO monthly_salary set month="${newMonthlySalary.month}", monthlypresence_id = ${absence[0].monthlypresence_id}, monthlyemployee_id = ${newMonthlySalary.monthlyemployee_id},number_work=${number_work_days}, montant_supplementaire = ${newMonthlySalary.montant_supplementaire}, absence=${absence[0].number_days_absence}, prime = ${newMonthlySalary.prime}, conge = ${newMonthlySalary.conge}, indeminite_transport = ${newMonthlySalary.indeminite_transport}, autres_indeminités = ${newMonthlySalary.autres_deductions}, salary_brut= ${salaryBrut}, ostie_part_employee=${ostiePartEmployee}, cnaps_part_employee=${cnapsPartEmployee}, montant_heure_imposable=${montant_heure_imposable}, irsa=${Irsa}, montant_non_imposable = ${newMonthlySalary.montant_non_imposable}, avance_quinzaine = ${newMonthlySalary.avance_quinzaine}, avance_speciale = ${newMonthlySalary.avance_speciale}, enfant_charge = ${newMonthlySalary.enfant_charge}, autres_deductions = ${newMonthlySalary.autres_deductions}, salary_net=${salary_net}, ostie_part_patronale=${ostie_patronale}, cnaps_part_patronale=${cnaps_patronale}, fmpf=${fmpf}`, function (err, res) {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err)
                        } else {
                            console.log(res);
                            result(null, res)
                        }
                    })
                }
            // if (absence[0]) {
            //     connection.query(`INSERT INTO monthly_salary set month="${newMonthlySalary.month}", monthlypresence_id = ${absence[0].monthlypresence_id}, monthlyemployee_id = ${newMonthlySalary.monthlyemployee_id},number_work=${number_work_days}, montant_supplementaire = ${newMonthlySalary.montant_supplementaire}, absence=${absence[0].number_days_absence}, prime = ${newMonthlySalary.prime}, conge = ${newMonthlySalary.conge}, indeminite_transport = ${newMonthlySalary.indeminite_transport}, autres_indeminités = ${newMonthlySalary.autres_deductions}, salary_brut= ${salaryBrut}, ostie_part_employee=${ostiePartEmployee}, cnaps_part_employee=${cnapsPartEmployee}, montant_heure_imposable=${montant_heure_imposable}, irsa=${Irsa}, montant_non_imposable = ${newMonthlySalary.montant_non_imposable}, avance_quinzaine = ${newMonthlySalary.avance_quinzaine}, avance_speciale = ${newMonthlySalary.avance_speciale}, enfant_charge = ${newMonthlySalary.enfant_charge}, autres_deductions = ${newMonthlySalary.autres_deductions}, salary_net=${salary_net}, ostie_part_patronale=${ostie_patronale}, cnaps_part_patronale=${cnaps_patronale}, fmpf=${fmpf}`, function (err, res) {
            //         if (err) {
            //             console.log("error: ", err);
            //             result(null, err)
            //         } else {
            //             console.log(res);
            //             result(null, res)
            //         }
            //     })
            // } else {
            //     connection.query(`INSERT INTO monthly_salary set monthlypresence_id = 0, month="${newMonthlySalary.month}", monthlyemployee_id = ${newMonthlySalary.monthlyemployee_id}, number_work=${number_work_days}, montant_supplementaire = ${newMonthlySalary.montant_supplementaire}, absence=0, prime = ${newMonthlySalary.prime}, conge = ${newMonthlySalary.conge}, indeminite_transport = ${newMonthlySalary.indeminite_transport}, autres_indeminités = ${newMonthlySalary.autres_deductions}, salary_brut= ${salaryBrut}, ostie_part_employee=${ostiePartEmployee}, cnaps_part_employee=${cnapsPartEmployee}, montant_heure_imposable=${montant_heure_imposable}, irsa=${Irsa}, montant_non_imposable = ${newMonthlySalary.montant_non_imposable}, avance_quinzaine = ${newMonthlySalary.avance_quinzaine}, avance_speciale = ${newMonthlySalary.avance_speciale}, enfant_charge = ${newMonthlySalary.enfant_charge}, autres_deductions = ${newMonthlySalary.autres_deductions}, salary_net=${salary_net}, ostie_part_patronale=${ostie_patronale}, cnaps_part_patronale=${cnaps_patronale}, fmpf=${fmpf}`, function (err, res) {
            //         if (err) {
            //             console.log("error: ", err);
            //             result(null, err)
            //         } else {
            //             console.log(res);
            //             result(null, res)
            //         }
            //     })
            // }
        })   
    }) 
}

MonthlySalary.findById = function (id, result) {
    connection.query("SELECT * FROM monthly_salary ms JOIN monthly_presence mp ON ms.monthlypresence_id = mp.monthlypresence_id JOIN monthly_employee me ON ms.monthlyemployee_id = me.monthlyemployee_id WHERE monthlysalary_id = ?", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
        
    })
}

MonthlySalary.findAll = function (id,result) {
    connection.query("SELECT * FROM monthly_salary ms JOIN monthly_presence mp ON ms.monthlypresence_id = mp.monthlypresence_id JOIN monthly_employee me ON ms.monthlyemployee_id = me.monthlyemployee_id WHERE ms.monthlyemployee_id=?",id, function (err, res) {
        if (err) {
            console.log("Error while fetching employees: ", err);
            result(null, err);
        }
        else {
            console.log('Monthly Salary fetched successfully: ');
            result(null, res);
        }
    })
}

MonthlySalary.update = function (id,monthlysalary, result) {
    
    // var numberDaysOneMonth = 30
    // var number_work_days = numberDaysOneMonth-absence[0].number_days_absence
    // var salaryBrut = (employee[0].salary * number_work_days / 30) + monthlysalary.montant_supplementaire - absence[0].number_days_absence + monthlysalary.prime + monthlysalary.indeminite_transport + monthlysalary.conge + monthlysalary.autres_indeminités
    // var ostiePartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
    // var cnapsPartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
    // var montant_heure_imposable = (salaryBrut-ostiePartEmployee-cnapsPartEmployee).toFixed(2)
    // if (montant_heure_imposable <= 400000) {
    //     var Irsa = Math.max((5/100)*(montant_heure_imposable-350000)).toFixed(2)
    // } else if(montant_heure_imposable <= 500000) {
    //     var Irsa = Math.max((montant_heure_imposable-400000)*(10/100) + 2500).toFixed(2)
    // } else if (montant_heure_imposable <= 600000) {
    //     var Irsa = Math.max((montant_heure_imposable-500000)*(15/100) + 12500).toFixed(2)
    // } else if(montant_heure_imposable > 600000) {
    //     var Irsa = Math.max((montant_heure_imposable-600000)*(20/100) + 27500).toFixed(2)
    // } else {
    //     var Irsa = 3000
    // }

    // var salary_net = (montant_heure_imposable - Irsa - monthlysalary.avance_quinzaine - monthlysalary.avance_speciale - monthlysalary.enfant_charge + monthlysalary.montant_non_imposable - monthlysalary.autres_deductions).toFixed(2)
    // var ostie_patronale = Math.min((217000*8)*(5/100),(salaryBrut*(5/100))).toFixed(2)
    // var cnaps_patronale = Math.min((217000*8)*(13/100),(salaryBrut*(13/100))).toFixed(2)
    // var fmpf = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)

    // connection.query(`UPDATE monthly_salary set monthlypresence_id = ${absence[0].monthlypresence_id}, month="${monthlysalary.month}", monthlyemployee_id = ${monthlysalary.monthlyemployee_id}, number_work=${number_work_days}, montant_supplementaire = ${monthlysalary.montant_supplementaire}, absence=${absence[0].number_days_absence}, prime = ${monthlysalary.prime}, conge = ${monthlysalary.conge}, indeminite_transport = ${monthlysalary.indeminite_transport}, autres_indeminités = ${monthlysalary.autres_deductions}, salary_brut= ${salaryBrut}, ostie_part_employee=${ostiePartEmployee}, cnaps_part_employee=${cnapsPartEmployee}, montant_heure_imposable=${montant_heure_imposable}, irsa=${Irsa}, montant_non_imposable = ${monthlysalary.montant_non_imposable}, avance_quinzaine = ${monthlysalary.avance_quinzaine}, avance_speciale = ${monthlysalary.avance_speciale}, enfant_charge = ${monthlysalary.enfant_charge}, autres_deductions = ${monthlysalary.autres_deductions}, salary_net=${salary_net}, ostie_part_patronale=${ostie_patronale}, cnaps_part_patronale=${cnaps_patronale}, fmpf=${fmpf} WHERE monthlysalary_id=${id}`,function (err,res) {
    //     if (err) {
    //         console.log("error: ", err);
    //         result(null, err);
    //     } else {
    //         result(null, res); 
    //     }
    // })
    if (!absence[0]) {
        var numberDaysOneMonth = 30
        var number_days_absence = 0
        var number_work_days = numberDaysOneMonth-number_days_absence
        // var salaryBrut = (employee[0].salary * number_work_days / 30) + newMonthlySalary.montant_supplementaire - number_days_absence + newMonthlySalary.prime + newMonthlySalary.indeminite_transport + newMonthlySalary.conge + newMonthlySalary.autres_indeminités
        var salaryBrutPart1 = employee[0].salary * number_work_days
        var salaryBrutPart2 = salaryBrutPart1/30
        var salaryBrut = salaryBrutPart2 + parseInt(monthlysalary.montant_supplementaire) - number_days_absence + parseInt(monthlysalary.prime) + parseInt(monthlysalary.indeminite_transport) + parseInt(monthlysalary.conge) + parseInt(monthlysalary.autres_indeminités)
        var ostiePartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
        var cnapsPartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
        var montant_heure_imposable = (salaryBrut-ostiePartEmployee-cnapsPartEmployee).toFixed(2)
        if (montant_heure_imposable <= 400000) {
            var Irsa = Math.max((5/100)*(montant_heure_imposable-350000)).toFixed(2)
        } else if(montant_heure_imposable <= 500000) {
            var Irsa = Math.max((montant_heure_imposable-400000)*(10/100) + 2500).toFixed(2)
        } else if (montant_heure_imposable <= 600000) {
            var Irsa = Math.max((montant_heure_imposable-500000)*(15/100) + 12500).toFixed(2)
        } else if(montant_heure_imposable > 600000) {
            var Irsa = Math.max((montant_heure_imposable-600000)*(20/100) + 27500).toFixed(2)
        } else {
            var Irsa = 3000
        }

        var salary_net = (montant_heure_imposable - Irsa - monthlysalary.avance_quinzaine - monthlysalary.avance_speciale - monthlysalary.enfant_charge + monthlysalary.montant_non_imposable - monthlysalary.autres_deductions).toFixed(2)
        var ostie_patronale = Math.min((217000*8)*(5/100),(salaryBrut*(5/100))).toFixed(2)
        var cnaps_patronale = Math.min((217000*8)*(13/100),(salaryBrut*(13/100))).toFixed(2)
        var fmpf = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)

        console.log("salaire brut = ", salaryBrut);

        connection.query(`UPDATE monthly_salary set month="${monthlysalary.month}", monthlypresence_id = 0, monthlyemployee_id = ${monthlysalary.monthlyemployee_id},number_work=${number_work_days}, montant_supplementaire = ${monthlysalary.montant_supplementaire}, absence=${number_days_absence}, prime = ${monthlysalary.prime}, conge = ${monthlysalary.conge}, indeminite_transport = ${monthlysalary.indeminite_transport}, autres_indeminités = ${monthlysalary.autres_deductions}, salary_brut= ${salaryBrut}, ostie_part_employee=${ostiePartEmployee}, cnaps_part_employee=${cnapsPartEmployee}, montant_heure_imposable=${montant_heure_imposable}, irsa=${Irsa}, montant_non_imposable = ${monthlysalary.montant_non_imposable}, avance_quinzaine = ${monthlysalary.avance_quinzaine}, avance_speciale = ${monthlysalary.avance_speciale}, enfant_charge = ${monthlysalary.enfant_charge}, autres_deductions = ${monthlysalary.autres_deductions}, salary_net=${salary_net}, ostie_part_patronale=${ostie_patronale}, cnaps_part_patronale=${cnaps_patronale}, fmpf=${fmpf}`, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err)
            } else {
                console.log(res);
                result(null, res)
            }
        })

    } else {
        var numberDaysOneMonth = 30
        var number_work_days = numberDaysOneMonth-absence[0].number_days_absence
        var salaryBrutPart1 = employee[0].salary * number_work_days
        var salaryBrutPart2 = salaryBrutPart1/30
        var salaryBrut = salaryBrutPart2 + parseInt(monthlysalary.montant_supplementaire) - absence[0].number_days_absence + parseInt(monthlysalary.prime) + parseInt(monthlysalary.indeminite_transport) + parseInt(monthlysalary.conge) + parseInt(monthlysalary.autres_indeminités)
        var ostiePartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
        var cnapsPartEmployee = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)
        var montant_heure_imposable = (salaryBrut-ostiePartEmployee-cnapsPartEmployee).toFixed(2)
        if (montant_heure_imposable <= 400000) {
            var Irsa = Math.max((5/100)*(montant_heure_imposable-350000)).toFixed(2)
        } else if(montant_heure_imposable <= 500000) {
            var Irsa = Math.max((montant_heure_imposable-400000)*(10/100) + 2500).toFixed(2)
        } else if (montant_heure_imposable <= 600000) {
            var Irsa = Math.max((montant_heure_imposable-500000)*(15/100) + 12500).toFixed(2)
        } else if(montant_heure_imposable > 600000) {
            var Irsa = Math.max((montant_heure_imposable-600000)*(20/100) + 27500).toFixed(2)
        } else {
            var Irsa = 3000
        }

        var salary_net = (montant_heure_imposable - Irsa - monthlysalary.avance_quinzaine - monthlysalary.avance_speciale - monthlysalary.enfant_charge + monthlysalary.montant_non_imposable - monthlysalary.autres_deductions).toFixed(2)
        var ostie_patronale = Math.min((217000*8)*(5/100),(salaryBrut*(5/100))).toFixed(2)
        var cnaps_patronale = Math.min((217000*8)*(13/100),(salaryBrut*(13/100))).toFixed(2)
        var fmpf = Math.min((217000*8)*(1/100),(salaryBrut*(1/100))).toFixed(2)

    
        connection.query(`UPDATE INTO monthly_salary set month="${monthlysalary.month}", monthlypresence_id = ${absence[0].monthlypresence_id}, monthlyemployee_id = ${monthlysalary.monthlyemployee_id},number_work=${number_work_days}, montant_supplementaire = ${monthlysalary.montant_supplementaire}, absence=${absence[0].number_days_absence}, prime = ${monthlysalary.prime}, conge = ${monthlysalary.conge}, indeminite_transport = ${monthlysalary.indeminite_transport}, autres_indeminités = ${monthlysalary.autres_deductions}, salary_brut= ${salaryBrut}, ostie_part_employee=${ostiePartEmployee}, cnaps_part_employee=${cnapsPartEmployee}, montant_heure_imposable=${montant_heure_imposable}, irsa=${Irsa}, montant_non_imposable = ${monthlysalary.montant_non_imposable}, avance_quinzaine = ${monthlysalary.avance_quinzaine}, avance_speciale = ${monthlysalary.avance_speciale}, enfant_charge = ${monthlysalary.enfant_charge}, autres_deductions = ${monthlysalary.autres_deductions}, salary_net=${salary_net}, ostie_part_patronale=${ostie_patronale}, cnaps_part_patronale=${cnaps_patronale}, fmpf=${fmpf}`, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err)
            } else {
                console.log(res);
                result(null, res)
            }
        })
    }
}

MonthlySalary.delete = function (id,result) {
    connection.query("DELETE FROM monthly_salary WHERE monthlysalary_id = ?",[id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

module.exports = MonthlySalary;
