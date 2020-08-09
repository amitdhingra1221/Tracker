import React from 'react';
import styles from './Input.module.css';
// import Loader from '../../../../components/UI/Loader/Loader';

const input = (props) => {

    let inputElement = null;
    const inputClass = [styles.InputElement]

    if (props.inValid && props.touched) {
        inputClass.push(styles.Invalid);
    }

    switch(props.elementType) {
        case ('input'):
            inputElement = <input className={inputClass.join(' ')}
                            {...props.elementConfig} 
                            defaultValue={props.value}
                            onInput={props.changed}
                            disabled={!props.editable}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClass.join(' ')}
                            {...props.elementConfig} 
                            defaultValue={props.value}
                            onInput={props.changed}
                            disabled={!props.editable}/>;
            break;
        case ('select'):
            inputElement = <select className={inputClass.join(' ')}
                            {...props.elementConfig} 
                            defaultValue={props.value}
                            onInput={props.changed}
                            disabled={!props.editable}/>;
            break;   
        default:
            inputElement = <input className={inputClass.join(' ')}
                            {...props.elementConfig} 
                            defaultValue={props.value}
                            onInput={props.changed}
                            disabled={!props.editable}/>;
    }

    // let validationError = null;
    //     if (props.inValid && props.touched) {
    //         validationError = <p style={{color: "red",padding:"0px"}}>Please enter a valid value!</p>;
    // }

    // let validationOk = null;
    //     if (props.inValid && props.touched) {
    //         validationOk = <p style={{color: "red",padding:"0px"}}>Please enter a valid value!</p>;
    // }
    // let validationMsg = null; 
    // if (!props.emailValidity) {
    //     validationMsg = null;
    // };
    
    // if (props.emailTouched && !props.emailValidity) {
    //     validationMsg = <Loader/>
            
    // };

    // if (props.emailTouched && props.emailValidity ) { 
    //     validationMsg = (
    //         <p style={{color: "green",padding:"0px"}}> Email Ok! </p>
    //     );
    // };

    return(
        // <div className={styles.Input}>
        <div>
            <label className={styles.Label}> {props.label} </label>
            {inputElement}
            {/* {inputElement} {validationMsg}  */}
                {/* {validationError} */}
        </div>
    )
}

export default input;