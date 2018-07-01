const config = {};

config.port = process.env.WEB_PORT || 3333;
config.env = process.env.ENV;

module.exports = config;
