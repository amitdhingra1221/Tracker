import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Loaderpage.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';


class Loaderpage extends Component {
    state = {
        abcd: null
    }

    componentDidMount () {
        this.props.onAuth(this.props.email,this.props.password,this.props.isSignUp);
    }

    continueLoginHandler = () => {
        console.log('continueLogin')
        // this.props.clearCredentials();
        this.props.history.replace('/welcome')
    }

    render () {
        let signUpLoader = null;
        let spinner = <Spinner/>
        if (this.props.isSignUp && this.props.userSignedUp) {
            signUpLoader = <div>
                                <h3 style={{color: "green",padding:"0px"}}> Sign Up Successfull! </h3>
                                <Button btnType="Continue" 
                                        clicked={this.continueLoginHandler}>Click to Sign-in</Button>
                            </div>;
            spinner = null;             
        };

        let authRedirect = null;
        if (this.props.isAuthenticated && !this.props.isSignUp && !this.props.userSignedUp) {
            authRedirect = <Redirect to='/welcome'/>
        }

        return (
            <div className={styles.Loaderpage}>
                {authRedirect} 
                {signUpLoader} 
                {spinner}       
             </div>
        );
    };
};

const mapStateToprops = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        isSignUp: state.auth.isSignUp,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token,
        userSignedUp: state.auth.userSignedUp
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pw, isSignup) => dispatch(actions.auth(email,pw,isSignup)),
        clearCredentials: () => dispatch(actions.authLogout())
    }
}

export default connect(mapStateToprops, mapDispatchToProps)(Loaderpage);