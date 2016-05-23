import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { Accounts } from 'meteor/std:accounts-ui';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


class Navbar extends Component {

    loggedInQuery() {
        const currentUserId = this.props.currentUser && this.props.currentUser._id;

        if (currentUserId) {
            return this.props.currentUser.username;
        } else {
            return 'Sign In';
        }
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <IndexLink to="/" className="navbar-brand" activeClassName="active">Home</IndexLink>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link to="/app" activeClassName="active">To Do List</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.loggedInQuery()} <span className="caret"></span></a>
                                <ul style={{width: 300, padding: 18}} className="dropdown-menu">
                                    <li><Accounts.ui.LoginForm />
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default createContainer(() => {

    return {
        currentUser: Meteor.user(),
    };
}, Navbar);
