
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mysql = require("mysql");
const path = require("path");
const jwt = require("jsonwebtoken");
const corsOptions = {
  origin:'http://localhost:3000', 
  credentials:true, //access-control-allow-credentials:true
  optionSuccessStatus:200
}

const app = express();

const port = 4000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptions)) 

const dailyEmployeeRoutes = require('./src/routes/dailyEmployeeRoutes');
const monthlyEmployeeRoutes = require('./src/routes/monthlyEmployeeRoutes');
const userRoutes = require('./src/routes/userRoutes');
const toolingRoutes = require('./src/routes/toolingRoutes');
const commonToolsRoutes = require('./src/routes/CommonToolsRoutes');
const personnalToolsRoutes = require('./src/routes/PersonnalToolsRoutes');
const fullEmployeesRoutes = require('./src/routes/fullEmployees');
const postRoutes = require('./src/routes/postRoutes')
const toolsDailyemployee = require('./src/routes/toolsDailyEmployeeRoutes')
const toolsMonthlyemployee = require('./src/routes/toolsMonthlyEmployeeRoutes')
const weekpresenceRoutes = require('./src/routes/weekPresenceRoutes')
const dailypresenceRoutes = require('./src/routes/dailyPresenceRoutes')
const monthlyweekpresenceRoutes = require('./src/routes/monthlyWeekPresenceRoutes')
const monthlypresenceRoutes = require('./src/routes/monthlyPresenceRoutes')
const cantineRoutes = require('./src/routes/cantineRoutes')
const congeRoutes = require('./src/routes/congeRoutes')
const contratDailyEmployeeRoutes = require('./src/routes/contratDailyEmployeeRoutes')
const contratMonthlyEmployeeRoutes = require('./src/routes/contratMonthlyEmployeeRoutes')
const serviceProviderRoutes = require('./src/routes/serviceProviderRoutes')
const permissionRoutes = require('./src/routes/permissionRoutes')
const monthlySalaryRoutes = require('./src/routes/monthlySalaryRoutes')


app.use('/api/dailyemployee', dailyEmployeeRoutes)
app.use('/api/monthlyemployee', monthlyEmployeeRoutes)
app.use('/api/user', userRoutes)
app.use('/api/tooling', toolingRoutes)
app.use('/api/commontools', commonToolsRoutes)
app.use('/api/personnaltools', personnalToolsRoutes)
app.use('/api/fullemployees',fullEmployeesRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/toolsdailyemployee', toolsDailyemployee)
app.use('/api/toolsmonthlyemployee', toolsMonthlyemployee) 
app.use('/api/weekpresence', weekpresenceRoutes) 
app.use('/api/monthlyweekpresence', monthlyweekpresenceRoutes) 
app.use('/api/dailypresence', dailypresenceRoutes)
app.use('/api/monthlypresence', monthlypresenceRoutes)
app.use('/api/cantine', cantineRoutes)
app.use('/api/conge', congeRoutes)
app.use('/api/contratdailyemployee', contratDailyEmployeeRoutes)
app.use('/api/contratmonthlyemployee', contratMonthlyEmployeeRoutes)
app.use('/api/serviceprovider', serviceProviderRoutes)
app.use('/api/permission', permissionRoutes)
app.use('/api/salarymonthly', monthlySalaryRoutes)


app.use(express.static(
  path.join(__dirname,"./client/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html")
  );
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
