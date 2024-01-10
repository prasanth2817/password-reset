import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hashPassword = async (password) => {
  let salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

const hashCompare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const createToken = async (payload) => {
 
  try {
    const token = await jwt.sign(payload, process.env.JWT_SECRECT, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return token;
  } catch (error) {
    console.error('Error creating token:', error);
  }
};

const decodeToken = async (token) => {
  const payload = await jwt.decode(token);
  return payload;
};

const validate = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (token) {
    let payload = await decodeToken(token);
    let currentTime = +new Date() / 1000;
    if (payload.exp > currentTime) {
      next();
    } else res.status(400).send({ message: "Token Expired" });
  } else {
    res.status(400).send({ message: "No token Found" });
  }
};
export default {
  hashPassword,
  hashCompare,
  createToken,
  decodeToken,
  validate,
};
