import exp from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import { userApp } from "./APIs/UserAPI.js";
import { authorApp } from "./APIs/AuthorAPI.js";
import { adminApp } from "./APIs/AdminAPI.js";
import { commonApp } from "./APIs/CommonAPI.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

config();

// create express app
const app = exp();

// ================= CORS =================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://atp-24-eg-112-d34.vercel.app",
    ],
    credentials: true,
  })
);

// enable preflight requests
app.options("*", cors());

// ================= MIDDLEWARES =================

// cookie parser
app.use(cookieParser());

// body parser
app.use(exp.json());

// ================= ROUTES =================

app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/auth", commonApp);

// ================= ROOT ROUTE =================

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

// ================= DATABASE CONNECTION =================

const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);

    console.log("DB server connected");

    const port = process.env.PORT || 50001;

    app.listen(port, () => {
      console.log(`server listening on ${port}..`);
    });
  } catch (err) {
    console.log("err in db connect", err);
  }
};

connectDB();

// ================= INVALID PATH HANDLER =================

app.use((req, res, next) => {
  console.log(req.url);

  res.status(404).json({
    message: `path ${req.url} is invalid`,
  });
});

// ================= ERROR HANDLING =================

app.use((err, req, res, next) => {
  console.log("error is ", err);

  // Multer errors
  if (err instanceof multer.MulterError || err.name === "MulterError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // Validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // Cast errors
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // Duplicate key errors
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;

  const keyValue =
    err.keyValue ??
    err.cause?.keyValue ??
    err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];

    const value = keyValue[field];

    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});