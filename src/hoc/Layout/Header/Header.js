import React from 'react';
import styles from '../../Layout/Layout.module.css';
import logo from '../../../Assets/logo.png';

const header = () => (
            <header className={styles.Header}>
                {/* <a href="/"> */}
                    <img src={logo} className={styles.Logo} alt="logo" />
                {/* </a> */}
            </header>
);

export default header;