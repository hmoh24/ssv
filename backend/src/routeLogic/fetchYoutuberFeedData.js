import Parser from "rss-parser";
const parser = new Parser();

async function fetchYoutuberFeedData(youtuber) {
  const feed = await parser.parseURL(
    `http://localhost:1200/youtube/channel/${youtuber.id}`
  );
  console.log(feed.items[0].creator);
  const feedObject = {
    feedTitle: feed.items[0].creator,
    feedItems: [],
  };
  feed.items.forEach((item) => {
    feedObject.feedItems.push({
      creator: item.creator || feed.title,
      creatorId: youtuber.id,
      title: item.title,
      pubDate: item.pubDate,
      thumbnail: item.enclosure.url,
      description: item.content,
    });
  });
  // console.log(feedObject.feedTitle);
  return feedObject;
}

export default fetchYoutuberFeedData;
