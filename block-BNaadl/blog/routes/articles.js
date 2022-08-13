var express = require("express");
var router = express.Router();

var Article = require("../models/articles");

/* GET users listing. */
router.get("/", function (req, res, next) {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    console.log(articles);
    res.render("articles", { articles: articles });
  });
});
router.post("/", function (req, res, next) {
  Article.create(req.body, (err, createdArticle) => {
    if (err) return next(err);
    res.redirect("/articles");
  });
});

router.get("/new", function (req, res, next) {
  res.render("articleForm");
});

router.get("/:id", function (req, res, next) {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render("article", { article: article });
  });
});

router.get("/:id/edit", (req, res) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render("editArticleForm", { article: article });
  });
});

router.post("/:id", (req, res) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (err, updatedArticle) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});

router.get("/:id/decrement", (req, res) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(
    id,
    { $inc: { likes: -1 } },
    (err, updatedArticle) => {
      if (err) return next(err);
      res.redirect("/articles/" + id);
    }
  );
});
router.get("/:id/increment", (req, res) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    (err, updatedArticle) => {
      if (err) return next(err);
      res.redirect("/articles/" + id);
    }
  );
});

router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if (err) return next(err);
    res.redirect("/articles");
  });
});

module.exports = router;
