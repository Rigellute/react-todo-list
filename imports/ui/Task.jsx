import React, { Component, PropTypes } from 'react';

import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {

    toggleChecked() {
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.checked);
    }

    togglePrivate() {
        Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private)
    }

    deleteThisTask() {
        Meteor.call('tasks.remove', this.props.task._id);
    }

    canPrivatise() {
        if (this.props.showPrivateButton) {
            return (
                <div className="col-xs-1">
                    <button
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Toggle Private Task"
                        type="button"
                        className='btn btn-info pull-right btn-sm'
                        aria-label="Left Align"
                        onClick={this.togglePrivate.bind(this)}
                    >
                        { this.props.task.private ? (
                            <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                        ) : (
                            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                        )
                    }
                    </button>
                </div>
            )
        } else {
            return <div className="col-xs-1"></div>;
        }
    }

    render() {

        const taskClassName = this.props.task.checked ? 'checked' : '';

        return (
            <div className='container pd-tp-bt hover-grey'>

                <div className="row">
                    <div className="col-xs-1">
                        <button
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Complete Task"
                            checked={this.props.task.checked}
                            onClick={this.toggleChecked.bind(this)}
                            aria-label="Left Align"
                            className='btn btn-success btn-sm'
                        >
                            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        </button>
                    </div>



                    <div className="col-xs-9">
                        <p className={taskClassName}><small>({this.props.task.username}) </small>{this.props.task.text}</p>

                    </div>

                    { this.canPrivatise() }

                    <div className="col-xs-1">
                        <button
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete Task"
                            className='btn btn-warning pull-right btn-sm'
                            aria-label="Right Align"
                            onClick={this.deleteThisTask.bind(this)}
                        >
                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Task.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: PropTypes.object.isRequired,
    showPrivateButton: PropTypes.bool.isRequired,
};
