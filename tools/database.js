const mongoose = require("mongoose");

mongoose.connect("your_mongo_url", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("[✅ DataBase] Connected!");
});
module.exports = mongoose;
