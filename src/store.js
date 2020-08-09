import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger }from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers';
const middleware = applyMiddleware(thunk, createLogger());

const store = createStore(reducer, middleware);

export default store;

// store.subscribe(() => {
//     console.log("score changed", store.getState());
// });

// store.dispatch(dispatch => {
//     dispatch({type: "FETCH_USERS_START"});
//     // do something async
//     setTimeout(() => {
//         console.log('timedout');
//         dispatch({
//             type: "RECEIVE_USERS",
//             payload: [{id: 12, username: "michael"}, { id: 53, username: "kathleen" }]
//         });
//     }, 2000);
// });

