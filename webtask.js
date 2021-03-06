'use latest';

const nconf = require('nconf');
const Webtask = require('webtask-tools');

const logger = require('./server/lib/logger');
logger.info('Starting webtask.');

module.exports = Webtask.fromExpress((req, res) => {
  nconf
    .defaults({
      AUTH0_DOMAIN: req.webtaskContext.secrets.AUTH0_DOMAIN,
      AUTH0_CLIENT_ID: req.webtaskContext.secrets.AUTH0_CLIENT_ID,
      AUTH0_CLIENT_SECRET: req.webtaskContext.secrets.AUTH0_CLIENT_SECRET,
      EXTENSION_SECRET: req.webtaskContext.secrets.EXTENSION_SECRET,
      NODE_ENV: 'production',
      HOSTING_ENV: 'webtask',
      CLIENT_VERSION: process.env.CLIENT_VERSION,
      WT_URL: req.webtaskContext.secrets.WT_URL
    });

  // Start the server.
  const server = require('./server');
  return server(req.webtaskContext.storage)(req, res);
});
