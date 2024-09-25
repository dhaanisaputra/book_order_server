// eslint-disable-next-line no-undef
const environment = process.env.NODE_ENV || "dev";
const knex = require("knex");
const config = require("./knexfile");

module.exports = knex(config[environment.trim()]);
