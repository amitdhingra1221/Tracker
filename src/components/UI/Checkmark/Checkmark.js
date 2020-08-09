import React from 'react';
import styles from './Checkmark.module.css';

const checkmark = () => {
    const checkmarkClass = [styles.checkmark, styles.draw]
    return (
        // <div className={checkmark-circle}>Loading...</div>
        <div className={styles.CheckmarkCircle}>
        <div className={styles.background}></div>
        <div className={checkmarkClass.join(' ')}></div>
        </div>
    );
}


export default checkmark;