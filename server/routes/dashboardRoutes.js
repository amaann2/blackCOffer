const express = require("express");
const {
  getAllData,
  getBarChart,
  getLineChart,
  getAreaChart,
  getPieChart,
  getPolarChart,
  total,
  getScatterPlot,
  getBarChartByYear,
  geoHeatMap,
} = require("../controller/dashboardController");

const router = express.Router();

router.get("/", getAllData);

router.get("/barchart", getBarChart);
router.get("/linechart", getLineChart);
router.get("/areachart", getAreaChart);
router.get("/piechart", getPieChart);
router.get("/scatterchart", getScatterPlot);
router.get("/total", total);
router.get("/polarchart", getPolarChart);
router.get("/barchartyear", getBarChartByYear);
router.get("/geoheatmap", geoHeatMap);

module.exports = router;
