const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null,
}

const userReducer = function(state=initialState, action) {
    switch (action.type) {
        case "FETCH_USERS_START":
            return { ...state, fetching: true }
            break;
        case "RECEIVE_USERS":
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: action.payload
            }
            break;
    }
    return state;
};

export default userReducer;
