import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Alerts from './containers/Alerts';
import Silences from './containers/Silences';
import Status from './containers/Status';
import Layout from './containers/layout';

const Routes = () =>{
    return (
        <Switch>
            <Route path="/" exact component={Layout({Content:Alerts})}/>
            <Route path="/alerts" exact component={Layout({Content:Alerts})}/>
            <Route path="/silences" exact component={Layout({Content:Silences})}/>
            <Route path="/status" exact component={Layout({Content:Status})}/>
        </Switch>
    )
}

export default Routes;
