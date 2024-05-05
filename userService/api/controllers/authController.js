const authRepository = require("../repositories/authRepository");
const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");

async function signUpUser(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      return res.json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authRepository.signupUser(req.body, hashedPassword);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function userOTPSending(req, res) {
  try {
    const email = req.body.email;
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    return res.json({
      message: await authRepository.sendOTPVerificationEmail(email),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function userOTPVerification(req, res) {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    const response = await authRepository.verifyOTPVerificationEmail(
      email,
      otp
    );
    console.log(response);
    if (response == "OTP Verified Successfully") {
      const user = await userRepository.getUserByEmail(email);
      
      return res.status(200).json(user);;
    } else {
      return res.json({ message: response });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await authRepository.loginUser(email, password);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function logoutUser(req, res) {
  try {
    const user = await authRepository.logoutUser(req.body.userID);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  signUpUser,
  loginUser,
  logoutUser,
  userOTPSending,
  userOTPVerification,
};
