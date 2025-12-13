const morgan = require('morgan');

// Custom logging middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
};

module.exports = { logger, morgan };
