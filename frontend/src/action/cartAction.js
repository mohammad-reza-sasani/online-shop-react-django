
export const  CountProductCart = (data) => {
    return async dispatch => {
        await dispatch({ type: "UPDATE",payload:data});
    };
};
