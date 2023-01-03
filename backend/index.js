import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import colors from "colors";
import UserRoute from "./routes/userRoute.js";
import ProductRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import stripeRoute from "./routes/payment.js";
import WishlistRoute from "./routes/Wishlist.js";
import orderRoute from "./routes/orderRoute.js";
import paymentRoute from "./routes/payment.js";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/user", UserRoute);
app.use("/api/products", ProductRoute);
app.use("/api/cart", cartRoute);
app.use("/api/stripe", stripeRoute);
app.use("/api/orders", orderRoute);
app.use("/api/wishlist", WishlistRoute);
app.use("/api/checkout", paymentRoute);

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MANGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MangoDb connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDb();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
