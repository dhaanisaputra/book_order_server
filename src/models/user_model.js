// eslint-disable-next-line no-unused-vars
const knex = require("knex");
const createModelHelper = require("../helpers/model.helper");
const name = "User";
const tableName = "users";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_TTL } = require("../../config");

// password will not be include
const selectableProps = [
  "id",
  "email",
  "first_name",
  "last_name",
  "role",
  "created_at",
];

// Bcrypt func used for hashing password
const SALT_ROUND = 10;
const hashPassword = (password) => bcrypt.hash(password, SALT_ROUND);

// verify password
const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

// This includes always hashing
// the password field prior to writing so it is never saved in plain text
const beforeSave = (user) => {
  if (!user.password) return Promise.resolve(user);

  return (
    hashPassword(user.password)
      .then((hash) => ({ ...user, password: hash }))
      // eslint-disable-next-line no-unused-vars
      .catch((err) => "Error in hashing password ${err}")
  );
};

module.exports = (knex) => {
  const userHelper = createModelHelper({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const create = (props) =>
    beforeSave(props).then((user) => userHelper.create(user));

  const verify = async (email, password) => {
    const user = await knex.select().from(tableName).where({ email });

    if (user.length > 0) {
      const isMatch = await verifyPassword(password, user[0].password);
      if (isMatch) {
        delete user[0].password;
        const token = jwt.sign(user[0], JWT_SECRET, {
          expiresIn: JWT_TTL,
        });
        return { ...user[0], token };
      } else {
        return null;
      }
    }
    throw new Error("Password does not match");
  };

  return {
    name,
    ...userHelper,
    create,
    verify,
  };
};
