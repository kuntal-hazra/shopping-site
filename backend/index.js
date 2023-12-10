const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const cors = require("cors")
const app = express();

app.use(cors({ origin: "*"}));

const mongoDBUrl = "mongodb+srv://kuntal:khazra@cluster0.amthuig.mongodb.net/shopping_site?retryWrites=true&w=majority";

mongoose.connect(mongoDBUrl, {});
const db = mongoose.connection;

db.on("error" , console.error.bind(console, "Mongodb connection error: "));
db.once("open", () => {
    console.log("Connected to MongoDB!");
});

app.use(express.json());
app.use(productRouter);
app.use(userRouter);


app.listen(4000, "0.0.0.0", () => {
    console.log("Server started at port 4000");
});
