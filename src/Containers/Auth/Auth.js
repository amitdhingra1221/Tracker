import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
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
                {/* <p style={{display: "block", position: "absolute", marginTop: "-65px", fontSize: "0.75rem",textAlign: "center",}}>
                                Please enter a valid TSYS email id 
                </p> */}
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

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import Input from '../../Containers/Trackers/Tracker/Input/Input';
// import Button from '../../components/UI/Button/Button';
// import styles from './Auth.module.css';
// import * as actions from '../../store/actions/index';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import Modal from '../../components/UI/Modal/Modal';

// class Auth extends Component {
//     state = { 
//         controls: {
//             email: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'email',
//                     placeholder: 'TSYS email id'
//                 },
//                 value: '',
//                 validation: {
//                     required: true,
//                     isEmail: false
//                 },
//                 valid: false,
//                 touched: false,
//                 // finalValidity: false
//             },
//             password: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'password',
//                     placeholder: 'password'
//                 },
//                 value: '',
//                 validation: {
//                     required: true,
//                     minLength: 6
//                 },
//                 valid: false,
//                 touched: false
//             }
//         },
//         isSignup: false
//         // reLoad: false
//     }
   
//     checkValidity(value, rules) {
//         let isValid = true;

//         if (rules.required) {
//             isValid = value.trim() !== '' && isValid
//         }

//         if (rules.minLength) {
//             isValid = value.length >= 6 && isValid
//         }

//         if (rules.maxLength) {
//             isValid = value.length <= 5 && isValid
//         }

//         if ( rules.isEmail ) {
//             const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//             isValid = pattern.test( value ) && isValid
//         }

//         if ( rules.isNumeric ) {
//             const pattern = /^\d+$/;
//             isValid = pattern.test( value ) && isValid
//         }

//         return isValid;
        
//     }

//     inputChangedHandler = (event, controlName) => {

//         if (event.target.value.length !== 0) {
//             // console.log('inputChangedHandler value > 0')
//             const updatedControls = {
//                 ...this.state.controls,
//     // the below will overwrite the values of the field received in this handlder
//                [controlName] : {
//                    ...this.state.controls[controlName],
//                    value: event.target.value,
//                    valid: this.checkValidity(event.target.value, 
//                    this.state.controls[controlName].validation),
//                 touched: true
//                }
//             };
//             if (controlName === "email") {
//                 this.props.onCheckEmailAuth(updatedControls.email.value) 
//             }
//             this.setState({ controls: updatedControls})
//         } else {
//             // console.log('inputChangedHandler value = 0')
//             const updatedControls = {
//                 ...this.state.controls,
//     // the below will overwrite the values of the field received in this handlder
//                [controlName] : {
//                    ...this.state.controls[controlName],
//                    value: '',
//                    valid: false,
//                     touched: false
//                }
//             };
//             if (controlName === "email") {
//                 this.props.onCheckEmailAuth(updatedControls.email.value) 
//             }
//             this.setState({ controls: updatedControls})
//         }
//     }

//     // switchAuthModeHandler = () => {
//     //     this.setState(prevState => {
//     //         return {isSignup: !prevState.isSignup};
//     //     })
//     // }

//     signInHandler = (event) => {
//         event.preventDefault();
//         this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,
//                              false);
//     }

//     signUpHandler = (event) => {
//         console.log('signup Handler')
//         event.preventDefault();
//         this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,
//                             true);
//         //  this.setState({isSignup: true});
//          const initialControls = {
//             ...this.state.controls,
//             email : {
//                 ...this.state.controls.email,
//                 value: '',
//                 valid: false,
//                 touched: false
//             },
//             password : {
//                 ...this.state.controls.password,
//                 value: '',
//                 valid: false,
//                 touched: false
//             }
//         };
//         console.log('initialControls')
//         console.log(initialControls)
//         this.setState({controls: initialControls, isSignup: true});
//         console.log('controls')
//         console.log(this.state.controls)
//     }

//     continueLoginHandler = () => {
//         console.log('continueLogin')
//         const initialControls = {
//             ...this.state.controls,
//             email : {
//                 ...this.state.controls.email,
//                 value: '',
//                 valid: false,
//                 touched: false
//             },
//             password : {
//                 ...this.state.controls.password,
//                 value: '',
//                 valid: false,
//                 touched: false
//             }
//         };
//         console.log('initialControls')
//         console.log(initialControls)
//         this.setState({controls: initialControls, isSignup: false});
//         // this.props.onContinueClick();
//     }
//         // console.log('continueLoginHandler')
//         // this.setState({isSignup: false, reLoad: true});
//         // console.log(this.props)
//         // this.props.history.push('/');

