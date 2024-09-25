const express = require("express");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use("/", require("./src/routes/auth.routes"));
app.use(require("./src/middleware/error.middleware").all);

module.exports = app;
