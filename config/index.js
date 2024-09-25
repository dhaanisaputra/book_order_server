// const dotEnv = require("dotenv").config({ path: `${process.cwd()}/.env` });
const dotEnv = require("dotenv");

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "prod") {
  // eslint-disable-next-line no-undef
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile.trim() });
} else {
  dotEnv.config({ path: "./.env" });
}

module.exports = {
  // eslint-disable-next-line no-undef
  PORT: process.env.PORT,
  // eslint-disable-next-line no-undef
  JWT_SECRET: process.env.JWT_SECRET,
  // eslint-disable-next-line no-undef
  JWT_TTL: process.env.JWT_TTL,
};
