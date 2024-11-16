import { createStore } from 'redux';
import imageReducer from './reducer';

const store = createStore(imageReducer);

export default store;