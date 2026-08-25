const { getPool } = require('./_lib/database');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await getPool().query('SELECT 1');
    return res.status(200).json({ success: true, database: 'connected' });
  } catch (error) {
    console.error('Database health check failed', error.message);
    return res.status(503).json({ success: false, database: 'unavailable' });
  }
};
