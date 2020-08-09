import { combineReducers } from 'redux';

import page from './pageReducer';
import notes from './notesReducer';
import user from './userReducer';

const reducers = combineReducers({
    user,
    page,
    notes
})

export default reducers;
