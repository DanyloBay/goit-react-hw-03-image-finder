import { Component } from 'react';
import './ImageGalleryItem.scss';
import { Modal } from 'components/Modal/Modal';
// import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    toggleModal: false,
    largeImageURL: null,
  };

  toggleModal = (e, largeImageURL) => {
    this.setState({ toggleModal: !this.state.toggleModal, largeImageURL });
  };

  render() {
    const hits = this.props.dataImages;
    const { toggleModal, largeImageURL } = this.state;
    return (
      <>
        {hits.map(({ id, webformatURL, largeImageURL }) => (
          <li key={id} className="gallery-item">
            <img
              src={webformatURL}
              alt=""
              onClick={e => this.toggleModal(e, largeImageURL)}
            />
          </li>
        ))}
        {toggleModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}
