import { tokenService } from "../utils/token.js";

export default async function authCheck(req, res, next) {
  const token = req.headers.authorization;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token missing" });
  }

  // Extract the token from the "Bearer"
  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ error: "Unauthorized - Invalid token format" });
  }

  const accessToken = tokenParts[1];

  try {
    const tokenPayload = tokenService.verifyAccessToken(accessToken);

    req.user = tokenPayload.user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: "Forbidden - Invalid token" });
  }
}
