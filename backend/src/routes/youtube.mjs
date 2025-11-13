// routes/youtube.mjs
import { Router } from "express";
import Parser from "rss-parser";
const parser = new Parser();
console.log("[youtubeRouter] file loaded");

const router = Router();

router.get("/youtube/channel/:id", async function (req, res, next) {
  try {
    console.log("Youtube Route - fetching feed");
    const feed = await parser.parseURL(
      `http://localhost:1200/youtube/channel/${req.params.id}`
    );
    // console.log(feed.title);
    // console.log("first ", feed.items[0]);
    const feedObject = {
      feedTitle: feed.title,
      feedItems: [],
    };
    feed.items.forEach((item) => {
      feedObject.feedItems.push({
        creator: item.creator || feed.title,
        creatorId: req.params.id,
        title: item.title,
        pubDate: item.pubDate,
        thumbnail: item.enclosure.url,
        description: item.content,
      });
    });
    console.log("vid amount", feedObject.feedItems.length);
    res.json(feedObject);
  } catch (e) {
    next(e);
  }
});

export default router; // ← add this
