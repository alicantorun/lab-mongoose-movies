const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

router.get("/", (req, res) => {
  Celebrity.find()
    .then(celebrities => {
      res.render("celebrities/index", { celebrities });
    })
    .catch(err => {
      console.log("Error while retrieving data for the celebrities: ", err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Celebrity.findById({ _id: id })
    .then(celebrities => {
      console.log(celebrities);
      res.render("celebrities/celebrity-info", { celebrities });
      // res.send(celebrity);
    })
    .catch(err => {
      console.log("Error while retrieving data: ", err);
    });
});

module.exports = router;
