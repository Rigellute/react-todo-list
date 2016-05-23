import React from 'react';
import Navbar from './Navbar.jsx';

export const NotFound = () => (
  <div className='container'>
      <div style={{textAlign: 'center'}} className="jumbotron">
          <span style={{fontSize: '5em'}} className="glyphicon glyphicon-warning-sign" aria-hidden="true"></span><br/>
          <h1>
              404<small><br/>
              Not Found</small>
          </h1>
      </div>
  </div>
)
