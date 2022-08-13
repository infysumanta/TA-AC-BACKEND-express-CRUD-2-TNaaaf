var express = require("express");
var router = express.Router();

var Book = require("../models/books");
var Author = require("../models/authors");
var Category = require("../models/categories");

router.get("/", function (req, res, next) {
  res.render("authors/list");
});

// Show Create Author Form
router.get("/new", function (req, res, next) {
  res.render("authors/createForm");
});
// Save Author
router.post("/", function (req, res, next) {});

// Show Update Author Form
router.get("/:id/edit", function (req, res, next) {
  res.render("authors/editForm");
});

// Update Author
router.post("/:id", function (req, res, next) {});

// Show Delete Author Form
router.get("/:id/delete", function (req, res, next) {});

module.exports = router;
