import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express();
const Connect = () => {
    mongoose
      .connect(
        "mongodb://localhost:27017/"
      )
      .then(() => {
        console.log("connected to database");
      }).catch((error)=>{
        console.log(error);
      })
};
// to accpt json files form outside
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);
app.use("/api/users", userRoute);
Connect();
app.listen(8800, () => {
  console.log("connected");
});
