const { default: mongoose } = require("mongoose");
const catchAsyncError = require("../middleware/catchAsyncError");
const getLatLongByCountry = require("../utils/latitudeLongitude");

// All Data
exports.getAllData = catchAsyncError(async (req, res, next) => {
  const collection = mongoose.connection.collection("data");

  const dashboardData = await collection.find({}).toArray();

  res.status(200).json({
    status: "sucess",
    result: dashboardData.length,
    dashboardData,
  });
});

// BAR GRAPH
exports.getBarChart = catchAsyncError(async (req, res, next) => {
  const { xAxis, yAxis } = req.query;
  const collection = mongoose.connection.collection("data");

  const aggregationPipeline = [
    {
      $group: {
        _id: `$${xAxis}`,
        yAxis: { $avg: `$${yAxis}` },
      },
    },
  ];

  const chartData = await collection.aggregate(aggregationPipeline).toArray();

  res.status(200).json({
    status: "success",
    result: chartData.length,
    chartData,
  });
});

// ----------- LINE GRAPH ---------------
exports.getLineChart = catchAsyncError(async (req, res, next) => {
  const collection = mongoose.connection.collection("data");

  const aggregationPipeline = [
    {
      $group: {
        _id: "$end_year",
        intensity: { $sum: "$intensity" },
        likelihood: { $sum: "$likelihood" },
      },
    },
    { $sort: { _id: 1 } },
  ];

  const chartData = await collection
    .aggregate(aggregationPipeline)
    .limit(15)
    .toArray();

  res.status(200).json({
    status: "success",
    result: chartData.length,
    chartData,
  });
});

// ------------AREA GRAPH ------------
exports.getAreaChart = catchAsyncError(async (req, res, next) => {
  const collection = mongoose.connection.collection("data");
  const aggregationPipeline = [
    {
      $group: {
        _id: "$start_year",
        intensity: { $sum: `$intensity` },
        likelihood: { $sum: `$likelihood` },
        relevance: { $sum: `$relevance` },
      },
    },
    { $sort: { _id: 1 } },
  ];
  const chartData = await collection
    .aggregate(aggregationPipeline)
    .limit(15)
    .toArray();

  res.status(200).json({
    status: "success",
    result: chartData.length,
    chartData,
  });
});

// -------------Scatter graph
exports.getScatterChart = catchAsyncError(async (req, res, next) => {
  const collection = mongoose.connection.collection("data");

  const aggregationPipeline = [
    {
      $project: {
        intensity: 1,
        likelihood: 1,
      },
    },
  ];

  const scatterData = await collection.aggregate(aggregationPipeline).toArray();

  res.status(200).json({
    status: "success",
    chartData: scatterData,
  });
});

// -----------PIE CHART ----------------
exports.getPieChart = catchAsyncError(async (req, res, next) => {
  const collection = mongoose.connection.collection("data");

  const aggregationPipeline = [
    {
      $group: {
        _id: `$country`,
        count: { $sum: 1 },
      },
    },
  ];

  const chartData = await collection
    .aggregate(aggregationPipeline)
    .limit(12)
    .toArray();

  // Calculate total count
  const totalCount = chartData.reduce((total, item) => total + item.count, 0);

  // Calculate percentages
  const pieChartData = chartData.map((item) => ({
    country: item._id,
    count: item.count,
    percentage: ((item.count / totalCount) * 100).toFixed(2),
  }));

  res.status(200).json({
    status: "success",
    result: pieChartData.length,
    pieChartData,
  });
});

exports.getBarChartByYear = catchAsyncError(async (req, res, next) => {
  const collection = mongoose.connection.collection("data");

  const aggregationPipeline = [
    {
      $group: {
        _id: "$start_year",
        avgIntensity: { $avg: "$intensity" },
        avgLikelihood: { $avg: "$likelihood" },
        avgRelevance: { $avg: "$relevance" },
      },
    },
    { $sort: { _id: 1 } },
  ];

  const chartData = await collection.aggregate(aggregationPipeline).toArray();

  res.status(200).json({
    status: "success",
    result: chartData.length,
    chartData,
  });
});

exports.total = catchAsyncError(async (req, res, next) => {
  const collection = mongoose.connection.collection("data");

  // Aggregate to calculate total counts for each unique topic, region, and sector
  const aggregationPipeline = [
    {
      $group: {
        _id: null,
        totalTopics: { $addToSet: "$topic" },
        totalRegions: { $addToSet: "$region" },
        totalSectors: { $addToSet: "$sector" },
        totalCountry: { $addToSet: "$country" },
      },
    },
    {
      $project: {
        totalTopics: { $size: "$totalTopics" },
        totalRegions: { $size: "$totalRegions" },
        totalSectors: { $size: "$totalSectors" },
        totalCountry: { $size: "$totalCountry" },
      },
    },
  ];

  const totalData = await collection.aggregate(aggregationPipeline).toArray();

  // Fetch total count of all documents
  const totalDocuments = await collection.countDocuments();

  res.status(200).json({
    status: "success",
    totalDocuments,
    totalData: totalData.length > 0 ? totalData[0] : null,
  });
});

exports.getPolarChart = catchAsyncError(async (req, res, next) => {
  const collection = mongoose.connection.collection("data");

  const aggregationPipeline = [
    {
      $match: { topic: { $ne: "" } }, // Filter out documents with empty topic
    },
    {
      $group: {
        _id: "$topic",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 }, // Sort topics by count in descending order
    },
    {
      $limit: 12, // Limit the number of topics to 30
    },
  ];

  const topicCounts = await collection.aggregate(aggregationPipeline).toArray();

  // Rename _id field to topic
  const formattedTopicCounts = topicCounts.map((topic) => ({
    topic: topic._id,
    count: topic.count,
  }));

  res.status(200).json({
    status: "success",
    result: formattedTopicCounts.length,
    topicCounts: formattedTopicCounts,
  });
});

// Scatter plot
exports.getScatterPlot = catchAsyncError(async (req, res, next) => {
  const collection = mongoose.connection.collection("data");

  // Fetch data from MongoDB
  const scatterData = await collection
    .find({}, { intensity: 1, likelihood: 1 })
    .limit(100)
    .toArray();

  const intensities = scatterData.map((data) => data.intensity);
  const likelihoods = scatterData.map((data) => data.likelihood);

  const scatterPlotData = {
    intensities,
    likelihoods,
  };

  res.status(200).json({
    status: "success",
    scatterPlotData,
  });
});
exports.geoHeatMap = catchAsyncError(async (req, res, next) => {
  const collection = mongoose.connection.collection("data");

  const aggregationPipeline = [
    {
      $match: { country: { $ne: "" } },
    },
    {
      $group: {
        _id: "$country",
        intensity: { $avg: "$intensity" },
      },
    },
  ];

  const geoHeatMapData = await collection
    .aggregate(aggregationPipeline)
    .toArray();

  for (const dataPoint of geoHeatMapData) {
    const countryName = dataPoint._id;
    const { latitude, longitude } = await getLatLongByCountry(countryName);
    if (latitude && longitude) {
      dataPoint.latitude = latitude;
      dataPoint.longitude = longitude;
    } else {
      dataPoint.latitude = null;
      dataPoint.longitude = null;
    }
  }

  res.status(200).json({
    status: "success",
    result: geoHeatMapData.length,
    geoHeatMapData,
  });
});
