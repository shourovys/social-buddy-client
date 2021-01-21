import { combineReducers } from 'redux';
import posts from './posts';
import user from './User';


export const reducers = combineReducers({ posts, user });
