import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ChannelListing from './channel-listing/channel-listing';
import ChannelChannel from './channel-detail/channel-detail';
import './app.scss';

export const App = () => {
  return (
    <div className="app section container is-fluid">
      <Route exact path="/channels/:id" component={ChannelChannel} />
      <Route exact path="/channels" component={ChannelListing} />
      <Route exact path="/">
        <Redirect to="/channels" />
      </Route>
    </div>
  );
};

export default App;
