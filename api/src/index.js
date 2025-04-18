const mongoose = require("mongoose");
require("dotenv/config");

require("./models/user");
require("./models/token");
const db = require("./utils/db");

require("./models/user");
const app = require("./app");

async function main() {
  await db.connect(process.env.MONGODB_URI);

  mongoose.Promise = global.Promise;

  app.set("port", process.env.PORT || 7777);

  const port = app.get("port");
  app.listen(port, () => {
    console.log(`Express running on port: ${port}`);
  });
}

main().catch((err) => {
  console.error(err);
});
