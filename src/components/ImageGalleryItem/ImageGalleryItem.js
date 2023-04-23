import { Component } from 'react';
import './ImageGalleryItem.scss';
import { Modal } from 'components/Modal/Modal';
// import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    toggleModal: false,
  };

  toggleModal = (e, largeImageURL) => {
    this.setState({ toggleModal: !this.state.toggleModal, largeImageURL });
  };

  render() {
    const { id, webformatURL, largeImageURL } = this.props;
    const { toggleModal } = this.state;
    return (
      <>
        <li key={id} className="gallery-item">
          <img
            key={id}
            src={webformatURL}
            alt=""
            onClick={e => this.toggleModal(e, largeImageURL)}
          />
        </li>
        {toggleModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}
