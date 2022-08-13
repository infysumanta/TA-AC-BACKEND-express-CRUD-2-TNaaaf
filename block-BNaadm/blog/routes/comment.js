var express = require("express");
var router = express.Router();

var Article = require("../models/articles");
var Comment = require("../models/comments");

router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Comment.findById(id, (err, comment) => {
    if (err) return next(err);
    res.render("updateComment", { comment });
  });
});

router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err, comment) => {
    if (err) return next(err);
    res.redirect("/articles/" + comment.articleId);
  });
});

router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndRemove(id, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      comment.articleId,
      { $pull: { comments: comment._id } },
      (err, article) => {
        if (err) return next(err);
        res.redirect("/articles/" + comment.articleId);
      }
    );
  });
});

router.get("/:id/decrement", (req, res) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, comments) => {
    if (err) return next(err);
    res.redirect("/articles/" + comments.articleId);
  });
});
router.get("/:id/increment", (req, res) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, comments) => {
    if (err) return next(err);
    res.redirect("/articles/" + comments.articleId);
  });
});

module.exports = router;
