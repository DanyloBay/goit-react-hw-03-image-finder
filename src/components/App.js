import { Component } from 'react';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import '../App.scss';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchSubmit = searchQuery => {
    this.setState({
      searchQuery,
    });
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        <div className="container">
          <ImageGallery searchQuery={this.state.searchQuery} />
        </div>
      </>
    );
  }
}
