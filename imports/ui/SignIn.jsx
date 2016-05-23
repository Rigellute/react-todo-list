import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { Accounts } from 'meteor/std:accounts-ui';
import { Motion, spring } from 'react-motion'

export default class SignIn extends Component {
    render() {
        return (
            <Motion defaultStyle={{x: -500}} style={{x: spring(0, {stiffness: 95, damping: 10})}}>
                {interpolatingStyle => {

                    return (
                        <div className="container">
                            <div className="jumbotron"><h1>Please Sign In</h1></div>
                            <div style={{transform: `translateX(${interpolatingStyle.x}px)`}} className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <Accounts.ui.LoginForm />
                                </div>
                                <div className="col-md-3"></div>

                            </div>
                        </div>)
                }
                }

            </Motion>
        )
    }
}
