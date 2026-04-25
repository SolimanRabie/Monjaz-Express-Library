const express = require("express");

const httpStatusText = require("./utils/httpStatusText");
const cors = require("cors");
// ********* connect on mongoose ************* //
require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
console.log(process.env.MONGO_URL);
main().catch((err) => console.log("henkish", err));

async function main() {
  await mongoose.connect(url);
  console.log("server started correctly");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
// ********* connect on mongoose ************* //

const app = express();
app.use(express.json());
app.use(cors());
const coursesRoutes = require("./routes/courses-routes");
const userRoutes = require("./routes/users-routes");
app.use("/api/courses", coursesRoutes);

// ****** handel error *********//
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText,
    message: error.message,
    code: error.statusText,
    data: null,
  });
});
// ****** handel error *********//

// ****** user handeler *******//
app.use("/api/users", userRoutes);
// ****** user handeler *******//

// ********** in case of wrong url *********//
// app.all("*", (req, res, next) => {
//   return res.status(404).json({
//     status: httpStatusText.ERROR,
//     data: null,
//     message: "this resource is not available",
//   });
// });
// ********** in case of wrong url *********//

app.listen(process.env.PORT, "localhost", () => {
  console.log("listening on port:  ", process.env.PORT);
});

// githup commit :--> make user model scima , with validator backage
