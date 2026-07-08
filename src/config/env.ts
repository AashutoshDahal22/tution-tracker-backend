const env = {
  PORT: process.env.PORT || "5000",
  DATABASE_URL: process.env.DATABASE_URL!,
  DIRECT_URL: process.env.DIRECT_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
};

export default env;
