
export const initialState = {
    isLoggedIn: false,
    me: null,
    signUpData: {},
    loginData: {},
}

export const loginAction = (data) => {
    return (dispatch , getState) => {
        const state = getState();
        setTimeout(()=>{
            dispatch(loginRequestAction());
        }, 2000);
        axios.post('/api/login')
            .then((res)=>{
                dispatch(loginSuccessAction(res.data))
            })
            .catch((err)=>{
                dispatch(loginFailureAction())
            })
    }
}

export const loginRequestAction = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}

export const loginSuccessAction = (data) => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    }
}

export const loginFailureAction = (data) => {
    return {
        type: 'LOG_IN_FAILURE',
        data,
    }
}

export const logoutRequestAction = (data) => {
    return {
        type: 'LOG_OUT_REQUEST',
        data,
    }
}

export const logoutSuccessAction = (data) => {
    return {
        type: 'LOG_OUT_SUCCESS',
        data,
    }
}

export const logoutRequestFailure = (data) => {
    return {
        type: 'LOG_OUT_FAILURE',
        data,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "LOG_IN":
            return{
                ...state,
                isLoggedIn: true,
                me: action.data,
            }
        case "LOG_OUT":
            return{
                ...state,
                isLoggedIn: false,
                me: null,
            }
        default:
            return state;
    }
};

export default reducer;