import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './Components/App';
import authReducer from './store/reducers/auth';
import playlistReducer from './store/reducers/playlists';

const rootReducer = combineReducers({
    authStore: authReducer,
    playlistStore: playlistReducer
});
const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
