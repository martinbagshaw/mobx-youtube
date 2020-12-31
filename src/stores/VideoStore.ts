import { observable, makeObservable, action } from 'mobx';
import { getVideos } from '../lib/getVideos';

// Getters
// - see what a getter should legitimately do
// - getter may just be for getting assoicated data from data that is already loaded
// - A knock on api call loads category information separately
class VideoStore {
  error = false;
  loading = true;
  videos = [];
  // categories = [];

  constructor() {
    makeObservable(this, {
      error: observable,
      loading: observable,
      handleVideos: action,
      videos: observable,
      // handleCategories: action,
      // categories: observable,
    });
  }

  // mobx strict mode warning for this and the below function
  handleVideos = async () => {
    const { error, response } = await getVideos();
    if (response) {
      this.videos = response;
    }
    if (error) this.error = error;
    this.loading = false;
  };

  // separate categories API call:
  // handleCategories = async (categories: string[]) => {
  //   const { error, response } = await getCategories(categories);
  //   if (response) {
  //     this.categories = response;
  //   }
  //   if (error) console.log('categories API call error: ', error)
  // };
}

export default new VideoStore();
