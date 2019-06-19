import axios from 'axios';

import * as actionTypes from './actionTypes';

export const fetchUser = () => {
    return async dispatch => {
        try {
            let returnedData = await axios.get('/api/current_user');

            dispatch({
                type: actionTypes.FETCH_USER,
                user: returnedData.data // user sent from server side
            });
        } catch (error) {
            console.log(error);
        }
    };
};
