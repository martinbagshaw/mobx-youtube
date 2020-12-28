const YOUTUBE_API_KEY: string = process.env.API_KEY;
const base: string = 'https://www.googleapis.com/youtube/v3/';
const errorRes: { error: string } = { error: `Error fetching YouTube videos` };

// leigh halliday videos, first 50 videos
// - may need something similar to getVideos for categories / keywords
// https://developers.google.com/youtube/v3/docs/videoCategories/list
export const getAllVideos = async () => {
  const videoBase = 'playlistItems?part=snippet&playlistId=';
  const playlistId = 'UUWPY8W-FAZ2HdDiJp2RC_sQ';
  try {
    const result = await fetch(
      `${base}${videoBase}${playlistId}&key=${YOUTUBE_API_KEY}&maxResults=50`
    );
    const { error, items } = await result.json();
    return error ? errorRes : { response: items };
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return errorRes;
  }
};

// gets videos from one playlist, by ID
const getVideoIds = async () => {
  const videoBase = 'playlistItems?part=snippet&playlistId=';
  const playlistId = 'PL8fumNHsC-3P7SYHKwDu55n_9_1v1owzI';
  try {
    const result = await fetch(
      `${base}${videoBase}${playlistId}&key=${YOUTUBE_API_KEY}&maxResults=12`
    );
    const { error, items } = await result.json();
    return error
      ? errorRes
      : { response: items.map((i) => i.snippet.resourceId.videoId) };
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return errorRes;
  }
};

export const getVideos = async () => {
  const videoBase = 'videos?part=snippet&id=';
  try {
    const { error: idsError, response } = await getVideoIds();
    if (idsError) return errorRes;
    const result = await fetch(
      `${base}${videoBase}${response.join()}&key=${YOUTUBE_API_KEY}&maxResults=12`
    );
    const { error: videosError, items } = await result.json();
    return videosError ? errorRes : { response: items };
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return errorRes;
  }
};
