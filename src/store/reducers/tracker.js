import * as actionTypes from '../actions/actionTypes';
import moment from 'moment';

const initialState = {
    month: moment().format("MMM YYYY"),
    currentUser: null,
    userUrl: null,
    myTrackerData: {},
    teamTrackerData: {},
    loading: false,
    dataSaved: false,
    error: null,
    editable: false,
    updatedTracker: {
        aName: null,
        bTeamName: null, 
        hAchievements: null,
        cDate: null,
        gFbOnManager: null,
        fMemberComments: null,
        iManagerComments: null,
        dMemberAgenda: null,
        eManagerAgenda: null,
    },
    inputForm: {},
    emptyTracker: {
        aName: null,
        bTeamName: null, 
        hAchievements: null,
        cDate: null,
        gFbOnManager: null,
        fMemberComments: null,
        iManagerComments: null,
        dMemberAgenda: null,
        eManagerAgenda: null,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_DATA:
            console.log('GET_USER_DATA')
            return {
                ...state,
                currentUser: action.currentUser,
                userUrl: action.userUrl,
                month: moment().format("MMM YYYY"),
                dataSaved: false
            }
        case actionTypes.AUTH_LOGOUT_START:
            return {
                ...state,
                month: moment().format("MMM YYYY"),
                currentUser: null,
                userUrl: null,
                myTrackerData: {},
                teamTrackerData: {},
                loading: false,
                dataSaved: false,
                error: null,
                editable: false,
                updatedTracker: {
                    aName: null,
                    bTeamName: null, 
                    hAchievements: null,
                    cDate: null,
                    gFbOnManager: null,
                    fMemberComments: null,
                    iManagerComments: null,
                    dMemberAgenda: null,
                    eManagerAgenda: null,
                },
                inputForm: {},
                emptyTracker: {
                    aName: null,
                    bTeamName: null, 
                    hAchievements: null,
                    cDate: null,
                    gFbOnManager: null,
                    fMemberComments: null,
                    iManagerComments: null,
                    dMemberAgenda: null,
                    eManagerAgenda: null,
                }
            }
        case actionTypes.NEXT_MONTH:
            return {
                ...state,
                month: action.month,
                dataSaved: false
            }
        case actionTypes.PREV_MONTH:
            return {
                ...state,
                month: action.month,
                dataSaved: false
            }
        
        case actionTypes.FETCH_TRACKER_START:
            console.log('FETCH_TRACKER_START')
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_TRACKER_SUCCESS:
            console.log('FETCH_TRACKER_SUCCESS')
            let data = {};
            if (action.trackerData) {
                data = action.trackerData
            };
            
            let updatedTeamTracker = null;
            updatedTeamTracker = {
                ...state.teamTrackerData,
                [action.user] : data
            }
           
            return {
                ...state,
                myTrackerData: data,
                teamTrackerData: updatedTeamTracker,
                loading: false
            }
        case actionTypes.FETCH_TRACKER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.FETCH_INPUT_FORM_SUCCESS:
            return {
                ...state,
                inputForm: action.inputForm,
                loading: false
            }
        case actionTypes.FETCH_INPUT_FORM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.UPDATE_TRACKER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.STORE_UPDATED_TRACKER:
            console.log('STORE_UPDATED_TRACKER')
            const nullTracker = {
                ...initialState.emptyTracker
            }

            initialState.updatedTracker = nullTracker // to initialise it for every month
            let currentMonthData = null;
            let enableEditButton = true;
            if (state.myTrackerData) {
                for (let month in state.myTrackerData) {
                    if (month === state.month) {
                        currentMonthData = state.myTrackerData[state.month]
                    }}}

            
            if (currentMonthData !== null) {

                let newTracker = {...initialState.updatedTracker}

                for (let updatedTrackertrackerField in newTracker) {
                    for (let field in currentMonthData) {
                        if (field === updatedTrackertrackerField) {
                            const newTrackerField = currentMonthData[field]
                            newTracker[updatedTrackertrackerField] = newTrackerField
                            initialState.updatedTracker = newTracker
                            enableEditButton = false
                        }
                    }
                }
            } else {
                enableEditButton = true
            }

            return {
                ...state,
                updatedTracker: initialState.updatedTracker,
                editable: enableEditButton
            }
        case actionTypes.UPDATE_TRACKER_SUCCESS:
            console.log('UPDATE_TRACKER_SUCCESS')
            let updatedTrackerData = {...state.myTrackerData}
            let updatedTrackerDataMonth = {...state.myTrackerData[state.month]}
            updatedTrackerDataMonth = action.updatedTracker
            updatedTrackerData[state.month] = updatedTrackerDataMonth
            return {
                ...state,
                myTrackerData: updatedTrackerData,
                loading: false,
                editable: false,
                dataSaved: true
            }
        case actionTypes.UPDATE_TRACKER_FAIL:
            return {
                ...state,
                loading: false,
                dataSaved: false
            }
        case actionTypes.INPUT_CHANGED:
            console.log('INPUT_CHANGED')
            const newTracker = initialState.updatedTracker 

            for (let field in newTracker) {
                if (action.updatedField === field) {
                    newTracker[field] = action.updatedValue 
                    }}
            return {
                ...state,
                updatedTracker: newTracker
            }
        default: 
            return state;
        case actionTypes.ENABLE_FORM_EDIT:
            return {
                ...state,
                editable: !state.editable,
                dataSaved: false
            }
        case actionTypes.CLEANUP_TRACKER_REDUCER:
            return {
                ...state,
                month: null,
                currentUser: null,
                userUrl: null,
                myTrackerData: {},
                loading: false,
                dataSaved: false,
                error: null,
                editable: false,
                updatedTracker: {
                    aName: null,
                    bTeamName: null, 
                    hAchievements: null,
                    cDate: null,
                    gFbOnManager: null,
                    fMemberComments: null,
                    iManagerComments: null,
                    dMemberAgenda: null,
                    eManagerAgenda: null,
                },
                inputForm: {},
                emptyTracker: {
                    aName: null,
                    bTeamName: null, 
                    hAchievements: null,
                    cDate: null,
                    gFbOnManager: null,
                    fMemberComments: null,
                    iManagerComments: null,
                    dMemberAgenda: null,
                    eManagerAgenda: null,
                }
            }
    }
};

export default reducer;