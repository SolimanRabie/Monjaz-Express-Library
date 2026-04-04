const express = require("express");
// ********* connect on mongoose ************* //
const mongoose = require("mongoose");
const url =
  "mongodb://Soliman-Rabie:soliman0000@ac-pztdfip-shard-00-00.gpcvv5z.mongodb.net:27017,ac-pztdfip-shard-00-01.gpcvv5z.mongodb.net:27017,ac-pztdfip-shard-00-02.gpcvv5z.mongodb.net:27017/codezone?ssl=true&replicaSet=atlas-w7mf7y-shard-0&authSource=admin&appName=Cluster0";
main().catch((err) => console.log("henkish", err));

async function main() {
  await mongoose.connect(url);
  console.log("server started correctly");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
// ********* connect on mongoose ************* //
const app = express();
const coursesRoutes = require("./routes/courses-routes");
app.use("/api/courses", coursesRoutes);

app.listen(5001, "localhost", () => {
  console.log("listening on port 5001 ");
});
