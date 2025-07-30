import pool from './db.js';

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('PostgreSQL connected:', res.rows[0]);
  }
});

