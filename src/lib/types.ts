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
  publishedAt: string;
  tags: string;
  title: string;
  thumbnails: Thumbnails;
};
