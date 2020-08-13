import React from 'react';
import styles from './Input.module.css';

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

    return(
        <div>
            <label className={styles.Label}> {props.label} </label>
            {inputElement}
        </div>
    )
}

export default input;