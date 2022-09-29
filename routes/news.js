const router = require("express").Router();
const news = require("../models/News");
const MongoClient = require("mongodb").MongoClient;

router.get("/", (req, res) => {
  MongoClient.connect(
    "mongodb://lurker:gaisma@46.101.142.29:27020/users",
    async (err, client) => {
      if (err) throw err;
      const db = client.db("users");

      res.render("news", {
        user: req.user,
        news: await (await db.collection("news").find().toArray()).reverse(),
      });
    }
  );
});

router.get("/create", (req, res) => {
  if (req.user) {
    if (req.user.level >= 4) {
      res.render("createPost", {
        user: req.user,
      });
    } else {
      res.render("error", {
        user: req.user,
      });
    }
  } else {
    res.render("error", {
      user: req.user,
    });
  }
});

router.post("/create", async (req, res) => {
  await new news({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    date: req.body.date,
    imgUrl: req.body.imgUrl,
  }).save();
  res.redirect("/news");
});

router.get("/:postId/edit", async (req, res) => {
  try {
    if (req.user) {
      if (req.user.level >= 4) {
        res.render("editPost", {
          user: req.user,
          post: await news.findOne({ _id: req.params.postId }),
        });
      } else {
        res.render("error", {
          user: req.user,
        });
      }
    } else {
      res.render("error", {
        user: req.user,
      });
    }
  } catch (err) {
    res.render("error", {
      user: req.user,
    });
  }
});

router.post("/:postId/edit", async (req, res) => {
  const post = await news.findOne({ _id: req.params.postId });
  if (req.body.delete) {
    post.remove((err) => {
      if (err) {
        console.log(err);
      }
    });
    res.redirect('/news/');
  } else {
    post.updateOne(
      {
        title: req.body.title,
        date: req.body.date,
        author: req.body.author,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    res.redirect(`/news/${req.params.postId}`);
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await news.findOne({ _id: req.params.postId });

    if (post) {
      res.render("post", {
        user: req.user,
        post: post,
      });
    } else {
      res.render("error", {
        user: req.user,
      });
    }
  } catch (err) {
    res.render("error", {
      user: req.user,
    });
  }
});

module.exports = router;
