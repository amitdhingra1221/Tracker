import * as actionTypes from '../actions/actionTypes';

const initialState = {
    email: null,
    password: null,
    isSignUp: false, 
    token: null,
    userid: null,
    isEmailIdValid: false,
    isManager: null,
    memberId: null,
    memberName: null,
    managerId: null,
    managerName: null,
    error: null,
    loading: false,
    searchString: null,
    welcomeLoading: null,
    userSignedUp: null,
    teamMembers: {}
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_CREDENTIALS:
            console.log('reducer me signup ' + action.isSignUp)
            return {
                ...state,
                email: action.email,
                password: action.password,
                isSignUp: action.isSignUp
            }    
        case actionTypes.SEARCH:
            console.log('search started')
            return {
                ...state,
                searchString: action.searchValue
            }
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true,
                isEmailIdValid: false
            }
        case actionTypes.AUTH_SUCCESS:
            if (action.isSignedUp) {
                return {
                    ...state,
                    token: action.idToken,
                    userId: action.userId,
                    error: null,
                    loading: false,
                    userSignedUp: true
                }
            } else {
                return {
                    ...state,
                    token: action.idToken,
                    userId: action.userId,
                    error: null,
                    loading: false,
                    userSignedUp: false
                }
            }
        case actionTypes.AUTH_FAIL:
        return {
            ...state,
            error: action.error,
            loading: false
        }
        case actionTypes.AUTH_LOGOUT_START:
        return {
            ...state,
            email: null,
            password: null,
            isSignUp: false,
            token: null,
            userid: null,
            isEmailIdValid: false,
            isManager: null,
            memberId: null,
            memberName: null,
            managerId: null,
            managerName: null,
            error: null,
            loading: false,
            welcomeLoading: null,
            teamMembers: {}

        }
        case actionTypes.CHECK_EMAIL_START:
        return {
            ...state,
            isEmailIdValid: false,
            error: null
        }
        case actionTypes.CHECK_EMAIL_SUCCESS:
        return {
            ...state,
            memberId: action.memberId,
            isEmailIdValid: true,
            isManager: action.isManager,
            error: null
        }
        case actionTypes.CHECK_EMAIL_FAIL:
        return {
            ...state,
            error: action.error
        }
        case actionTypes.FETCH_USER_DETAILS_START:
        return {
            ...state,
            welcomeLoading: true,
            userSignedUp: false
        }
        case actionTypes.FETCH_USER_DETAILS_SUCCESS:
            if (action.isManager === 'manager') {
                return {
                    ...state,
                    isManager: true,
                    managerId: action.memberId,
                    memberId: action.memberId,
                    managerName: action.name,
                    memberName: action.name,
                    welcomeLoading: false,
                    teamMembers: action.teamMembers
                }
            } else {
                return {
                    ...state,
                    isManager: false,
                    memberId: action.memberId,
                    memberName: action.name,
                    welcomeLoading: false
                }
            }
        case actionTypes.FETCH_USER_DETAILS_FAIL:
        return {
            ...state,
            // error: action.error,
            welcomeLoading: false
        }
        default: 
            return state
    };
};

export default reducer;