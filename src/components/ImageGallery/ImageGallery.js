import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';
import './ImageGallery.scss';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';

const _BASE_URL = 'https://pixabay.com/api/';
const _API_KEY = '34198243-210bab7eda00f7845d389eb7b';

export class ImageGallery extends Component {
  state = {
    data: null,
    status: 'idle',
    page: 1,
  };

  async componentDidUpdate(prevProps, _) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });
      const { data } = await axios(
        `${_BASE_URL}?key=${_API_KEY}&q=${this.props.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.state.page}&per_page=12`
      );
      this.setState({ data, status: 'resolved' });
    }
  }

  render() {
    const { data, status } = this.state;

    if (status === 'idle') {
      return (
        <div className="info">Давайте спробуємо знайти те що вас цікавить</div>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="gallery">
            {data && <ImageGalleryItem dataImages={data} />}
          </ul>
          <Button />
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};
