var express = require("express");
var router = express.Router();
let data = require("../data/testdata.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Express" });
});

// GET all data
router.get("/testdata", (req, res) => {
  // Return all data
  res.send(data);
});

module.exports = router;
