var express = require("express");
var router = express.Router();

var Article = require("../models/articles");
var Comment = require("../models/comments");

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
  Article.findById(id)
    .populate("comments")
    .exec((err, article) => {
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

router.post("/:id/comment", (req, res) => {
  var id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      id,
      { $push: { comments: comment } },
      (err, article) => {
        if (err) return next(err);
        res.redirect("/articles/" + id);
      }
    );
  });
});

router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if (err) return next(err);
    Comment.deleteMany({ articleId: article.id }, (err, info) => {
      if (err) return next(err);
      res.redirect("/articles");
    });
  });
});

module.exports = router;
