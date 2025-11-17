async function staggeredRequests(
  socialMediaCreators,
  maxConcurrency,
  timeBetweenCalls,
  jitter,
  fetchYoutuberDataCallback
) {
  let feedObjectsArray = [];
  let splitArray = [];
  for (let i = 0; i < socialMediaCreators.length; i++) {
    let n = Math.floor(i / maxConcurrency);
    if (i % maxConcurrency === 0) splitArray[n] = [];
    splitArray[n][(i + maxConcurrency) % maxConcurrency] =
      socialMediaCreators[i];
  }
  // console.log("splitArray: ", splitArray);

  let timeDelay = timeBetweenCalls + Math.random() * jitter;
  let timeOut = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeDelay);
  });

  for (const innerArray of splitArray) {
    let unwrappedFeedData = await Promise.all(
      innerArray.map((youtuber) => {
        return fetchYoutuberDataCallback(youtuber);
      })
    );
    feedObjectsArray.push(unwrappedFeedData);
    await timeOut;
  }
  return feedObjectsArray.flat();
}

export default staggeredRequests;
