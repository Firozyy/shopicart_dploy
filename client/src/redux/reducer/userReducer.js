export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_LOGIN_REQUEST":
            return { loading: true, }
        case "USER_LOGIN_SUCCESS":
            return { loading: false, userInfo: action.payload }
        case "USER_LOGIN_FAIL":
            return { loading: false, error: action.payload }
        case "USER_LOGOUT":
            return {}
        default:
            return state
    }
};

export const userRegisteReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_REGISTER_REQUEST":
            return { loading: true, }
        case "USER_REGISTER_SUCCESS":
            return { loading: false, userInfo: action.payload }
        case "USER_REGISTER_FAIL":
            return { loading: false, error: action.payload }

        default:
            return state
    }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case "USER_DETAILSE_REQUEST":
            return { ...state, loading: true, }
        case "USER_DETAILSE_SUCCESS":
            return { loading: false, user: action.payload }
        case "USER_DETAILSE_FAIL":
            return { loading: false, error: action.payload }
        case "USER_DETAILSE_RESET":
            return { user: {} }
        default:
            return state
    }
};

export const userupdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_UPDATE_PROFILE_REQUEST":
            return { loading: true, }
        case "USER_UPDATE_PROFILE_SUCCESS":
            return { loading: false, success: true, userInfo: action.payload }
        case "USER_UPDATE_PROFILE_FAIL":
            return { loading: false, error: action.payload }

        default:
            return state
    }
};


export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case "USER_LIST_REQUEST":
            return { loading: true, }
        case "USER_LIST_SUCCESS":
            return { loading: false, users: action.payload }
        case "USER_LIST_FAIL":
            return { loading: false, error: action.payload }
        case "USER_LIST_RESET":
            return { users: [] }
        default:
            return state
    }
};



export const userRemoveReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_REMOVE_REQUEST":
            return { loading: true, }
        case "USER_REMOVE_SUCCESS":
            return { loading: false, success:true }
        case "USER_REMOVE_FAIL":
            return { loading: false, error: action.payload }

        default:
            return state
    }
};



export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case "USER_UPDATE_REQUEST":
            return { loading: true, }
        case "USER_UPDATE_SUCCESS":
            return { loading: false,success:true }
        case "USER_UPDATE_FAIL":
            return { loading: false, error: action.payload }
        case "USER_UPDATE_RESET":
            return { user: {} }
        default:
            return state
    }
}