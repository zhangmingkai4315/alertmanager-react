import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Alerts from './containers/Alerts';
import Silences from './containers/Silences';
import SilencesDetail from './containers/SilencesDetail'
import SilencesNew from './containers/SilencesNew';
import Status from './containers/Status';
import Layout from './containers/layout';

const Routes = () =>{
    return (
        <Switch>
            <Route path="/alerts" exact component={Layout({Content:Alerts})}/>
            <Route path="/silences" exact component={Layout({Content:Silences})}/>
            <Route path="/silence/:id" exact component={Layout({Content:SilencesDetail})}/>
            <Route path="/silences/new" exact component={Layout({Content:SilencesNew})}/>
            <Route path="/silences/:id/edit" exact component={Layout({Content:SilencesNew})}/>
            <Route path="/status" exact component={Layout({Content:Status})}/>
            <Route path="*" component={Layout({Content:Alerts})}/>
        </Switch>
    )
}

export default Routes;
