import { GET_LOGS, SET_LOADING, LOGS_ERROR, ADD_LOGS, DELETE_LOG, SET_CURRENT, CLEAR_CURRENT, UPDATE_LOG, SEARCH_LOGS, CLEAR_LOGS} from './types';

export const getLogs = () => async dispatch => {
        try {
            setLoading();
            const res = await fetch('/logs');
            const data = await res.json()
            dispatch({ type: GET_LOGS, payload: data })}
         catch(err) {
            dispatch({ type: LOGS_ERROR, payload: err.response })
        }};
export const addLogs = (log) => async dispatch => {
        try {
            setLoading();
            // eslint-disable-next-line
            const res = await fetch('/logs', {
                method:'POST',
                body: JSON.stringify(log),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch({ type: ADD_LOGS, payload: log })}
         catch(err) {
            dispatch({ type: LOGS_ERROR, payload: err.response })
        }};
export const deleteLog = (id) => async dispatch => {
        try {
            setLoading();
            // eslint-disable-next-line
            const res = await fetch(`/logs/${id}`, {
                method: 'DELETE'
            });
            dispatch({ type: DELETE_LOG, payload: id })
        } catch(err) {
            dispatch({ type: LOGS_ERROR, payload: err.response })
        }
}
export const setCurrent = (log) => dispatch => {
        dispatch({ type: SET_CURRENT, payload: log})
}
export const clearCurrent = () => dispatch => {
        dispatch({ type: CLEAR_CURRENT})
}
export const editLog = (log) => async dispatch => {
    try {
        const res = await fetch(`/logs/${log.id}`, {
            method: 'PUT', 
            body: JSON.stringify(log),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            dispatch({ type: UPDATE_LOG, payload: data })
    } catch (err) {
        dispatch({ type: LOGS_ERROR, payload: err.response })
    }
}
export const searchLogs = (text) => dispatch => {
        dispatch({ type: SEARCH_LOGS, payload: text })};
export const clearLogs = () => dispatch => {
        dispatch({ type: CLEAR_LOGS })
}
export const setLoading = () => dispatch => {
        dispatch({ type: SET_LOADING })
    }