type Thumb = {
  height: number;
  url: string;
  width: number;
};

export type Thumbnails = {
  default: Thumb;
  high: Thumb;
  maxResultsmedium: Thumb;
  standard: Thumb;
};

export type VideoRes = {
  id: string;
  categoryId: string;
  categoryName: string;
  description: string;
  descriptionLong: string;
  expanded: boolean;
  publishedAt: string;
  starred: boolean;
  tags: string;
  title: string;
  thumbnails: Thumbnails;
};
