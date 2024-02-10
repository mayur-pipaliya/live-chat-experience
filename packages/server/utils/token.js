import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getEnvVariable } from "./env.js";
dotenv.config();

class TokenService {
  constructor() {
    this.accessTokenSecret = getEnvVariable("JWT_SECRET");
    this.refreshTokenSecret = getEnvVariable("JWT_REFRESH_SECRET");
  }

  // Function to create an access token
  createAccessToken(user) {
    return jwt.sign({ user }, this.accessTokenSecret, { expiresIn: "15m" });
  }

  // Function to create a refresh token
  createRefreshToken(user) {
    return jwt.sign({ user }, this.refreshTokenSecret);
  }

  // Function to verify an access token
  verifyAccessToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.accessTokenSecret, (err, user) => {
        if (err) reject(err);
        resolve(user);
      });
    });
  }

  // Function to verify a refresh token
  verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.refreshTokenSecret, (err, user) => {
        if (err) reject(err);
        resolve(user);
      });
    });
  }
}

const tokenService = new TokenService();

export { tokenService };
