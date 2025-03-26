// backend/config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       // 替换为你的数据库用户名
  host: 'localhost',
  database: 'restaurant',   // 替换为你的数据库名
  password: 'COCOatbimh0130!',   // 替换为你的数据库密码
  port: 5432,
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
