import { Router } from "express";
import youtubeJson from "../feedSources/youtube.json" assert { type: "json" };
import youtubeBulkCallbackFunction from "../routeLogic/youtubeBulkCall.js";
import Parser from "rss-parser";

const parser = new Parser();
const router = Router();

// GET /api/youtube/bulk
router.get("/bulk", async (req, res, next) => {
  try {
    console.log("Youtube Route - bulk fetch from file");

    const feedArray = await Promise.all(
      youtubeJson.creators.map((youtuber) =>
        youtubeBulkCallbackFunction(youtuber)
      )
    );

    const bulkFeedObject = {
      feedType: "bulk",
      feedArray,
    };

    res.json({
      status: "ok",
      processed: youtubeJson.creators.length,
      bulkFeedObject,
    });
  } catch (e) {
    next(e);
  }
});

// GET /api/youtube/channel/:id
router.get("/channel/:id", async function (req, res, next) {
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

export default router;
