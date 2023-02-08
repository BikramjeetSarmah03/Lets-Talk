const express = require("express");
const { auth } = require("../utils/middleware");
const {
  getSubreddits,
  getSubredditPosts,
  getTopSubreddits,
  createNewSubreddit,
  editSubDescription,
  subscribeToSubreddit,
} = require("../controllers/communityController");

const router = express.Router();

router.get("/", getSubreddits);
router.post("/", auth, createNewSubreddit);
router.get("/c/:subredditName", getSubredditPosts);
router.get("/top10", getTopSubreddits);
router.patch("/:id", auth, editSubDescription);
router.post("/:id/subscribe", auth, subscribeToSubreddit);

module.exports = router;
