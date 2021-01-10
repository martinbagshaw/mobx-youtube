import { observable, makeObservable, action } from 'mobx';
import { toJS } from 'mobx';

import { VideoRes } from '../lib/types';
import { getVideos } from '../lib/getVideos';

// Getters
// - see what a getter should legitimately do
// - getter may just be for getting assoicated data from data that is already loaded
// - A knock on api call loads category information separately
class VideoStore {
  error: boolean = false;
  loading: boolean = true;
  showStarred: boolean = false;
  videos: VideoRes[] = [];

  constructor() {
    makeObservable(this, {
      error: observable,
      expandCard: action,
      handleVideos: action,
      loading: observable,
      showStarred: observable,
      setShowStarred: action,
      starVideo: action,
      videos: observable
    });
  }

  expandCard = (id: string) => {
    const selected = this.videos.find(i => i.id === id);
    selected.expanded = !selected.expanded;
  };

  handleVideos = async () => {
    const { error, response } = await getVideos();
    if (response) {
      this.videos = response;
    }
    if (error) this.error = error;
    this.loading = false;
  };

  starVideo = (id: string) => {
    const selected = this.videos.find(i => i.id === id);
    selected.starred = !selected.starred;
  };

  setShowStarred = () => {
    this.showStarred = !this.showStarred;
  }

}

export default new VideoStore();
