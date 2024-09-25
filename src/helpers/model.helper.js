/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const knex = require("knex");

/**
 * The helper function of model that uses Knexjs to store and retrieve data from a
 * database using the provided 'knex' instance. Custom functionality can be
 * composed on top of this set of common functions.
 *
 * The idea is that these are the most-used types of functions that most/all
 * "models" will want to have. They can be overriden/modified/extended if
 * needed by composing a new object out of the one returned by this function
 */
module.exports = ({
  knex = {},
  name = "name",
  tableName = "tableName",
  selectableProps = [],
  timeout = 1000,
}) => {
  //create an entity
  const create = (props) => {
    delete props.id; // Not allowed to set id

    return knex
      .insert(props)
      .returning(selectableProps)
      .into(tableName)
      .timeout(timeout);
  };

  // Find list of entity
  const find = (filters) =>
    knex
      .select(selectableProps)
      .from(tableName)
      .where(filters)
      .timeout(timeout);

  // Find a particular entity
  const findOne = (filters) =>
    find(filters).then((results) => {
      if (!Array.isArray(results)) return results;

      return results[0];
    });

  return {
    create,
    find,
    findOne,
  };
};
