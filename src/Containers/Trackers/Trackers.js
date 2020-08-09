import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Tracker from './Tracker/Tracker';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from  './Trackers.module.css'
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

class Trackers extends Component {
    state = {
        userName: null
    }

    componentDidMount () {
        console.log('component mounted main')
        let user = null;
        let userN = null;
        if (this.props.location.state) {
            user = this.props.location.state.memberId.toLowerCase();
            userN = this.props.location.state.memberName;
        } else {
            user = this.props.memberId;
            userN = this.props.memberName;
            console.log('else me gaya ')
        }
        this.setState({userName: userN})
        const userUrl = '/TeamMembers/' + user + '.json';
        this.props.onFetchingTracker(user, userUrl, this.props.token)
        // this.props.storeCurrentTracker();
        this.props.onSetUserData(user, userUrl);
        
    }

    decreaseMonth = () => {
        //no need to clone the state because the state directly needs to be changed here
        const prevMonth = moment(this.props.newMonth).subtract(1, 'months');
        const previousMonth = moment(prevMonth).format("MMM YYYY");
        this.props.onDecreaseMonth(previousMonth);
        this.props.storeUpdatedTracker();
        
    }
 
    increaseMonth = () => {

        const futureMonth = moment(this.props.newMonth).add(1, 'months');
        const nextMonth = moment(futureMonth).format("MMM YYYY");
        this.props.onIncreaseMonth(nextMonth);
        this.props.storeUpdatedTracker();
    }

    render() {
        console.log('Trackers render cycle start')

        let tracker = null;
        // if (this.props.trackerData !== {}) {
        // FIRST POPULATE WITH FORM WITH VALID VALUES (IF ANY)
            tracker = <Tracker currentMonthTrackerData={this.props.trackerData[this.props.newMonth]}
                        key={Math.random() * Math.random()}/>;
        
        // NOW POPULATE WITH FORM WITH HAVING NULL VALUES (IF ANY)
            tracker = <Tracker currentMonthTrackerData={this.props.inputForm}
                        key={Math.random() * Math.random()}/>;
        // }


        if (this.props.loading) { 
           tracker = <div className={styles.Loaderpage}>
                        <Spinner/>  
                    </div>
        }
        let user = this.state.userName;
        if (!this.state.userName) {
            user = this.props.managerName
        }

        let authRedirect = null;
        if (!this.props.token) {
            authRedirect = <Redirect to='/'/>
        }

        return(
            <div>
                {authRedirect} 
                <h2 className={styles.WelcomeMessage}> 1-1 Tracker &rarr; {user} </h2> 
                <p style={{fontWeight: 'bold'}}>Select Month</p>
                <Button btnType="Danger" clicked={this.decreaseMonth}>{'<'}</Button>
                <span style={{fontWeight: 'bold', fontSize: '1.1rem'}}> {this.props.newMonth} </span>
                <Button btnType="Danger" clicked={this.increaseMonth}>{'>'}</Button><br/><br/>
                <span className={styles.SaveMessage}> {this.props.isDataSaved ? 'Data Saved Successfully!' : null} </span>
                <div className={styles.Tracker}>
                    {tracker}
                </div>
                <span className={styles.SaveMessage}> {this.props.isDataSaved ? 'Data Saved Successfully!' : null} </span>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        memberId: state.auth.memberId,
        managerId: state.auth.managerId,
        newMonth: state.track.month,
        memberName: state.auth.memberName,
        trackerData: state.track.myTrackerData,
        loading: state.track.loading,
        inputForm: state.track.inputForm,
        updatedTracker: state.track.updatedTracker,
        isDataSaved: state.track.dataSaved,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetUserData: (user, userUrl) => dispatch(actions.getUserData(user, userUrl)),
        onIncreaseMonth: (month) => dispatch(actions.nextMonth(month)),
        onDecreaseMonth: (month) => dispatch(actions.prevMonth(month)),
        onFetchingTracker: (user, userUrl, token) => dispatch(actions.fetchTracker(user, userUrl, token)),
        storeUpdatedTracker: () => dispatch(actions.storeUpdatedTracker())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trackers);


