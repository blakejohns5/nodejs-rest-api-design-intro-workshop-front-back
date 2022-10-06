const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");

const UserRouter = require("./routes/user-routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());

app.use("/users", UserRouter);

module.exports = app;
