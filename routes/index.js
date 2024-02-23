var express = require("express");
var router = express.Router();
const db = require("../model/helper");
// let data = require("../data/testdata.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Express" });
});

// GET all data
router.get("/projects", function (req, res, next) {
  db("SELECT * FROM projects")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

//GET project by ID

//POST new project
module.exports = router;
