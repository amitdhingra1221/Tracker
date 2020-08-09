import React from 'react';
import styles from './Button.module.css';

const button = (props) => (
    <button 
        className={[styles.Button, styles[props.btnType]].join(' ')}
        //  it has be string, and since it was an array, 
        // we used join to convert to string
        disabled={props.disabled} onClick={props.clicked}>
        {props.children}
    </button>
);

export default button;