const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const dashboardRoutes = require("./routes/dashboardRoutes");
const globalErrorController = require("./middleware/globalErrorController");

app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "dist")));
// App Routes
app.use("/api/v1/dashboard", dashboardRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Error Controller
app.use(globalErrorController);

module.exports = app;
