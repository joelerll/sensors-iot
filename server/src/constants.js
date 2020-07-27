module.exports = {
  PORT: process.env.PORT || "8000",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_TESTING: process.env.NODE_ENV === "testing",
  ENV: process.env.NODE_ENV || "development",
  DATABASE: {
    development: {
      host: "localhost",
      database: "iot",
    },
    production: {
      url: process.env.MONGO_URL,
    },
  },
};
