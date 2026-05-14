import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { UserModel } from "../models/UserModel.js";

// create router
export const commonApp = express.Router();

// ================= MULTER (memory storage) =================
// Store file in memory, then upload to Cloudinary manually.
// This avoids the missing "multer-storage-cloudinary" package.

const upload = multer({ storage: multer.memoryStorage() });

// Helper: upload buffer to Cloudinary
const uploadToCloudinary = (buffer, mimetype) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "blogApp", allowed_formats: ["jpg", "png", "jpeg"] },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

// ================= REGISTER =================

commonApp.post(
  "/users",
  upload.single("profileImageUrl"),
  async (req, res, next) => {
    try {
      // parse user object sent as JSON string in FormData
      const userObj = JSON.parse(req.body.user);

      // upload profile image to Cloudinary if provided
      if (req.file) {
        const result = await uploadToCloudinary(
          req.file.buffer,
          req.file.mimetype
        );
        userObj.profileImageUrl = result.secure_url;
      }

      // check if email already exists
      const dbUser = await UserModel.findOne({ email: userObj.email });

      if (dbUser) {
        return res.status(409).send({
          message: "error occurred",
          error: `email "${userObj.email}" already exists`,
        });
      }

      // hash password
      const hashedPassword = await bcryptjs.hash(userObj.password, 7);
      userObj.password = hashedPassword;

      // create and save user using Mongoose model
      const newUser = new UserModel(userObj);
      await newUser.save();

      res.status(201).send({
        message: "User created",
      });
    } catch (err) {
      next(err);
    }
  }
);

// ================= LOGIN =================

commonApp.post("/login", async (req, res, next) => {
  try {
    const userCred = req.body;

    // check user exists
    const dbUser = await UserModel.findOne({ email: userCred.email }).lean();

    if (!dbUser) {
      return res.status(400).send({
        message: "Invalid email",
      });
    }

    // compare password
    const status = await bcryptjs.compare(userCred.password, dbUser.password);

    if (!status) {
      return res.status(400).send({
        message: "Invalid password",
      });
    }

    // create token — include id and role so verifyToken can read them
    const signedToken = jwt.sign(
      {
        id: dbUser._id,
        email: dbUser.email,
        role: dbUser.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    // production check
    const isProduction = process.env.NODE_ENV === "production";

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
    next(err);
  }
});

// ================= CHECK AUTH (restore session on page reload) =================

commonApp.get("/check-auth", async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).send({ message: "Not authenticated" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // fetch fresh user from DB
    const user = await UserModel.findById(decoded.id).lean();

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    // remove password before sending
    delete user.password;

    res.status(200).send({
      message: "authenticated",
      user,
    });
  } catch (err) {
    res.status(401).send({ message: "Invalid or expired token" });
  }
});

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