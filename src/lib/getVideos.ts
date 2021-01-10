import { Thumbnails, VideoRes } from './types';
import { wordLimit } from './utils';

const YOUTUBE_API_KEY: string = process.env.API_KEY;
const base: string = 'https://www.googleapis.com/youtube/v3/';
const errorVideos: ErrorRes = { error: `Error fetching YouTube videos` };

type ErrorRes = {
  error: string;
};

// types for all videos
type ResourceId = {
  kind: string;
  videoId: string;
};

type Snippet = {
  channelId: string;
  channelTitle: string;
  description: string;
  playlistId: string;
  position: number;
  publishedAt: string;
  resourceId: ResourceId;
  thumbnails: Thumbnails;
  title: string;
};

type AllVideo = {
  etag: string;
  id: string;
  kind: string;
  snippet: Snippet;
};

type CategorySnippet = {
  assignable: boolean;
  channelId: string;
  title: string;
};

type Category = {
  etag: string;
  id: string;
  kind: string;
  snippet: CategorySnippet;
};

// Get All Videos & Get Video Ids
// - the same api call, but one just returns ids
// - use &maxResults=<number> to limit the result count. Need to work out pagination
// - currently fetching Leigh Halliday videos. Ideally allow user search

export const getAllVideos = async (): Promise<ErrorRes | { response: AllVideo[] }> => {
  const videoBase: string = 'playlistItems?part=snippet&playlistId=';
  const playlistId: string = 'UUWPY8W-FAZ2HdDiJp2RC_sQ';
  try {
    const result = await fetch(
      `${base}${videoBase}${playlistId}&key=${YOUTUBE_API_KEY}`//&maxResults=50
    );
    const { error, items }: { error: any; items: AllVideo[] } = await result.json();
    return error ? errorVideos : { response: items };
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return errorVideos;
  }
};

const getVideoIds = async (): Promise<ErrorRes | { response: string[] }> => {
  const videoBase = 'playlistItems?part=snippet&playlistId=';
  const playlistId = 'PL8fumNHsC-3P7SYHKwDu55n_9_1v1owzI';
  try {
    const result = await fetch(
      `${base}${videoBase}${playlistId}&key=${YOUTUBE_API_KEY}&maxResults=12`
    );
    const { error, items }: { error: any; items: AllVideo[] } = await result.json();
    return error
      ? errorVideos
      : {
          response: items.map((i) => {
            return i.snippet.resourceId.videoId;
          }),
        };
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return errorVideos;
  }
};

// Get Categories:
// - runs after Get Videos
// - if the app just pulls data from one YouTube channel, will probably want to cache the response
// - edited response to output less info and flatter data

type CategoryRes = {
  id: string;
  channelId: string;
  title: string;
};

const errorCategories: ErrorRes = { error: `Error fetching categories` };

export const getCategories = async (
  categoryIds: string[]
): Promise<ErrorRes | { response: CategoryRes[] }> => {
  if (!categoryIds || !Array.isArray(categoryIds)) return errorCategories;
  const categoryBase = 'videoCategories?part=snippet';
  try {
    // api calls return a max of 5 items by default
    // - if user has > 5 categories, this may break
    const result = await fetch(
      `${base}${categoryBase}&id=${categoryIds.join()}&key=${YOUTUBE_API_KEY}`
    );
    const { error, items } = await result.json();
    if (error) return errorCategories;
    // filter the response here:
    const filteredResponse = items.map((i: Category) => {
      const { id, snippet } = i;
      const { channelId, title } = snippet;
      return {
        id,
        channelId,
        title,
      };
    });
    return { response: filteredResponse };
  } catch (e) {
    return errorCategories;
  }
};

// Get Videos
// - uses video ids to get more granular information from snippets
// - edited response to output less info and flatter data

// TODO:
// - parse the description here. Has lots of html in it
// - split this out.
//   - might want to pass in video ids for favourite videos
//   - saving the data in state or a database may be better
export const getVideos = async (): Promise<ErrorRes | { response: VideoRes[] }> => {
  const videoBase = 'videos?part=snippet';
  try {
    const a: ErrorRes | { response: string[] } = await getVideoIds();
    const { error: idsError, response } = a;
    if (idsError) return errorVideos;
    const result = await fetch(
      `${base}${videoBase}&id=${response.join()}&key=${YOUTUBE_API_KEY}&maxResults=12`
    );
    const { error: videosError, items } = await result.json();
    if (videosError) return errorVideos;

    // Add categories
    const allIds = items.map((i) => i.snippet.categoryId);
    const ids = allIds.filter((i, idx, a) => a.indexOf(i) === idx);
    const { response: catResponse } = await getCategories(ids);

    // filter the response here:
    const filteredResponse = items.map((i) => {
      const { id, snippet } = i;
      const { categoryId, description, publishedAt, tags, title, thumbnails } = snippet;
      return {
        id,
        categoryId,
        categoryName: catResponse ? catResponse.find((i) => i.id === categoryId).title : undefined,
        description : wordLimit(description),
        descriptionLong: description,
        expanded: false,
        publishedAt,
        starred: false,
        tags,
        title,
        thumbnails,
      };
    });
    return { response: filteredResponse };
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return errorVideos;
  }
};
