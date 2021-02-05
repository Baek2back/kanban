import axios from 'axios';

const URL = 'https://api.unsplash.com/photos/random/?client_id=';
const clientId = '';

const instance = axios.create({
  baseURL: `${URL}${clientId}&query=purple&count=30`
});

export const getImages = () => instance.get('');
