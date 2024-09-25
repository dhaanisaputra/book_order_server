/* eslint-disable no-undef */
const debug = require("debug")("order:server");
const app = require("./app");
const { PORT } = require("./config");

const StartServer = async () => {
  app
    .listen(PORT, () => {
      debug(`Server listening on port ${PORT}`);
    })
    .on(`error`, (err) => {
      debug(err);
      process.exit();
    });
};

StartServer();

// // routes
app.get("/", (req, res) => {
  res.send("Hello World ExpressJs!");
});

// app.post("/login", (req, res) => {
//   if (req.name === "mimin") {
//     res.send("login berhasil");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });
