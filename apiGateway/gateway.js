const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 3020;

const reviewRoutes = require("./routes/socialServiceRoutes/reviewRoute");
const cartRoutes = require("./routes/socialServiceRoutes/cartRoute");
const userRoutes = require("./routes/userRoutes/userRoute");
const followingRoutes = require("./routes/followingRoutes/followingRoute");
const orderRoutes = require("./routes/orderRoutes/orderRoute");
const paymentRoutes = require("./routes/checkoutRoutes/paymentRoute");
const shipmentRoutes = require("./routes/checkoutRoutes/shipmentRoute");
const businessRoutes = require("./routes/businessRoutes/businessRoute");

app.use("/reviews", reviewRoutes);
app.use("/cart", cartRoutes);
app.use("/user", userRoutes);
app.use("/following", followingRoutes);
app.use("/order", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/shipping", shipmentRoutes);
app.use("/business", businessRoutes);

app.use(express.json());
app.listen(port, () => {
  console.log(`Gateway listening on port ${port}`);
});
