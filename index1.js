const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 2000;
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_user',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/projects', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM projects');
    const results = { results: result ? result.rows : null };
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

app.post('/projects', async (req, res) => {
  try {
    const { project_name, description, start_date, employee_name, designation, upload_image } = req.body;
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO projects (project_name, description, start_date, employee_name, designation, upload_image) VALUES ($1, $2, $3, $4, $5, $6)',
      [project_name, description, start_date, employee_name, designation, upload_image]
    );
    const results = { results: result ? result.rows : null };
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

app.put('/projects/:project_id', async (req, res) => {
  try {
    const { project_id } = req.params;
    const { project_name, description, start_date, employee_name, designation, upload_image } = req.body;
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE projects SET project_name = $1, description = $2, start_date = $3, employee_name = $4, designation = $5, upload_image = $6 WHERE id = $7',
      [project_name, description, start_date, employee_name, designation, upload_image, id]
    );
    const results = { results: result ? result.rows : null };
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

app.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    const result = await client.query('DELETE FROM projects WHERE id = $1', [id]);
    const results = { results: result ? result.rows : null };
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
