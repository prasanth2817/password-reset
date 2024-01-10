import usersModel from "../Model/User.js";
import Auth from "../Common/Auth.js";
import emailService from "../Common/EmailService.js";

const getUsers = async (req, res) => {
  try {
    let users = await usersModel.find({}, { password: 0 });
    res.status(200).send({ message: "Users Data fetched sucessfully", users });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server error", error: error.message });
  }
};

const createUsers = async (req, res) => {
  try {
    let user = await usersModel.findOne({ email: req.body.email });
    if (!user) {
      req.body.password = await Auth.hashPassword(req.body.password);
      await usersModel.create(req.body);
      res.status(201).send({ message: "Account Created sucessfully" });
    } else
      res
        .status(400)
        .send({ message: `user ${req.body.email} Already Exists` });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    let user = await usersModel.findOne({ _id: req.params.id });
    if (user) {
      await usersModel.deleteOne({ _id: req.params.id });
      res.status(200).send({ message: "User Deleted Successfully" });
    } else {
      res.status(400).send({ message: "Invalid User" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server error", error: error.message });
  }
};

const Login = async (req, res) => {
  try {
    let user = await usersModel.findOne({ email: req.body.email });
    if (user) {
      let hashCompare = await Auth.hashCompare(
        req.body.password,
        user.password
      );
      if (hashCompare) {
        let token = await Auth.createToken({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        });
        res.status(200).send({ message: "Login successfull", token });
      } else {
        res.status(400).send({ message: "Invalid Password" });
      }
    } else
      res.status(400).send({ message: `user ${req.body.email} Not Exists` });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server error", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const user = await usersModel.findOne(
      { email: req.body.email },
      { password: 0 }
    );
    console.log(user);
    if (user) {
      const token = await Auth.createToken({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id,
      });

      console.log(token);
      const resetUrl = `http://localhost:5173/reset-password/${token}`;
      const emailContent = {
        to: user.email,
        subject: "Reset Password Request",
        text: `Dear ${user.firstName},\n\nWe received a request to reset your password. Click the link below to reset your password:\n\n${resetUrl}`,
        html: `<p>Dear ${user.firstName},</p><p>We received a request to reset your password. Click the link below to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
      };
      await emailService.sendMail(emailContent);

      res
        .status(200)
        .send({
          message: "The password reset link has been sent to your email.",
        });
    } else {
      res
        .status(400)
        .send({
          message: "User not found. Please enter a registered email address.",
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal Server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    let data = await Auth.decodeToken(token);
    console.log(data);
    if (req.body.newpassword === req.body.confirmpassword) {
      let user = await usersModel.findOne({ email: data.email });
      user.password = await Auth.hashPassword(req.body.newpassword);
      await user.save();

      res.status(200).send({
        message: "Password Updated Successfully",
      });
    } else {
      res.status(400).send({
        message: "Password Does Not match",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export default {
  getUsers,
  createUsers,
  deleteUser,
  Login,
  forgotPassword,
  resetPassword,
};
