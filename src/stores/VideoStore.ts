import { observable, makeObservable, action } from 'mobx';
import { getAllVideos } from '../lib/getVideos';

class VideoStore {
  error = false;
  loading = true;
  videos = [];

  constructor() {
    makeObservable(this, {
      error: observable,
      loading: observable,
      handleVideos: action,
      videos: observable,
    });
  }

  handleVideos = async () => {
    const { error, response } = await getAllVideos();
    if (response) this.videos = response;
    if (error) this.error = error;
    this.loading = false;
  };
}

export default new VideoStore();
