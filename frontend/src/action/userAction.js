export const addUser = user => {
    return async dispatch => {
        await dispatch({ type: "SET_USER", payload: user });
    };
};
