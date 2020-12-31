import * as React from 'react';
import { inject, observer } from 'mobx-react';
// import { toJS } from 'mobx';
import {
  Button,
  Card,
  Classes,
  Elevation,
  Intent,
  Spinner,
  Tag,
} from '@blueprintjs/core';

import { VideoRes } from '../lib/types';

const Category = ({ categoryName }): JSX.Element => (
  <div className="category-container">
    <h3 className={Classes.HEADING}>Category</h3>
    {categoryName}
  </div>
);

const Tags = ({ tags }): JSX.Element => {
  return (
    <React.Fragment>
      {tags && tags.length && (
        <React.Fragment>
          <h3 className={Classes.HEADING}>Tags</h3>
          <div className="tag-container">
            {tags.map((i, idx) => (
              <Tag key={idx} minimal>
                {i}
              </Tag>
            ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

type VideoStore = {
  error: boolean;
  handleVideos: () => void;
  videos: VideoRes[];
  todoCount: number;
};

@inject('VideoStore')
@observer
class Videos extends React.Component<VideoStore, {}> {
  componentDidMount() {
    this.props.VideoStore.handleVideos();
  }

  render() {
    const {
      VideoStore: { error, videos }, //starVideo
    } = this.props;

    return (
      <React.Fragment>
        {videos && videos.length ? (
          videos.map((video, index) => {
            const {
              id,
              // categoryId,
              categoryName,
              description,
              // descriptionLong,
              publishedAt,
              tags,
              title,
              thumbnails: {
                standard: { url },
              },
            } = video;
            return (
              <Card key={index} elevation={Elevation.TWO} className="video-card">
                <img alt={title} src={url} />
                <h3 className={Classes.HEADING}>{title}</h3>
                <p>{description}</p>
                <p>Published: {publishedAt}</p>
                {categoryName && <Category categoryName={categoryName} />}
                <Tags tags={tags} />
                <a
                  href={`https://www.youtube.com/watch?v=${id}`}
                  target="_blank"
                  rel="noopener"
                >
                  View Video
                </a>
                <Button
                  className="favourite-container"
                  fill
                  rightIcon="star-empty"
                  // onClick={() => starVideo(video)}
                >
                  Star Video
                </Button>
              </Card>
            );
          })
        ) : error ? (
          <p>no data found</p>
        ) : (
          <Spinner intent={Intent.PRIMARY} />
        )}
      </React.Fragment>
    );
  }
}

export default Videos;
