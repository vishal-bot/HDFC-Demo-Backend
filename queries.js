const Pool = require('pg').Pool

// const pool = new Pool({
//     user: 'johndoe',
//     host: 'localhost',
//     database: 'user_db',
//     password: 'example1234',
//     port: 5432,
// })

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

// CREATE TABLE table_name (
//   project_id SERIAL PRIMARY KEY,
//   project_name TEXT,
//   description TEXT,
//   start_date DATE,
//   employee_name TEXT,
//   designation TEXT
// );


const getProjects = async (req, res) => {

    try {
        const client = await pool.connect();
        // const result = await client.query('SELECT * FROM projects');
        // const results = { results: result ? result.rows : null };
        // //res.send(results);
        // res.status(200).json(result.data);


        pool.query('SELECT * FROM projects ORDER BY project_id ASC', (error, results) => {
          if (error) {
              throw error
          }
          res.status(200).json(results.rows)
      })
        client.release();
      } catch (err) {
        console.error(err);
        res.send('Error ' + err);
      }

    // pool.query('SELECT * FROM projects ORDER BY project_id ASC', (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     res.status(200).json(results.rows)
    // })
}
const getProjectsById = (req, res) => {
    const project_id = parseInt(request.params.project_id)
    pool.query('SELECT * FROM projects WHERE project_id = $1', [project_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}


const addProject = async (req, res) => {
    try {
        const { project_name, description, start_date, employee_name, designation} = req.body;
        const client = await pool.connect();
        const result = await client.query(
          'INSERT INTO projects (project_name, description, start_date, employee_name, designation) VALUES ($1, $2, $3, $4, $5)',
          [project_name, description, start_date, employee_name, designation]
        );
        const results = { results: result ? result.rows : null };
        res.send(results);
        client.release();
      } catch (err) {
        console.error(err);
        res.send('Error ' + err);
      }
}
const updateProject = async (req, res) => {
    try {
        const { project_id } = req.params;
        const { project_name, description, start_date, employee_name, designation } = req.body;
        const client = await pool.connect();
        const result = await client.query(
          'UPDATE projects SET project_name = $1, description = $2, start_date = $3, employee_name = $4, designation = $5 WHERE project_id = $6',
          [project_name, description, start_date, employee_name, designation, project_id]
        );
        const results = { results: result ? result.rows : null };
        res.send(results);
        client.release();
      } catch (err) {
        console.error(err);
        res.send('Error ' + err);
      }
}
const deleteProject = async (req, res) => {
    try {
        const { project_id } = req.params;
        const client = await pool.connect();
        const result = await client.query('DELETE FROM projects WHERE project_id = $1', [project_id]);
        const results = { results: result ? result.rows : null };
        res.send(results);
        client.release();
      } catch (err) {
        console.error(err);
        res.send('Error ' + err);
      }
}
module.exports = {
    getProjects,
    getProjectsById,
    addProject,
    updateProject,
    deleteProject,
}