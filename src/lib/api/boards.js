import axios from 'axios';

const URL = 'http://localhost:7000';

const instance = axios.create({
  baseURL: `${URL}/boards`,
  headers: { 'content-Type': 'application/json' }
});

export const getBoards = () => instance.get('/');
export const insertTask = ({ category, task }) =>
  instance.post('/', { category, task });
export const allocateTasks = ({ categories, tasks }) =>
  instance.patch('/', { categories, tasks });
export const removeTask = ({ category, id }) =>
  instance.delete('/', { data: { category, id } });
