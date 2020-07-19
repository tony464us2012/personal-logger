import { GET_LOGS, SET_LOADING, LOGS_ERROR, ADD_LOGS, DELETE_LOG, SET_CURRENT, UPDATE_LOG, SEARCH_LOGS, CLEAR_LOGS} from '../actions/types';

const initialState = {
    logs: null,
    current: null,
    filtered: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_LOGS: 
        return {
            ...state,
            logs: action.payload,
            loading: false
        };
        case SET_LOADING: 
            return {
                ...state,
                loading: true
            };
        case ADD_LOGS:
            return {
                ...state, 
                logs: [...state.logs, action.payload ],
                loading: false
            }
        case UPDATE_LOG: 
            return {
                ...state,
                logs: state.logs.map(log => log._id === action.payload._id ? action.payload : log),
                loading: false
            }
        case SEARCH_LOGS: 
            return {
                ...state,
                filtered: state.logs.filter(log => {
                    const regex = new RegExp(`${action.payload}`, `gi`);
                    return log.message.match(regex) 
                })
            }
        case SET_CURRENT: 
            return {
                ...state,
                current: action.payload,
            }
        case CLEAR_LOGS: 
            return {
                ...state,
                filtered: null
            }
        case DELETE_LOG: 
            return {
                ...state,
                logs: state.logs.filter(log => log._id !== action.payload)
            }
        case LOGS_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}