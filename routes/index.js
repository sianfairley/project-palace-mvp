var express = require("express");
var router = express.Router();
const db = require("../model/helper");
// let data = require("../data/testdata.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Express" });
});

//Reused in different routes to show all projects
function selectAllItems(req, res) {
  db("SELECT * FROM projects ORDER BY id ASC;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
}

router.get("/projects", (req, res) => {
  // Send back the full list of items
  selectAllItems(req, res);
});

//GET project by ID
router.get("/projects/:id", async (req, res) => {
  try {
    let result = await db(`SELECT * FROM projects WHERE id = ${req.params.id}`);
    res.send(result.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

//POST new project
router.post("/projects", async (req, res) => {
  //get the info of the new item from req.body
  let newProject = req.body;
  try {
    await db(
      `INSERT INTO projects (projectname, type, materials, description, image, complete, favorite) VALUES ("${newProject.projectname}", "${newProject.type}", "${newProject.materials}", "${newProject.description}", "${newProject.image}", ${newProject.complete}, ${newProject.favorite})`
    );
    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE project
router.delete("/projects/:id", async (req, res) => {
  // the id of the item to be deleted is available in req.params
  try {
    await db(`DELETE FROM projects WHERE id = ${req.params.id};`);
    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE FAVORITE - get project by id, toggle fav
router.put(`/projects/favorites/:id`, async (req, res) => {
  console.log(req);
  try {
    await db(
      `UPDATE projects SET favorite = !favorite WHERE id=${req.params.id};`
    );
    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE COMPLETE - get project by id, toggle fav
router.put(`/projects/completed/:id`, async (req, res) => {
  console.log(req);
  try {
    await db(
      `UPDATE projects SET complete = !complete WHERE id=${req.params.id};`
    );
    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE all project

module.exports = router;
