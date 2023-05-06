export default {
  postgresConfig: {
    host: "POSTGRES_HOST",
    port: "POSTGRES_PORT",
    user: "POSTGRES_USER",
    password: "POSTGRES_PASSWORD",
    database: "POSTGRES_DB",
  },

  cookieSecret: "COOKIE_SECRET",
  jwtSecret: "JWT_SECRET",

  smtp: {
    host: "EMAIL_HOST",
    port: "EMAIL_PORT",
    user: "EMAIL_USER",
    password: "EMAIL_PASS",
  },
};
