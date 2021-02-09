import React from 'react'
import styles from '../styles/project-style.css';

class ErrorPage extends React.Component {

    render() {
            return <h3 className={styles.errorTitle}>You dont have the rights to access this page .</h3>;
    }
}

export default ErrorPage
