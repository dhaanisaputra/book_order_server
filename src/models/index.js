const fs = require("fs");
const path = require("path");
const debug = require("debug")("order:modelIndex");
const knex = require("../../database/connection");

const getModelFiles = (dir) =>
  fs
    .readdirSync(dir)
    .filter((file) => file.indexOf(".") !== -1 && file !== "index.js")
    .map((file) => path.join(dir, file));

// eslint-disable-next-line no-undef
const files = getModelFiles(__dirname);
debug(files);

const models = files.reduce((modelObj, filename) => {
  const initModel = require(filename);
  const model = initModel(knex);

  if (model) {
    modelObj[model.name] = model;
  }

  return modelObj;
}, {});

module.exports = models;
