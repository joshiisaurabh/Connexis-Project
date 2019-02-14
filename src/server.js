var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const { check, validationResult } = require('express-validator/check');
//I had assume employees array as database as there were issues while setup of sql and mongodb(also time was limited) but I know how to interface mongodb.
var employees=[
  { firstName: 'Saurabh', lastName: 'Joshi', email: 'joshiisaurabh@gmail.com',state:"Maharashtra",city:"Pune",address:"Khadki" },
]
app.use(bodyParser.json());
//Needeed this for cross domain .
app.use(function(req, res, next) {
  if (req.headers.origin) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
      res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
      if (req.method === 'OPTIONS') return res.sendStatus(200)
  }
  next()
})

// Initialize the app.
var server = app.listen(8090, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

/*"/api/employee"
 * GET: fetch all employess.
 */
  app.get("/api/fetchEmployees", function(req, res) {
  console.log("Hello"); 
   res.json(employees) ;
  });


/*"/api/employee"
 *POST:add employee.
 */
 app.post("/api/addEmployee",[
   //validations server side
  check('email').isEmail(),
  check('city').isLength({ min: 1 }),
  check('state').isLength({ min: 1 }),
  check('address').isLength({ min: 1 }),
  check('firstName').isLength({ min: 1 })
], function(req, res) {
  const errors = validationResult(req);
  //If error in validations
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  //If validation is successfull
  var employee={firstName:req.body.firstName, lastName:req.body.lastName, email:req.body.email,state:req.body.state,city:req.body.city,address:req.body.address};
  employees.push(employee);
  res.json(employees);
 });

