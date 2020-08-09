import React , { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../Layout/Layout.module.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { authLogout, search } from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';

class Layout extends Component {

    userLogouthandler = () => {
        this.props.onLogoutClick();
    }

    searchHandler = (event) => {
        console.log('search handler')
        console.log('event.target.value ' + event.target.value)
        this.props.onSearching(event.target.value);
    }

    render() {
        return(
            <div className={styles.App}>
                
                {this.props.isAuthenticated && !this.props.isSignedUp ? <Button btnType="Logout" clicked={this.userLogouthandler}>LOGOUT</Button> : null}
                {this.props.isAuthenticated && !this.props.isSignedUp ? 
                <input className={styles.Input} type="text" onChange={this.searchHandler} placeholder="Search.."></input> : null}
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token,
        isSignedUp: state.auth.userSignedUp
    };
};

const mapDispatchToProps =  dispatch => {
    return {
        onLogoutClick: () => dispatch(authLogout()),
        onSearching: (searchValue) => dispatch(search(searchValue))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);