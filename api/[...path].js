/**
 * Migration guard for former PHP endpoints. Each endpoint must be ported to a
 * dedicated Node handler before it can access the cloud database.
 */
module.exports = function handler(req, res) {
  const path = Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path;
  return res.status(501).json({
    success: false,
    message: `The API endpoint /${path || ''} has not been ported from PHP yet.`,
  });
};
