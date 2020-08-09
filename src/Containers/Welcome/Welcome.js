import React , { Component } from 'react';
import {NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import Button from '../../components/UI/Button/Button';
import teams from '../../Assets/teams.png';
import task from '../../Assets/task.png';
import user from '../../Assets/user.png'
import styles from '../Welcome/Welcome.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Welcome extends Component {
    
    componentDidMount () {
        this.props.onWelcomeScreen(this.props.memberId, this.props.isAuthenticated)
    }

    getTeamInfo = () => {
        this.props.history.push('/teamInfo')
    }

    get1on1Info = () => {
        this.props.history.push('/tracker')
    }

    render() {
        console.log('rendering Welcome page')
        let welcomeHeader = null;
        let welcomeBody = null;
        let authRedirect = null;
        if (!this.props.isAuthenticated) {
            authRedirect = <Redirect to='/'/>
            // authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        if (this.props.isManager && this.props.managerName) {
        welcomeHeader = <span>
                            <img src={user} alt="Teams icon" className={styles.UserIcon}/>
                            <h1 className={styles.WelcomeMessage}>
                            {/* // style={{textAlign: "left",padding:"20px"}}>  */}
                                    Welcome! {this.props.managerName} </h1>
                        </span>;
        welcomeBody = <ul className={styles.List}>
                            <li><NavLink 
                                    to="/teamInfo">
                                    {/* // activeClassName={styles.MyActive}
                                    activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'none' */}
                                    <img src={teams} alt="Teams icon" className={styles.Icons}/>
                                    <span className={styles.CaptionTeam}>My Team</span>
                                </NavLink>
                            </li>
                            <li><NavLink to="/tracker">
                                        <img src={task} alt="Tracker icon" className={styles.Icons}/>
                                        <span className={styles.CaptionTracker}>My Tracker</span>
                                </NavLink>
                            </li>
                    </ul>
        } else {
            welcomeBody = 
                        <div className={styles.Loaderpage}>
                            <Spinner/>  
                        </div>
        }

        if (this.props.memberName && !this.props.isManager) {
            welcomeHeader = <span>
                                <img src={user} alt="Teams icon" className={styles.UserIcon}/>
                                <h1 className={styles.WelcomeMessage}>
                                {/* // style={{textAlign: "left",padding:"20px"}}>  */}
                                        Welcome! {this.props.memberName} </h1>
                            </span>;
            welcomeBody = <ul className={styles.List}>
                                <li><NavLink to="/tracker">
                                            <img src={task} alt="Tracker icon" className={styles.Icons}/>
                                            <span className={styles.CaptionTracker}>My Tracker</span>
                                    </NavLink>
                                </li>
                        </ul>
        } 

        
        return(
            <div>
                {authRedirect}
                {welcomeHeader}
                {welcomeBody}
                {/* <Switch> */}
                    {/* <Route path="/teamInfo" exact component={TeamMembers}/>
                    <Route path="/tracker" exact component={Trackers}/>    */}
                    {/* <Redirect from='/' to='/posts'/> */}
        {/* If now we want to open same component from '/' only path, 
        we can add another Route path like above. Or alternatively use 
        Redirect object provided by react-router-dom. Please note if
        inside a switch statement, only then the from parameter in 
        Redirect can be used. outside its not available*/}
                {/* </Switch> */}
                {/* <Button 
                    btnType="Success"
                    clicked={this.getTeamInfo}>My Team</Button>
                <Button 
                    btnType="Success"
                    clicked={this.get1on1Info}>My 1-1 </Button> */}
            </div>
            
        );
    }
}

const mapStateToprops = state => {
    return {
        memberId: state.auth.memberId,
        memberName: state.auth.memberName,
        managerId: state.auth.managerId,
        managerName: state.auth.managerName,
        isAuthenticated: state.auth.token,
        isManager: state.auth.isManager
    };
};

const mapDispatchToprops = dispatch => {
    return {
        onWelcomeScreen: (memberId, token) => dispatch(actions.fetchUserDetails(memberId, token))
    };
};

export default connect(mapStateToprops, mapDispatchToprops)(Welcome);