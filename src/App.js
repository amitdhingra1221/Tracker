import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
// import Login from './Containers/Login/Login';
import Welcome from './Containers/Welcome/Welcome';
import TeamMembers from './Containers/TeamMembers/TeamMembers';
import Trackers from './Containers/Trackers/Trackers';
import Auth from './Containers/Auth/Auth';
import Loaderpage from './Containers/Loaderpage/Loaderpage';


class App extends Component {
  render() {
    return (
        <Layout>
            <Switch>
                <Route path="/tracker" component={Trackers}/>
                <Route path="/teamInfo" component={TeamMembers}/>
                <Route path="/welcome" component={Welcome}/>
                <Route path="/signUp" component={Loaderpage}/>
                <Route path="/signIn" component={Loaderpage}/>
                {/* <Route path="/" exact component={Login}/>  */}
                <Route path="/" exact component={Auth}/> 
          </Switch>
        </Layout> 
  )};
};

export default App;
