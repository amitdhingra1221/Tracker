import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../Containers/Trackers/Tracker/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Loader from '../../components/UI/Loader/Loader';
import Checkmark from '../../components/UI/Checkmark/Checkmark';

class Auth extends Component {
    state = { 
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter TSYS email id'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter password'
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
        signUp: false,
        redirect: false
    }
   
    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= 6 && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= 5 && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
        
    }

    inputChangedHandler = (event, controlName) => {

        if (event.target.value.length !== 0) {
            const updatedControls = {
                ...this.state.controls,
    // the below will overwrite the values of the field received in this handlder
               [controlName] : {
                   ...this.state.controls[controlName],
                   value: event.target.value,
                   valid: this.checkValidity(event.target.value, 
                   this.state.controls[controlName].validation),
                touched: true
               }
            };
            if (controlName === "email") {
                this.props.onCheckEmailAuth(updatedControls.email.value) 
            }
            this.setState({ controls: updatedControls})
        } else {
            const updatedControls = {
                ...this.state.controls,
    // the below will overwrite the values of the field received in this handlder
               [controlName] : {
                   ...this.state.controls[controlName],
                   value: '',
                   valid: false,
                    touched: false
               }
            };
            if (controlName === "email") {
                this.props.onCheckEmailAuth(updatedControls.email.value) 
            }
            this.setState({ controls: updatedControls})
        }
    }

    // switchAuthModeHandler = () => {
    //     this.setState(prevState => {
    //         return {isSignup: !prevState.isSignup};
    //     })
    // }

    signInHandler = (event) => {
        event.preventDefault();
        this.props.storeCredentials(this.state.controls.email.value,this.state.controls.password.value,
                                    false)
        this.setState({ signUp: false, redirect: true})
        this.props.history.replace('/signIn')
    }

    signUpHandler = (event) => {
        console.log('signup Handler')
        event.preventDefault();
        this.props.storeCredentials(this.state.controls.email.value,this.state.controls.password.value,
                                    true)
        this.setState({ signUp: true, redirect: true})
        this.props.history.replace('/signUp')
    }

    render () {
        console.log('rendering AUTH')
        const formElementsArray = [];

        for ( let key in this.state.controls ) {
            formElementsArray.push({
                id: key, 
                // left side of orderform object i.e properties like name, email, country, street etc
                config: this.state.controls[key] 
                // right side i.e properties like elementType, elementConfig 
                // value, validation etc. 
               });
            }

        let form = 
            formElementsArray.map((formElement,i) => {
                return <Input 
                    key = {formElement.id + i}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    inValid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    editable="false"
                    emailValidity={this.props.isEmailIdValid}
                    emailTouched={this.state.controls.email.touched}/>
            });

        
        let validationMsg = null;
        if (!this.props.isEmailIdValid) {
            validationMsg = null;
        };

        if (this.state.controls.email.touched && !this.props.isEmailIdValid) {
            validationMsg = 
            <div> 
                <span className={styles.Loader}><Loader/> </span>
            </div>
        };

        if (this.state.controls.email.touched && this.props.isEmailIdValid) { 
            validationMsg = (
                <div style={{display: "inline-block", position: "absolute", marginLeft: "180px", marginTop: "-105px"}}>
                                <Checkmark/>
                            </div>
            );
        };
        
        let errorMessage = null
        if (this.props.error) { 
            errorMessage = (
                <p style={{color: "red",padding:"0px"}}> {this.props.error.message} </p>
            )
        }

        return  (
            <div>
                {errorMessage} 
                {/* <form onSubmit={this.submitHandler}> */}
                <form className={styles.Form}>
                    <h3>ACCOUNT LOGIN</h3>
                    {form} 
                    {validationMsg}
                    {/* {form} {emailErrorMessage}  */}
                    <p style={{display: "block", 
                                fontSize: "0.75rem",
                                marginTop: "0px",
                                textAlign: "left",
                                paddingLeft: "10px",
                                color: "inherit"}}>(Password should be of minimum 6 characters)</p>
                    <p style={{display: "inline"}}>New user?</p>
                    <Button tabindex="0" btnType="Login" disabled={!this.props.isEmailIdValid}
                            clicked={this.signUpHandler}>Sign Up</Button>
                    <p style={{display: "inline-block"}}>or</p>
                    <Button tabindex="0" btnType="Login" disabled={!this.props.isEmailIdValid} 
                            clicked={this.signInHandler}>Sign In</Button>
                    
                </form>
            </div>
        );
    };
}


const mapStateToprops = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isEmailIdValid: state.auth.isEmailIdValid,
        touched: state.auth.touched,
    };
};

const mapDispatchToprops = dispatch => {
    return {
        storeCredentials: (email, pw, isSignup) => dispatch(actions.storeCredentials(email,pw,isSignup)),
        onCheckEmailAuth: (emailId) => dispatch(actions.checkEmail(emailId))
        };
};


export default connect (mapStateToprops, mapDispatchToprops)(Auth);

