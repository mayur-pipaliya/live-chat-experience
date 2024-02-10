import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Function to get the value of an environment variable
const getEnvVariable = (key, defaultValue = null) => {
  const value = process.env[key];
  return value !== undefined ? value : defaultValue;
};

export { getEnvVariable };
