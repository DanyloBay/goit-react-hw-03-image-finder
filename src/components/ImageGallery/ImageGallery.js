import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

import './ImageGallery.scss';
export class ImageGallery extends Component {
  render() {
    const { dataImages, showBtn, onClick, status } = this.props;

    if (status === 'idle') {
      return (
        <div className="info">Давайте спробуємо знайти те що вас цікавить</div>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return (
        <div className="info">
          Перепрошуємо за не зручності, але за вашим запитом нічого не знайдено
        </div>
      );
    }

    return (
      <>
        <ul className="gallery">
          <ImageGalleryItem dataImages={dataImages} />
        </ul>
        {showBtn && <Button onClick={onClick} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};
