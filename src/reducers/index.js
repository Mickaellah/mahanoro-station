import {combineReducers} from 'redux';

function cities(state = [], action) {
    switch(action.type) {
        case "GET_CITIES":
            return action.value;
        default:
            return state
    }
}

export default combineReducers({
    cities
});