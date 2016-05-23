import React, { Component, PropTypes } from 'react';
import MotionPlus from './MotionPlus.jsx'

import Task from './Task.jsx';

const url = 'https://api.flickr.com/services/rest/?&method=flickr.interestingness.getList&api_key=9880f2212f49d2289601fb002f87a718&format=json&per_page=500&extras=owner_name,url_h,url_l';

export default class Index extends Component {

    constructor() {
        super()
        this.state = {
            photo: ''
        };
    }

    updatePhotos(data) {
        const onlyLarge =  data.photos.photo.filter(p => !!p.url_h);
        const random = Math.round(Math.random() * onlyLarge.length)
        this.setState({
            photo: onlyLarge[random]
        })
    }

    componentDidMount() {

        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success: function (data) {
                this.updatePhotos(data)
            }.bind(this)
        });

    }

    render() {

        return (
            <div>
                <div className="container-fluid" style={{backgroundImage: `url(${this.state.photo.url_h})`, backgroundSize: 'cover', height: '70vh'}}/>
                <div style={{marginTop: 50}} className="container">
                    <div className="jumbotron"><h1>Welcome!</h1></div>
                    <p className="lead">This is a Todo list built using React and Meteor!</p>
                </div>
            </div>

        )
    }
}