//     // purchaseContinuehandler = () => {
//     //             this.props.onInitPurchase();
//     //             this.props.history.push('/checkout');
//     // }

//     render () {
//         console.log('rendering AUTH')
//         const formElementsArray = [];
//         console.log('this.state.controls')
//         console.log(this.state.controls)
//         for ( let key in this.state.controls ) {
//             formElementsArray.push({
//                 id: key, 
//                 // left side of orderform object i.e properties like name, email, country, street etc
//                 config: this.state.controls[key] 
//                 // right side i.e properties like elementType, elementConfig 
//                 // value, validation etc. 
//                });
//             }

//         let authRedirect = null;
//         if (this.props.isAuthenticated && !this.state.isSignup && !this.props.userSignedUp) {
//             authRedirect = <Redirect to='/welcome'/>
//             // authRedirect = <Redirect to={this.props.authRedirectPath}/>
//         }

//         let form = 
//             formElementsArray.map((formElement,i) => {
//                 console.log('form k ander')
//                 console.log(formElement.config.value)
//                 return <Input 
//                     key = {formElement.id + i}
//                     elementType={formElement.config.elementType}
//                     elementConfig={formElement.config.elementConfig}
//                     value={formElement.config.value}
//                     inValid={!formElement.config.valid}
//                     touched={formElement.config.touched}
//                     changed={(event) => this.inputChangedHandler(event, formElement.id)}
//                     editable="false"/>
//             });

//         let signUpLoader = null;
//         if (this.props.loading) {
//             signUpLoader = <Modal show={this.state.isSignup && !this.props.userSignedUp}>
//                                 <Spinner/>
//                             </Modal> 
//         };
        
//         if (this.state.isSignup && this.props.userSignedUp) {
//             // signUpLoader = <Modal show={this.state.isSignup} modalClosed={this.continueLoginHandler}>
//             signUpLoader = <Modal show={this.state.isSignup}>
//                                 <h3 style={{color: "green",padding:"0px"}}> Sign Up Successfull! </h3>
//                                 <Button btnType="Continue" 
//                                         clicked={this.continueLoginHandler}>Continue to Login</Button>
//                             </Modal>
//         };

//         let emailErrorMessage = null; 
//         if (!this.props.isEmailIdValid) {
//             emailErrorMessage = null;
//         };
        
//         if (this.state.controls.email.touched && !this.props.isEmailIdValid) {
//             emailErrorMessage = <p style={{color: "blue",padding:"0px"}}>validating... </p>
//         };

//         if (this.state.controls.email.touched && this.props.isEmailIdValid ) { 
//             emailErrorMessage = (
//                 <p style={{color: "green",padding:"0px"}}> Email Ok! </p>
//             );
//         };
        
//         let errorMessage = null
//         if (this.props.error) { 
//             errorMessage = (
//                 <p style={{color: "red",padding:"0px"}}> {this.props.error.message} </p>
//             )
//         }

//         return  (
//             <div>
//                 {/* <div className={styles.Auth}> */}
//                 {authRedirect}
//                 {errorMessage} 
//                 {signUpLoader}
//                 {/* <form onSubmit={this.submitHandler}> */}
//                 <form className={styles.Form}>
//                     <h3>ACCOUNT LOGIN</h3>
//                     {form} {emailErrorMessage} 
//                     <p style={{display: "inline"}}>New user?</p>
//                     <Button btnType="Login" disabled={!this.props.isEmailIdValid}
//                             clicked={this.signUpHandler}>Sign Up</Button>
//                     <p style={{display: "inline"}}>or</p>
//                     <Button btnType="Login" disabled={!this.props.isEmailIdValid} 
//                             clicked={this.signInHandler}>Sign In</Button>
                    
//                 </form>
//             </div>
//         );
//     };
// }


// const mapStateToprops = state => {
//     return {
//         loading: state.auth.loading,
//         error: state.auth.error,
//         isAuthenticated: state.auth.token,
//         isEmailIdValid: state.auth.isEmailIdValid,
//         touched: state.auth.touched,
//         userSignedUp: state.auth.userSignedUp
//     };
// };

// const mapDispatchToprops = dispatch => {
//     return {
//         onAuth: (email, pw, isSignup) => dispatch(actions.auth(email,pw,isSignup)),
//         onCheckEmailAuth: (emailId) => dispatch(actions.checkEmail(emailId)),
//         onContinueClick: () => dispatch(actions.authLogout())
//         };
// };


// export default connect (mapStateToprops, mapDispatchToprops)(Auth);

