import axios from 'axios';

const _BASE_URL = 'https://pixabay.com/api/';
const _API_KEY = '34198243-210bab7eda00f7845d389eb7b';

const fetchPhotos = async (searchQuery, page = 1) => {
  const { data } = await axios(
    `${_BASE_URL}?key=${_API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
  return data;
};

export default fetchPhotos;
