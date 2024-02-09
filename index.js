const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 2000
const Pool = require('pg').Pool

const pool = new Pool({
    connectionString: 'postgres://pxwpulnf:ZuSlW7x-ZqQMcjvFCTHcufF4dDPEPk2I@baasu.db.elephantsql.com/pxwpulnf',
  });
  
  // Test the database connection
  pool.connect((err, client, done) => {
    if (err) {
      console.error('Error connecting to the database', err);
    } else {
      console.log('Connected to the database');
    }
  });


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get('/', (request, response) => {
    response.json({
        info: 'Node.js, Express, and Postgres API'
    })
})

app.get('/projects', db.getProjects)
app.get('/projects/:id', db.getProjectsById)
app.post('/projects', db.addProject)
app.put('/projects/:id', db.updateProject)
app.delete('/projects/:id', db.deleteProject)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})