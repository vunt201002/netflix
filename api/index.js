const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const moviesRoute = require("./routes/movies");
const listsRoute = require("./routes/lists");

const app = express();
dotenv.config();

mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err))

app.use(express.json());
app.use(cors());

app.use("/v1/auth", authRoute);
app.use("/v1/users", usersRoute);
app.use("/v1/movies", moviesRoute);
app.use("/v1/lists", listsRoute);

app.listen(8800, () => {
    console.log("Server is running");
})