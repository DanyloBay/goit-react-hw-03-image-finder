import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import './ImageGallery.scss';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';
import fetchPhotos from 'components/API/Api';

export class ImageGallery extends Component {
  state = {
    data: [],
    status: 'idle',
    page: 1,
    error: null,
    imagesOnPage: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { page } = this.state;
    try {
      if (prevProps.searchQuery !== searchQuery) {
        this.setState({ status: 'pending' });
        const { hits } = await fetchPhotos(searchQuery);
        this.setState({
          data: hits,
          imagesOnPage: hits.length,
          status: 'resolved',
        });
      }
    } catch (error) {
      this.setState({ error, status: 'rejected' });
      console.log(error.message);
    }

    if (prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });
        const { hits } = await fetchPhotos(searchQuery, page);
        this.setState(prevState => ({
          data: prevState.data.concat(hits),
          imagesOnPage: prevState.imagesOnPage + hits.length,
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
        console.log(error.message);
      }
    }
  }

  incrementPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { data, status, imagesOnPage } = this.state;

    if (status === 'idle') {
      return (
        <div className="info">Давайте спробуємо знайти те що вас цікавить</div>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      <div className="info">
        Перепрошуємо за не зручності, але за вашим запитом нічого не знайдено
      </div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="gallery">
            {data && <ImageGalleryItem dataImages={data} />}
          </ul>
          {status === 'resolved' && imagesOnPage >= 12 && (
            <Button onClick={this.incrementPage} />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};
