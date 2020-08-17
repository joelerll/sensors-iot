module.exports = {
  PORT: process.env.PORT || "8000",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_TESTING: process.env.NODE_ENV === "testing",
  ENV: process.env.NODE_ENV || "development",
  DATABASE: {
    development: {
      host: process.env.host || "localhost",
      database: process.env.database || "iot",
    },
    production: {
      url: process.env.MONGO_URL,
    },
  },
  REDIS: {
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
    REDIS_PASSWORD: process.env.REDIS_PASSWORD
  },
  CRON_HOUR: "2 * * * *"
};
