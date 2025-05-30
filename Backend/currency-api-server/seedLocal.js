const mongoose = require("mongoose");
const fs = require("fs");
const Rate = require("./models/Rate");

mongoose.connect("mongodb://127.0.0.1:27017/currencydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("✅ Connected to MongoDB");

  const data = fs.readFileSync("bulkRates.json", "utf8");
  const rates = JSON.parse(data);

  await Rate.deleteMany(); // clear old rates
  await Rate.insertMany(rates);

  console.log("✅ Local exchange rates inserted successfully.");
  mongoose.disconnect();
})
.catch((err) => {
  console.error("❌ MongoDB error:", err);
});
