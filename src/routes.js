import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Alerts from './containers/Alerts';
import Silences from './containers/Silences';
import SilencesDetail from './containers/SilencesDetail'
import SilencesNew from './containers/SilencesNew';
import Status from './containers/Status';
import Layout from './containers/layout/layout';
import EnterPanel from './containers/EnterPanel';
import ResouceNotFound from './components/widgets/ResouceNotFound'
const Routes = () =>{
    return (
        <Switch>
            <Route path="/enter" exact component={Layout({Content:EnterPanel})}/>
            <Route path="/" exact component={Layout({Content:Alerts})}/>
            <Route path="/alerts" exact component={Layout({Content:Alerts})}/>
            <Route path="/silences" exact component={Layout({Content:Silences})}/>
            <Route path="/silence/:id" exact component={Layout({Content:SilencesDetail})}/>
            <Route path="/silences/new" exact component={Layout({Content:SilencesNew})}/>
            <Route path="/silences/:id/edit" exact component={Layout({Content:SilencesNew})}/>
            <Route path="/status" exact component={Layout({Content:Status})}/>
            <Route path="*" component={Layout({Content:ResouceNotFound})}/>
        </Switch>
    )
}

export default Routes;
