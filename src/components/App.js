import { Component } from 'react';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import fetchPhotos from 'components/API/Api';

import '../App.scss';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    searchQuery: '',
    data: [],
    page: 1,
    imagesOnPage: 0,
    error: null,
    status: 'idle',
    showBtn: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (searchQuery !== prevState.searchQuery || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetchPhotos(searchQuery, page);
        this.setState(prevState => ({
          data: [...prevState.data, ...hits],
          showBtn: page < Math.ceil(totalHits / 12),
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({
          error,
          status: 'rejected',
        });
        console.log(error.message);
      }
    }
  }

  incrementPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handleSearchSubmit = searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
      data: [],
      showBtn: false,
    });
  };

  render() {
    const { data, status, showBtn } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleSearchSubmit} />;
        <div className="container">
          <ImageGallery dataImages={data} />
          {showBtn && <Button onClick={this.incrementPage} />}
          {status === 'pending' && <Loader />}
          {status === 'rejected' && (
            <div className="info">
              Перепрошуємо за не зручності, але за вашим запитом нічого не
              знайдено
            </div>
          )}
        </div>
      </>
    );
  }
}
