import fetchFromAPI from "./fetchfromAPI";

// "PT1M3S" -> 63
const durationToSeconds = (iso) => {
  const m = iso?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0);
};

const isShort = (item, seconds) => {
  const text = `${item.snippet?.title ?? ""} ${item.snippet?.description ?? ""}`;
  return (seconds > 0 && seconds <= 60) || /#shorts/i.test(text);
};

// Search results mix Shorts into the feed; split them out so the UI can
// show a dedicated Shorts shelf like YouTube does. Durations come from a
// single batched videos?part=contentDetails call.
export const fetchFeedVideos = async (query) => {
  const { items = [] } = await fetchFromAPI(
    `search?part=snippet&regionCode=IN&q=${query}`
  );

  const ids = items.filter((i) => i.id?.videoId).map((i) => i.id.videoId);
  let durations = {};
  if (ids.length) {
    try {
      const details = await fetchFromAPI(
        `videos?part=contentDetails&id=${ids.join(",")}`
      );
      durations = Object.fromEntries(
        (details.items || []).map((d) => [
          d.id,
          durationToSeconds(d.contentDetails?.duration),
        ])
      );
    } catch {
      // no durations -> hashtag detection still applies below
    }
  }

  const videos = [];
  const shorts = [];
  for (const item of items) {
    const videoId = item.id?.videoId;
    if (videoId && isShort(item, durations[videoId])) {
      shorts.push(item);
    } else {
      videos.push(item);
    }
  }
  return { videos, shorts };
};

export default fetchFeedVideos;
