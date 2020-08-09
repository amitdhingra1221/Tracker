import * as actionTypes from './actionTypes';
import axios from 'axios';
//////////////////////////BELOW WILL CHECK FOR USER'S EMAIL AUTHENTICTY ///////////////////////////////////////

export const checkEmail = (email) => {
    // console.log('checkEmail')
    return dispatch => {
        console.log('email + ' + email)
        dispatch(checkEmailStart());
        axios.get('https://react-my-project-e7e4a.firebaseio.com/Users.json')
        .then(res => {
            let validEmail = false
            let memberIdL = email.toLowerCase();
            const memberIdDomain = memberIdL.endsWith("@tsys.com")
            const memberId = memberIdL.split("@",1)
            validEmail = Object.keys(res.data).map(memberName => {
                if (memberId == memberName.toLowerCase() && memberIdDomain) {
                    // validEmail = true
                    return dispatch(checkEmailSuccess(memberId))
                }
            });
        })
        .catch(error => 
            dispatch(checkEmailFail(error)))
            // dispatch(checkEmailFail(error.response.data.error)))
    }
}

export const checkEmailStart = () => {
    return {
        type: actionTypes.CHECK_EMAIL_START
    };
};

export const checkEmailSuccess = (memberEmailId, isManager) => {
    return {
        type: actionTypes.CHECK_EMAIL_SUCCESS,
        memberId: memberEmailId,
        isManager: isManager
    };
};

export const checkEmailFail = (error) => {
    return {
        type: actionTypes.CHECK_EMAIL_FAIL,
        error: error
    };
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////BELOW WILL FETCH USER DATA LIKE NAME AND POSITION IN HEIRARACHY///////////////////
export const fetchUserDetails = (memberId, token) => {
    console.log('fetch user details')
    return dispatch => {
        dispatch(fetchUserDetailsStart());
        axios.get('https://react-my-project-e7e4a.firebaseio.com/Users.json')
        .then(response => {
            const memberName = response.data[memberId]
            dispatch(checkDesignation(memberId, memberName, token))
        })
    }
}


export const checkDesignation = (memberId, memberName, token) => {
    console.log('checkDesignation')
    return dispatch => {
        axios.get('https://react-my-project-e7e4a.firebaseio.com//ManagersData.json?auth=' + token)
        .then(response => {
            let teamMembers = null;
            teamMembers = response.data[memberId]
            console.log('teamMembers')
            console.log(teamMembers)
            let designation = null;
            if (teamMembers) {
                designation = 'manager'
                dispatch(fetchUserDetailsSuccess(memberId, memberName, designation, teamMembers))
            } else {
                designation = 'member'
                dispatch(fetchUserDetailsSuccess(memberId, memberName ,designation, teamMembers))
            }
        })
    }
}

export const fetchUserDetailsStart = () => {
    return {
        type: actionTypes.FETCH_USER_DETAILS_START
    };
};

export const fetchUserDetailsSuccess = (memberId, memberName, designation, teamMembers) => {
    return {
        type: actionTypes.FETCH_USER_DETAILS_SUCCESS,
        name: memberName,
        memberId: memberId,
        isManager: designation,
        teamMembers: teamMembers
    };
};

export const fetchUserDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_DETAILS_FAIL,
        error: error
    };
};


////////////////////////////////////////////////////////////////////////////////////////////////////////
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, isSignup) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        isSignedUp: isSignup
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogoutStart = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_START
    };
};

// export const cleanUpTrackerReducer = () => {
//     return {
//         type: actionTypes.CLEANUP_TRACKER_REDUCER
//     };
// };

export const authLogout = () => {
    return dispatch => {
        // dispatch(cleanUpTrackerReducer());
        dispatch(authLogoutStart());
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000)
    };
};

export const auth = (email, password, isSignup) => {
    console.log('auth k ander ' + isSignup)
    return dispatch => {
        dispatch(authStart());
        const authData = { 
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjhFveIYjFxDQf3Y9zhCzIz175ykieYlo'
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjhFveIYjFxDQf3Y9zhCzIz175ykieYlo'
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(checkAuthTimeout(response.data.expiresIn))
            dispatch(authSuccess(response.data.idToken, response.data.localId,isSignup));
        })
        .catch(error => {
            // dispatch(authFail(error));
            dispatch(authFail(error.response.data.error));
        })
    };
};


export const storeCredentials = (email, password, isSignUp) => {
    console.log('store credentials');
    return {
        type: actionTypes.STORE_CREDENTIALS,
        email: email,
        password: password,
        isSignUp: isSignUp
    };
}

export const search = (value) => {
    return {
        type: actionTypes.SEARCH,
        searchValue: value
    }
}
