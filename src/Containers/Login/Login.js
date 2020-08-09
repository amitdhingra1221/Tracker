import React , { Component } from 'react';
import styles from './Login.module.css';

class Login extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    signInHandler = () => {
        this.props.history.push('/welcome');
    }

    render() {
        return (
            <div>
                
                <form className={styles.Form}>
                    <h3>ACCOUNT LOGIN</h3>
                    <label className={styles.Label}> Username  </label>
                    <input className={styles.Input} type="text" name="username"/><br/>
                    <label className={styles.Label}> Password   </label>
                    <input className={styles.Input} type="text" name="pwd"/><br/>
                    <button className={styles.SignIn}onClick={this.signInHandler}> Sign In </button>  
                    <button className={styles.ForgotPw}onClick={this.signInHandler}> Forgot Password? </button>  
                </form>
            </div>
        );
    }
};

export default Login;