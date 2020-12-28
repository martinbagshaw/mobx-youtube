import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Card, Classes, Elevation } from '@blueprintjs/core';

type Video = {
  // id: string; iframe embed id
  snippet: {
    description: string;
    publishedAt: string;
    resourceId: {
      videoId: string;
    };
    thumbnails: {
      standard: {
        url: string;
        width: number;
      };
    };
    title: string;
  };
};

type VideoStore = {
  error: boolean;
  handleVideos: () => void;
  videos: Video[];
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
      VideoStore: { error, videos },
    } = this.props;

    return (
      <React.Fragment>
        {videos && videos.length ? (
          videos.map(
            (
              {
                snippet: {
                  description,
                  publishedAt,
                  resourceId: { videoId },
                  title,
                  thumbnails: {
                    standard: { url, width },
                  },
                },
              },
              index
            ) => {
              return (
                <Card key={index} elevation={Elevation.TWO}>
                  <img alt={title} src={url} width={width} />
                  <h3 className={Classes.HEADING}>{title}</h3>
                  <p>{description}</p>
                  <p>{publishedAt}</p>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener"
                  >
                    View Video
                  </a>
                </Card>
              );
            }
          )
        ) : error ? (
          <p>no data found</p>
        ) : (
          <p>loading...</p>
        )}
      </React.Fragment>
    );
  }
}

export default Videos;
