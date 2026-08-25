const mysql = require('mysql2/promise');

let pool;

function getPool() {
  if (!pool) {
    const required = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
    const missing = required.filter((name) => !process.env[name]);
    if (missing.length) {
      throw new Error(`Database configuration is incomplete: ${missing.join(', ')}`);
    }

    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      waitForConnections: true,
      connectionLimit: 5,
      ssl: process.env.DB_SSL === 'false' ? undefined : { rejectUnauthorized: true },
    });
  }
  return pool;
}

module.exports = { getPool };
