import './Modal.scss';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleKeyDown = ({ key }) => {
    if (key !== 'Escape') {
      return;
    }

    this.props.onClose();
  };

  handleClickOutside = ({ target: { className } }) => {
    if (className !== 'overlay') {
      return;
    }

    this.props.onClose();
  };

  render() {
    return (
      <div className="overlay">
        <div className="modal">
          <img src={this.props.largeImageURL} alt="" width={750} height={550} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
