import React from 'react';
import Navbar from './Navbar.jsx';
import { Meteor } from 'meteor/meteor';

export const RootApp = ( { children } ) => (
  <div>
      <Navbar/>
      { children }
  </div>
)
