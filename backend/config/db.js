// backend/config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_HOST,       // 替换为你的数据库用户名
  host: process.env.DB_PORT,
  database: process.env.DB_USER,   // 替换为你的数据库名
  password: process.env.DB_PASSWORD,   // 替换为你的数据库密码
  port: 5432,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

const queryDB = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (err) {
    console.error('数据库查询错误：', err);
    throw err;
  }
};

module.exports = { pool, queryDB };
