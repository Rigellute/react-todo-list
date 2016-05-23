import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

export default class MotionPlus extends Component {

    constructor() {
        super();
        this._rotate = false;
    }

    initRotate() {
        this._rotate = !this._rotate;
    }

    determineDirection() {
        if (this._rotate) {

            this._rotate = !this._rotate;

            return {
                start: 0,
                end: 45,
            }
        } else {

            this._rotate = !this._rotate;

            return {
                start: 45,
                end: 0,
            }
        }
    }

    render() {

        const {start, end} = this.determineDirection();

        return (
            <Motion defaultStyle={{x: start}} style={{x: spring(end)}}>
                {interpolatingStyle => <span onClick={this.initRotate()} style={{fontSize: '7em', transform: `rotate(${interpolatingStyle.x}deg)`}} className="glyphicon glyphicon-plus"></span>}
            </Motion>
        )
    }
}
