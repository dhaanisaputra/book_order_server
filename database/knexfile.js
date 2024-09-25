// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  dev: {
    client: "pg",
    connection: "postgres://postgres:admin@localhost/book_order",
    migrations: {
      // eslint-disable-next-line no-undef
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      // eslint-disable-next-line no-undef
      directory: `${__dirname}/seeds`,
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      // eslint-disable-next-line no-undef
      database: process.env.DB,
      // eslint-disable-next-line no-undef
      user: process.env.DB_USER,
      // eslint-disable-next-line no-undef
      password: process.env.DB_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
