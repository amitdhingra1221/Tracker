import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink, Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import Trackers from '../Trackers/Trackers';
import styles from './TeamMembers.module.css';

class TeamMembers extends Component {
    state = {
        loading: true,
        members: [],
        memberId: null
    }

    componentDidMount() {
        console.log('component mounted TeamMembers')
        const memberObj = Object.keys(this.props.team).map(memberName => {
             return {
                 name: this.props.team[memberName].Name,
                 designation:this.props.team[memberName].Position,
                 id: memberName
                }
            })
            this.setState({loading: false, members: memberObj})
    }

    viewTrackerHandler = (id) => {
        console.log('clickhandler ' + id)
        this.setState({memberId: id})
    }

    render(){
        let authRedirect = null;
        if (!this.props.token) {
            authRedirect = <Redirect to='/'/>
        }

        let teamMembers = null;
        if (this.state.loading) { 
            teamMembers = <Spinner className={styles.Spinner}/>;
        } 

        const filteredMembers = this.state.members.filter((data) => {
            if (this.props.searchValue == null)
                return data
            else if (data.name.toLowerCase().includes(this.props.searchValue.toLowerCase()) ||
                    data.designation.toLowerCase().includes(this.props.searchValue.toLowerCase()))
                return data
        })
        console.log(filteredMembers)
        console.log('filteredMembers')

        

        teamMembers = Object.values(filteredMembers).map(mName => {
            return (
                <NavLink key={mName.id} to={{
                    pathname: '/tracker',
                    state: { memberId: mName.id,
                            memberName: mName.name}
                    }}> 
                    <div className={styles.Members}  
                        onClick={() => this.viewTrackerHandler(mName.id)}>                    
                        <h4 style={{marginTop: '6px'}}> {mName.name} </h4>
                        <p style={{marginBottom: '5px', marginTop: '-10px',
                                    fontSize: "0.8rem"}}> - {mName.designation}</p>
                    </div>
                </NavLink>)
        })

        if (filteredMembers.length === 0) { 
            teamMembers = <p style={{textAlign: 'center'}}> No Results! </p>;
        };
        
        let clickMessage = null;
        if (filteredMembers.length !== 0) { 
            clickMessage = <p style={{marginLeft: '50px', marginTop: '10px', textAlign: "center", color: "#003c72"}}> (Click to view tracker) </p>
        } else {
            clickMessage = null;
        };
            
        return(
            
            <div className={styles.TeamPage}>
                {authRedirect} 
                <h1 className={styles.WelcomeMessage}> 
                    ECS-DM Team Members
                </h1>
                {clickMessage}
                
                {teamMembers} 
                {/* <Route path={this.props.match.url + '/:id'} */}
                <Route path="/tracker"
                        render={(props) => (<Trackers 
                        user={this.state.memberId} 
                        {...props}/>)}
                />
            </div>
        );
    }
}

const mapStateToprops = state => {
    return {
        token: state.auth.token,
        memberId: state.auth.memberId,
        team: state.auth.teamMembers,
        searchValue: state.auth.searchString
    }; 
};

export default connect(mapStateToprops)(TeamMembers);

