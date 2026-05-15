import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { UserModel } from "../models/UserModel.js";

// create router
export const commonApp = express.Router();

// ================= CLOUDINARY STORAGE =================

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "blogApp",
    allowed_formats: ["jpg", "png", "jpeg"],
  }),
});

const upload = multer({ storage });

// ================= REGISTER =================

commonApp.post(
  "/users",
  upload.single("profileImageUrl"),
  async (req, res) => {
    try {

      // parse user object
      const userObj = JSON.parse(req.body.user);

      // add image url if uploaded
      if (req.file) {
        userObj.profileImageUrl = req.file.path;
      }

      // check existing email
      const dbUser = await UserModel.findOne({
        email: userObj.email,
      });

      if (dbUser) {
        return res.status(409).send({
          message: "error occurred",
          error: `email "${userObj.email}" already exists`,
        });
      }

      // hash password
      const hashedPassword = await bcryptjs.hash(
        userObj.password,
        7
      );

      userObj.password = hashedPassword;

      // insert user
      await UserModel.create(userObj);

      res.status(201).send({
        message: "User created",
      });
    } catch (err) {
      console.log(err);

      res.status(500).send({
        message: "Error creating user",
        error: err.message,
      });
    }
  }
);

// ================= LOGIN =================

commonApp.post("/login", async (req, res) => {
  try {

    const userCred = req.body;

    // check user
    const dbUser = await UserModel.findOne({
      email: userCred.email,
    });

    if (!dbUser) {
      return res.status(400).send({
        message: "Invalid email",
      });
    }

    // compare password
    const status = await bcryptjs.compare(
      userCred.password,
      dbUser.password
    );

    if (!status) {
      return res.status(400).send({
        message: "Invalid password",
      });
    }

    // create token
    const signedToken = jwt.sign(
      {
        email: dbUser.email,
        role: dbUser.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    // production check
    const isProduction =
      process.env.NODE_ENV === "production";

    // send cookie
    res.cookie("token", signedToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    // remove password before sending
    delete dbUser.password;

    res.status(200).send({
      message: "login success",
      user: dbUser,
      token: signedToken,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: "Login failed",
      error: err.message,
    });
  }
});

// ================= CHECK AUTH =================

commonApp.get("/check-auth", async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).send({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    const dbUser = await UserModel.findOne({ email: decoded.email });

    if (!dbUser) {
      return res.status(404).send({ message: "User not found" });
    }

    delete dbUser.password;

    res.status(200).send({
      message: "Authenticated",
      user: dbUser,
    });
  } catch (err) {
    res.status(401).send({
      message: "Authentication failed",
      error: err.message,
    });
  }
});

// ================= LOGOUT =================

commonApp.get("/logout", (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  res.send({
    message: "Logout success",
  });
});