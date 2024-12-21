import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN,
};

if (!process.env.PORT) {
  console.warn(
    "⚠️  Warning: PORT is not defined in the .env file. Defaulting to 3000.",
  );
}

export default env;
