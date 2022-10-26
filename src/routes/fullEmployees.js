const express = require('express')
const router = express.Router()
const fullEmployeesControler = require('../controllers/fullEmployees')

router.get('/btp_count',fullEmployeesControler.btp)

router.get('/sip_count',fullEmployeesControler.sip)

router.get('/parapharmaceutique_count',fullEmployeesControler.parapharmaceutique)

module.exports = router