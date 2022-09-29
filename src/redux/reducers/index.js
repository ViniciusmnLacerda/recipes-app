import { combineReducers } from 'redux';
import drinks from './drinks';
import meals from './meals';
import user from './user';

const rootReducer = combineReducers({ drinks, meals, user });

export default rootReducer;
