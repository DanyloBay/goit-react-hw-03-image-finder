import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import './ImageGallery.scss';
export class ImageGallery extends Component {
  render() {
    const { dataImages } = this.props;

    return (
      <>
        <ul className="gallery">
          {dataImages.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          ))}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};
