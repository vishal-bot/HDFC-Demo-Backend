const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3002
const cors = require('cors');


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.options('*', cors())

app.use(function (req, res, next) {
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
app.get('/projects/:project_project_id', db.getProjectsById)
app.post('/projects', db.addProject)
app.put('/projects/:project_id', db.updateProject)
app.delete('/projects/:project_id', db.deleteProject)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})