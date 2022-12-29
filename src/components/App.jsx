import { Component } from 'react';

import { getImages, normalizeImages } from 'services/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    request: '',
    images: [],
    page: 1,
    totalImages: 0,
    loading: false,
    error: '',
  };

  componentDidUpdate = async (_, prevState) => {
    const { request, page } = this.state;
    if (prevState.request !== request || prevState.page !== page) {
      this.setState({ loading: true, error: '' });
      try {
        const getImage = await getImages(request, page);
        const normalizedImages = normalizeImages(getImage.hits);
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...normalizedImages],
            totalImages: getImage.totalHits,
          };
        });
      } catch (error) {
        this.setState({ error: 'Something went wrong' });
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  getRequest = request => {
    if (request === this.state.request) {
      alert('Already found, please type new request');
    }
    this.setState({ request, images: [], page: 1 });
  };

  loadMoreBntHandler = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { images, totalImages, loading, error } = this.state;
    const showLoadMore = images.length !== totalImages && !loading;
    return (
      <div className="App">
        <Searchbar onSubmit={this.getRequest} />
        {images.length > 0 && <ImageGallery images={images} />}
        {showLoadMore && <Button onClick={this.loadMoreBntHandler} />}
        {loading && <Loader />}
        {error && <p>{error}</p>}
      </div>
    );
  }
}
