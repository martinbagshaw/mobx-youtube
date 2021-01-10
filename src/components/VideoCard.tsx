import * as React from 'react';
import { Button, Card, Classes, Collapse, Elevation } from '@blueprintjs/core';

import { VideoRes } from '../lib/types';
import { Category } from './Category';
import { Tags } from './Tags';

import './video-card.css';

interface VideoCardProps extends VideoRes {
  expanded: boolean;
  expandCard: (id: string) => void;
  starVideo: (id: string) => void;
}
class VideoCard extends React.Component<VideoCardProps> {
  render() {
    const {
      id,
      // categoryId,
      categoryName,
      description,
      // descriptionLong,
      expanded,
      publishedAt,
      starred,
      starVideo,
      tags,
      title,
      thumbnails: {
        standard: { url },
      },
      expandCard,
    } = this.props;
    return (
      <Card
        elevation={Elevation.TWO}
        className={expanded ? 'video-card video-card-expanded' : 'video-card'}
      >
        <img alt={title} src={url} />
        <h3 className={Classes.HEADING}>{title}</h3>
        <div className="video-buttons">
          <a
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noopener"
          >
            View Video
          </a>
          <Button onClick={() => expandCard(id)}>{expanded ? 'Hide' : 'Show more'}</Button>
        </div>
        <Collapse isOpen={expanded}>
          <p>{description}</p>
          <p>Published: {publishedAt}</p>
          {categoryName && <Category categoryName={categoryName} />}
          <Tags tags={tags} />
        </Collapse>
        <Button
          className="favourite-container"
          fill
          rightIcon={starred ? 'star' : 'star-empty'}
          onClick={() => starVideo(id)}
        >
          Star Video
        </Button>
      </Card>
    );
  }
}

export default VideoCard;
