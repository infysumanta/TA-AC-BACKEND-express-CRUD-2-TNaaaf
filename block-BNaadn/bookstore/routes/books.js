var express = require("express");
var router = express.Router();

var Book = require("../models/books");
var Author = require("../models/authors");
var Category = require("../models/categories");

router.get("/", function (req, res, next) {
  Book.find({}, (err, books) => {
    if (err) return next(err);
    res.render("books/list", { books });
  });
});

// Show Create Book Form
router.get("/new", function (req, res, next) {
  res.render("books/createForm");
});
// Save Book

router.post("/", (req, res, next) => {
  Book.create(req.body, (err, books) => {
    if (err) return next(err);
    res.redirect("/books");
  });
});

router.get("/:id", function (req, res, next) {
  Book.findById(req.params.id, (err, books) => {
    res.render("books/singleBook");
  });
});

// Show Update Book Form
router.get("/:id/edit", function (req, res, next) {
  Book.res.render("books/editForm");
});

// Update Book
router.post("/:id", function (req, res, next) {});

// Show Delete Book Form
router.get("/:id/delete", function (req, res, next) {});

module.exports = router;
