import {combineReducers} from 'redux';

function cities(state = [], action) {
    switch(action.type) {
        case "GET_CITIES":
            return action.value;
        default:
            return state
    }
}

function user(state = [], action) {
    switch(action.type) {
        case "GET_USER": {
            return action.value
        }
        case "UPDATE_USER": {
            return [
                ...state, action.value
            ]
        }
        default:
            return state
    }
}

export default combineReducers({
    cities,
    user
});