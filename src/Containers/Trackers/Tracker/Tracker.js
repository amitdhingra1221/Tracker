import React , { Component }from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from './Input/Input';
// import axios from '../../../axios-teamdata';
import * as actions from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';
// import styles from '../../Trackers/Trackers.module.css';

class Tracker extends Component {
    state = {
        trackerForm: {
            aName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter name',
                },
                value: '',
                label: 'Name',
            },
            bTeamName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter team name'
                },
                value: '',
                label: 'Team Name'
            },
            hAchievements: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter achievments',
                    rows: '5',
                    columns: '20'
                },
                value: '',
                label: 'Major Achievements'
            },
            cDate: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter 1-1 meeting date'
                },
                value: '',
                label: '1-1 Date'
            },
            gFbOnManager: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your feedback on manager',
                    rows: '5',
                    columns: '20'
                },
                value: '',
                label: 'Feedback on Manager'
            },
            fMemberComments: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your comments',
                    rows: '5',
                    columns: '20'
                },
                value: '',
                label: 'Comments by Team Member'
            },
            iManagerComments: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your comments',
                    rows: '5',
                    columns: '20'
                },
                value: '',
                label: 'Comments by Manager'
            },
            dMemberAgenda: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter agenda',
                    rows: '5',
                    columns: '20'
                },
                value: '',
                label: 'Agenda by Team member'
            },
            eManagerAgenda: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter agenda',
                    rows: '5',
                    columns: '20'
                },
                value: '',
                label: 'Addional Agenda by Manager'
            },
        },
    }

    componentDidMount () {
        console.log('Tracker component mounted')

        const updatedTrackerForm = {
            ...this.state.trackerForm
        } // iske ander name, date, achievements etc fields ka clone hai 
        // const updatedTrackerElement = {
        //     ...this.state.trackerForm[this.props.field]
        // } // iske ander name k ander wali fields ka clone hai

        for (let trackerField in this.props.updatedTracker) {

            const updatedTrackerElement = {
                ...this.state.trackerForm[trackerField]
            }

            for (let field in updatedTrackerForm) {
                if (field === trackerField) {
                    updatedTrackerElement.value = this.props.updatedTracker[trackerField]
                    updatedTrackerForm[field] = updatedTrackerElement
                }
            }
        }
        this.setState({trackerForm: updatedTrackerForm}) 
    } 

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedTrackerForm = {
            ...this.state.trackerForm
        }; 
// this is to make clone of first object i.e key value pairs of name, street etc
        const updatedFormElement = {
            ...this.state.trackerForm[inputIdentifier]
        };
// this is to make clone of second object i.e key value pairs of nested objects like elementType, value etc
// We are only interested till the value field hance not coning the other deeper objects

        updatedFormElement.value = event.target.value
        updatedTrackerForm[inputIdentifier] = updatedFormElement;
        console.log(inputIdentifier, updatedFormElement.value)
        this.props.onChangingInput(inputIdentifier, updatedFormElement.value)
    }

    updateDatahandler = () => {
        this.props.onSavingTracker(this.props.updatedTracker, this.props.currentUser, 
                                    this.props.newMonth, this.props.token);
    };

    makeFormEditableHandler = () => {
        this.props.onEditingForm();
    };

    render(){

        console.log('Rendering Tracker')

        let editButton = null;
        let saveButton = null;
        let cancelButton = null;
        let authRedirect = null;
        if (!this.props.token) {
            authRedirect = <Redirect to='/'/>
        }

        editButton = <Button btnType="Success" 
                            disabled={this.props.editable} 
                            clicked={this.makeFormEditableHandler}>EDIT</Button>;
                            
        cancelButton = <Button btnType="Success" 
                            disabled={!this.props.editable} 
                            clicked={this.makeFormEditableHandler}>CANCEL</Button>;

        saveButton = <Button btnType="Success" 
                            disabled={!this.props.editable} 
                            clicked={this.updateDatahandler}>SAVE</Button>;
                            
        const trackerFormArray = [];

        for (let trackerField in this.props.currentMonthTrackerData) {
            for (let fieldName in this.state.trackerForm) {
                if (trackerField === fieldName) {
                    trackerFormArray.push({
                        id: fieldName,
                        config: this.state.trackerForm[fieldName]
                    });
                }
            }
        }
        
        let form = <form >
                        {trackerFormArray.map(formElement => 
                            <Input key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    label={formElement.config.label}
                                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                    editable={this.props.editable}
                            />
                        )}
                    </form>

        return(
            <React.Fragment>
                {authRedirect}
                {cancelButton} {editButton}
                {form}
                {cancelButton} {saveButton}
            </React.Fragment>
        )
    }
} 

const mapStateToProps = state => {
    return {
        editable: state.track.editable,
        updatedTracker: state.track.updatedTracker,
        newMonth: state.track.month,
        currentUser: state.track.currentUser,
        userUrl: state.track.userUrl,
        token: state.auth.token

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangingInput: (field, value) => dispatch(actions.inputChanged(field, value)),
        onSavingTracker: (updatedTracker, user, month, token) => dispatch(actions.updateTracker(updatedTracker, user, month, token)),
        onEditingForm: () => dispatch(actions.enableFormEdit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);


