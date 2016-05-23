import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hideComplete: false,
        };
    }

    toggleHideComplete() {
        this.setState({
            hideComplete: !this.state.hideComplete,
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('tasks.insert', text)

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderTasks() {
        let filterTasks = this.props.tasks;
        if (this.state.hideComplete) {
            filterTasks = filterTasks.filter(task => !task.checked);
        }

        return filterTasks.map(task => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            const showPrivateButton = task.owner === currentUserId;

            return (
                <Task
                    key={task._id}
                    task={task}
                    showPrivateButton={showPrivateButton} />
            )
        });
    }

    canAddTasks() {
        if (this.props.currentUser) {
            return (
                <form className="form-group" onSubmit={this.handleSubmit.bind(this)} >
                    <input className="form-control"
                      type="text"
                      ref="textInput"
                      placeholder="Type to add new tasks"
                    />

                    <div className="checkbox mr-tp">
                        <label>
                            <input
                                type="checkbox"
                                checked={this.hideComplete}
                                onClick={this.toggleHideComplete.bind(this)}
                            />
                            Hide Completed Tasks ({this.props.completeCount})
                        </label>
                    </div>
                </form>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="jumbotron">

                        <header>
                            <h1 style={{textAlign: 'center'}}>Todo List <br/>
                                <small>Incomplete tasks: {this.props.incompleteCount}
                                </small>
                            </h1>
                        </header>

                    </div>

                    {this.canAddTasks()}

                    <div>
                        {this.renderTasks()}
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    completeCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {

    Meteor.subscribe('tasks');

    return {
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({checked: {$ne: true} }).count(),
        completeCount: Tasks.find({checked: true}).count(),
        currentUser: Meteor.user(),
    };
}, App);
