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

router.get("/new", (req, res) => {
  res.render("celebrities/celebrity-new");
});

router.post("/new", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log("Error while adding a book:", err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Celebrity.findById({ _id: id })
    .then(celebrities => {
      // console.log(celebrities);
      res.render("celebrities/celebrity-info", { celebrities });
      // res.send(celebrity);
    })
    .catch(err => {
      console.log("Error while retrieving data: ", err);
    });
});

router.get("/edit/:id", (req, res) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render("celebrities/celebrity-edit", { celebrity });
    })
    .catch(err => {
      console.log("Error getting the book:", err);
    });
});

router.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, {
    name,
    occupation,
    catchPhrase
  })
    .then(() => {
      res.redirect(`/`);
    })
    .catch(err => {
      console.log("Error while updating Celebrity: ", err);
    });
});

router.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  Celebrity.findByIdAndDelete({ _id: id })
    .then(celebrities => {
      res.redirect("/");
    })
    .catch(err => {
      console.log("Error while deleting celebrity:", err);
    });
});

module.exports = router;
