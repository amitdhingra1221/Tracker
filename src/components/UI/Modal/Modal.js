import React, { Component, Fragment} from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
        // next state of show unequal to previous state of show
        // i.e only if show property changes then only it will be 
        // re-rendered
        // or as below
        // if (nextProps.show !== this.props.show) {
        //     return true;
        // }
        // OR condition - here we are passing a new child component
        // i.e. spinner instead of order summary, so that also needs to be
        // taken care
    }

    componentDidUpdate () {
        console.log('Modal will Update')
    }

    render() {
        return(
            <React.Fragment>
                <Backdrop show={this.props.show} 
                        clicked={this.props.modalClosed}/>
                <div 
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'transalateY(-10vh)',
                        opacity: this.props.show? '1' : '0'}}>
                        {/* this is inline style , 
                            vh means viewport height (special property)*/}
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }  
}

export default Modal;