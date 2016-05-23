import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

class AuthenticatedApp extends Component {

    componentWillMount() {
        if (!this.props.isAuthenticated) {
            browserHistory.push('/sign-in')
        }
    }

    componentDidUpdate() {
        if (!this.props.isAuthenticated) {
            browserHistory.push('/sign-in')
        }
    }

    render() {
        return (
            <div>
                {/* Views will be rendered here */}
                {this.props.children}
            </div>
        );
    }
}

export default createContainer(() => {

    return {
        isAuthenticated: !!Meteor.user(),
    };
}, AuthenticatedApp);
