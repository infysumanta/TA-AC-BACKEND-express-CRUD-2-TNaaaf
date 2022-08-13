var express = require("express");
var router = express.Router();

var Book = require("../models/books");
var Author = require("../models/authors");
var Category = require("../models/categories");

router.get("/", function (req, res, next) {
  res.render("categories/list");
});

// Show Create Category Form
router.get("/new", function (req, res, next) {
  res.render("categories/createForm");
});
// Save Category
router.post("/", function (req, res, next) {});

// Show Update Category Form
router.get("/:id/edit", function (req, res, next) {
  res.render("categories/editForm");
});

// Update Category
router.post("/:id", function (req, res, next) {});

// Show Delete Category Form
router.get("/:id/delete", function (req, res, next) {});

module.exports = router;
