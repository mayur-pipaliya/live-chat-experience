import bcrypt from "bcrypt";
import User from "../../models/userModel.js";
import { tokenService } from "../../utils/token.js";

// Store refresh tokens (in-memory storage, replace with a more robust solution in production)
const refreshTokens = [];

const getToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ error: "Forbidden - Invalid refresh token" });
  }

  // Check if the refresh token is valid
  try {
    const user = await tokenService.verifyRefreshToken(refreshToken);

    // If valid, generate a new access token
    const accessToken = tokenService.createAccessToken(user);

    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ error: "Forbidden - Invalid refresh token" });
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;

    const accessToken = tokenService.createAccessToken(user);
    const refreshToken = tokenService.createRefreshToken(user);

    return res.json({ status: true, accessToken, refreshToken });
  } catch (ex) {
    next(ex);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

const logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

export { getToken, login, register, getAllUsers, setAvatar, logOut };