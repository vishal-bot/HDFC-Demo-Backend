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


const getProjects = async (request, response) => {

  response.send(
    [
      {
        "project_id": 1001,
        "project_name": "Project 1",
        "description": "Description of Project 1",
        "start_date": "2022-01-01",
        "employee_name": "John Doe",
        "designation": "Software Engineer"
      },
      {
        "project_id": 1002,
        "project_name": "Project 2",
        "description": "Description of Project 2",
        "start_date": "2022-02-01",
        "employee_name": "Jane Doe",
        "designation": "Product Manager"
      },
      {
        "project_id": 1003,
        "project_name": "Project 3",
        "description": "Description of Project 3",
        "start_date": "2022-03-01",
        "employee_name": "Bob Smith",
        "designation": "Data Analyst"
      },
      {
        "project_id": 1004,
        "project_name": "Project 4",
        "description": "Description of Project 4",
        "start_date": "2022-04-01",
        "employee_name": "Alice Smith",
        "designation": "Software Developer"
      },
      {
        "project_id": 1005,
        "project_name": "Project 5",
        "description": "Description of Project 5",
        "start_date": "2022-05-01",
        "employee_name": "Bob Johnson",
        "designation": "Product Designer"
      },
      {
        "project_id": 1006,
        "project_name": "Project 6",
        "description": "Description of Project 6",
        "start_date": "2022-06-01",
        "employee_name": "Charlie Brown",
        "designation": "Data Scientist"
      },
      {
        "project_id": 1007,
        "project_name": "Project 7",
        "description": "Description of Project 7",
        "start_date": "2022-07-01",
        "employee_name": "David Lee",
        "designation": "Software Engineer"
      },
      {
        "project_id": 1008,
        "project_name": "Project 8",
        "description": "Description of Project 8",
        "start_date": "2022-08-01",
        "employee_name": "Emily Davis",
        "designation": "Product Manager"
      },
      {
        "project_id": 1009,
        "project_name": "Project 9",
        "description": "Description of Project 9",
        "start_date": "2022-09-01",
        "employee_name": "Frank Wilson",
        "designation": "Data Analyst"
      },
      {
        "project_id": 1010,
        "project_name": "Project 10",
        "description": "Description of Project 10",
        "start_date": "2022-10-01",
        "employee_name": "Grace Taylor",
        "designation": "Software Developer"
      },
      {
        "project_id": 1011,
        "project_name": "Project 11",
        "description": "Description of Project 11",
        "start_date": "2022-11-01",
        "employee_name": "Henry Martin",
        "designation": "Product Designer"
      },
      {
        "project_id": 1012,
        "project_name": "Project 12",
        "description": "Description of Project 12",
        "start_date": "2022-12-01",
        "employee_name": "Isabella Brown",
        "designation": "Data Scientist"
      },
      {
        "project_id": 1013,
        "project_name": "Project 13",
        "description": "Description of Project 13",
        "start_date": "2023-01-01",
        "employee_name": "Jack Anderson",
        "designation": "Software Engineer"
      },
      {
        "project_id": 1014,
        "project_name": "Project 14",
        "description": "Description of Project 14",
        "start_date": "2023-02-01",
        "employee_name": "Katherine Lee",
        "designation": "Product Manager"
      },
      {
        "project_id": 1015,
        "project_name": "Project 15",
        "description": "Description of Project 15",
        "start_date": "2023-03-01",
        "employee_name": "Liam Wilson",
        "designation": "Data Analyst"
      }
    ]
    
)
  



    // try {
    //     const client = await pool.connect();
    //     const result = await client.query('SELECT * FROM projects');
    //     const results = { results: result ? result.rows : null };
    //     res.send(results);
    //     client.release();
    //   } catch (err) {
    //     console.error(err);
    //     res.send('Error ' + err);
    //   }

    // pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     response.status(200).json(results.rows)
    // })
}
const getProjectsById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM projects WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const addProject = async (request, response) => {
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
}
const updateProject = async (request, response) => {
    try {
        const { id } = req.params;
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
}
const deleteProject = async (request, response) => {
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
}
module.exports = {
    getProjects,
    getProjectsById,
    addProject,
    updateProject,
    deleteProject,
}