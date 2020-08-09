import React from 'react';
import styles from './Spinner.module.css';

const spinner = () => (
    <div className={styles.Spinner}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
    </div>
);

export default spinner;
