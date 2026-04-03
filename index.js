const express = require("express");

const app = express();
const coursesRoutes = require("./routes/courses-routes");
app.use("/api/courses", coursesRoutes);

app.listen(5001, "localhost", () => {
  console.log("listening on port 5001 ");
});
