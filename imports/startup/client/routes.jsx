import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Accounts, STATES } from 'meteor/std:accounts-ui';
import { NotFound } from '../../ui/NotFound.jsx'
import App from '../../ui/App.jsx';
import Index from '../../ui/Index.jsx';
import { RootApp } from '../../ui/RootApp.jsx';
import SignIn from '../../ui/SignIn.jsx';
import AuthenticatedApp from './AuthenticatedApp.jsx';

Meteor.startup( () => {
    render(
        <Router history={ browserHistory }>
            <Route path="/" component={ RootApp }>
                <IndexRoute component={ Index } />
                <Route path="/sign-in" component={ SignIn }/>
                <Route path="/app" component={ AuthenticatedApp }>
                    <IndexRoute component={ App } />
                </Route>
            </Route>


            <Route path="*" component={ NotFound } />
        </Router>,
        document.getElementById( 'render-target' )
    );
});
