import * as React from 'react';
import { observer } from 'mobx-react';
// import { toJS } from 'mobx';
import { Checkbox, Icon, Intent, Spinner } from '@blueprintjs/core';

import { VideoRes } from '../lib/types';
import VideoCard from './VideoCard';

type VideoStore = {
  error: boolean;
  expandCard: (id: string) => void;
  handleVideos: () => void;
  showStarred: boolean;
  setShowStarred: () => void;
  starVideo: (id: string) => void;
  videos: VideoRes[];
};
@observer
class Videos extends React.Component<{ VideoStore: VideoStore }> {
  componentDidMount() {
    this.props.VideoStore.handleVideos();
  }

  render() {
    const {
      VideoStore: { error, expandCard, showStarred, setShowStarred, starVideo, videos },
    } = this.props;

    return (
      <div>
        <div className="filter-controls">
          <Checkbox
            checked={showStarred}
            disabled={videos.find((i) => i.starred) ? false : true}
            onChange={setShowStarred}
          >
            <Icon
              icon={showStarred ? 'star' : 'star-empty'}
              style={{ marginRight: 4 }}
            />
            Show{showStarred ? ' All ' : ' Starred '}Videos
          </Checkbox>
        </div>
        {videos && videos.length ? (
          <div className="grid">
            {videos.reduce((acc, video, index) => {
              const card = (
                <VideoCard
                  key={index}
                  {...video}
                  starVideo={starVideo}
                  expandCard={expandCard}
                />
              );
              if (!showStarred) {
                acc.push(card);
              }
              if (showStarred && video.starred) {
                acc.push(card);
              }
              return acc;
            }, [])}
          </div>
        ) : error ? (
          <div className="center-container">
            <p>no data found</p>
          </div>
        ) : (
          <div className="center-container">
            <Spinner intent={Intent.PRIMARY} />
          </div>
        )}
      </div>
    );
  }
}

export default Videos;
