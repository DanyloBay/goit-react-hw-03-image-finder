import Notiflix from 'notiflix';
import { Component } from 'react';
import './Searchbar.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSearchSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      Notiflix.Notify.info('Please enter search info!');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({
      searchQuery: '',
    });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="searchbar__form" onSubmit={this.handleSearchSubmit}>
          <button type="submit" className="searchbar__button">
            <AiOutlineSearch
              style={{ color: 'white', width: '25px', height: '25px' }}
            />
          </button>

          <input
            className="searchbar__input"
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            value={this.state.searchQuery}
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
