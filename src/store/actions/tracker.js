import * as actionTypes from './actionTypes';
import axios from '../../axios-teamdata';

export const getUserData = (user, userUrl) => {
    return {
        type: actionTypes.GET_USER_DATA,
        currentUser: user,
        userUrl: userUrl
    };
};

export const nextMonth = (newMonth) => {
    return {
        type: actionTypes.NEXT_MONTH,
        month: newMonth
    };
};

export const prevMonth = (newMonth) => {
    return {
        type: actionTypes.PREV_MONTH,
        month: newMonth
    };
};



export const storeUpdatedTracker = () => {
    return {
        type: actionTypes.STORE_UPDATED_TRACKER
    }
}

// export const storeTeamDataAndInputForm = (data) => {
//     return dispatch => {
//         dispatch(storeTeamData(data))
//         axios.get('/emptyForm.json')
//             .then(res => {
//                     dispatch(fetchInputFormSuccess(res.data))
//                 })
//         .catch(error => {
//             console.log(error);
//             dispatch(fetchInputFormFail(error))
//         })
//     }
// }

// export const storeTeamData = (data) => {
//     return {
//         type: actionTypes.STORE_TEAM_DATA,
//         entireData: data
//     }
// }

// ACTIONS FOR THE FILLED FETCHING TRACKERS //

export const fetchTracker = (user, userUrl, token) => {
    console.log('fetch tracker')
    return dispatch => {
        dispatch(fetchTrackerStart()); // this action is dispatched just for showing the loader.
        dispatch(fetchInputForm(token));
        // Below asynch action/code
        axios.get(userUrl + '?auth=' + token)
        .then(res => {
                console.log('res.data ');
                console.log(res.data);
                // if (res.data) {
                    dispatch(fetchTrackerSuccess(res.data, user))
                    dispatch(storeUpdatedTracker())
                // } 
                // else {
                //     dispatch(storeNewUserData(user, userUrl, token))
                // }    
            })

        .catch(error => {
            console.log(error);
            dispatch(fetchTrackerFail(error))
        })
    };
};

export const fetchTrackerSuccess = (data, user) => {
    console.log('fetch tracker success chala')
    return {
        type: actionTypes.FETCH_TRACKER_SUCCESS,
        trackerData: data,
        user: user
    };
};

export const fetchTrackerStart = () => {
    return {
        type: actionTypes.FETCH_TRACKER_START
    };
};
// export const storeNewUserData = (user, userUrl, token) => {
//     return dispatch => {
//         let userData = {
//             user: {

//             }
//         };
//         axios.post(userUrl + '.json' + '?auth=' + token, userData)
//             .then(res => {
//                 console.log(res.data ) // {aName: "Amit Dhingra"}
//                 dispatch(updateTrackerSuccess(userData))    
//             })
//         .catch(error => {
//             console.log(error);
//             dispatch(updateTrackerFail(error))
//         })
//     };
// };


export const fetchTrackerFail = (error) => {
    return {
        type: actionTypes.FETCH_TRACKER_FAIL,
        error: error
    };
};


// ACTIONS FOR FETCHING EMPTY INPUT FORM //
export const fetchInputFormSuccess = (emptyForm) => {
    console.log('fetch input form success')
    return  {
        type: actionTypes.FETCH_INPUT_FORM_SUCCESS,
        inputForm: emptyForm
    }
}

export const fetchInputFormFail = (error) => {
    return  {
        type: actionTypes.FETCH_INPUT_FORM_FAIL,
        error: error
    }
}

export const fetchInputForm = (token) => {
    console.log('fetching input form')
    return dispatch => {
        axios.get('/emptyForm.json?auth=' + token)
            .then(res => {
                    dispatch(fetchInputFormSuccess(res.data))
                })
        .catch(error => {
            console.log(error);
            dispatch(fetchInputFormFail(error))
        })
    }
}

// BELOW ACTIONS WILL HANDLE UPDATING OF THE TRACKER

export const inputChanged = (field, value) => {
    // console.log ('actions k ander se field ' + field + ' value ' + value)
    return {
        type: actionTypes.INPUT_CHANGED,
        updatedField: field,
        updatedValue: value
    }
}

export const updateTracker = (updatedTracker, user, month, token) => {
    return dispatch => {
        dispatch(updateTrackerStart())
        axios.put('/TeamMembers/' + user + '/' + month + '.json' + '?auth=' + token, updatedTracker)
            .then(res => {
                console.log(res.data ) // {aName: "Amit Dhingra"}
                dispatch(updateTrackerSuccess(updatedTracker))    
            })
        .catch(error => {
            console.log(error);
            dispatch(updateTrackerFail(error))
        })
    };
};

export const updateTrackerStart = () => {
    return {
        type: actionTypes.UPDATE_TRACKER_START
    }
}

export const updateTrackerSuccess = (updatedTracker) => {
    return {
        type: actionTypes.UPDATE_TRACKER_SUCCESS,
        // id: id,
        updatedTracker: updatedTracker
    }
}

export const updateTrackerFail = () => {
    return {
        type: actionTypes.UPDATE_TRACKER_FAIL
    }
}

// BELOW ACTIONS HANDLE FORM EDIT/SAVE BUTTON FUNCTIONALITY
export const enableFormEdit = () => {
    return {
        type: actionTypes.ENABLE_FORM_EDIT
    }
}