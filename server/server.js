const app = require("./app");
require("dotenv").config({ path: "./.env" });

const databaseConnection = require("./config/database");
const PORT = process.env.PORT || 4000;

databaseConnection();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
