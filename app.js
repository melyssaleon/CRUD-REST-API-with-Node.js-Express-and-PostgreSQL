import express from 'express';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  req.userIp = ip;
  next();
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: 'DB connected!', 
      time: result.rows[0].now,
      userIp: req.userIp  
    });
  } catch (error) {
    res.status(500).json({ error: 'DB connection failed', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
