import { Router } from "express";
import youtubeJson from "../feedSources/youtube.json" assert { type: "json" };
import fetchYoutuberFeedData from "../routeLogic/fetchYoutuberFeedData.js";
import socialMediaCallConfig from "../socialMediaCallConfig.json" assert { type: "json" };
import Parser from "rss-parser";
import staggeredRequests from "../routeLogic/staggeredRequests.js";
import { logNetworkCall } from "../logging/networkCalls/logNetworkCall.js";

const parser = new Parser();
const router = Router();
const {
  youtube: { maxConcurrentCalls, timeBetweenCallsMs, jitterMs },
} = socialMediaCallConfig;

// GET /api/youtube/bulk
router.get("/bulk", async (req, res, next) => {
  const formatted = new Date()
    .toLocaleString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(",", "");

  try {
    console.log("Youtube Route - bulk fetch from file");
    const feedArray = await staggeredRequests(
      youtubeJson.creators,
      maxConcurrentCalls,
      timeBetweenCallsMs,
      jitterMs,
      fetchYoutuberFeedData
    );

    const bulkFeedObject = {
      feedType: "bulk",
      feedArray,
    };
    const totalCreators = youtubeJson.creators.length;
    const totalPostsFetched = bulkFeedObject.feedArray.reduce(
      (prevResult, current) => {
        return prevResult + current.feedItems.length;
      },
      0
    );

    const logData = {
      type: "success",
      source: "youtube",
      creatorsRequested: totalCreators,
      postsFetched: totalPostsFetched,
      timeLogged: formatted,
    };

    logNetworkCall(logData, false);

    res.json({
      status: "ok",
      creatorsProcessed: totalCreators,
      bulkFeedObject,
    });
  } catch (e) {
    next(e);
    const logData = {
      type: "error",
      source: "youtube",
      message: e,
      timeLogged: formatted,
    };
    logNetworkCall(logData, false);
  }
});

// GET /api/youtube/channel/:id
// no logging
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
