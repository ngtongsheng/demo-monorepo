import React from 'react';

import './app.scss';
import { Route, useParams, Redirect } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  return <div>This is {JSON.stringify(id)} detail page</div>;
};

const Listing = () => {
  return <div>This is listing page</div>;
};

export const App = () => {
  return (
    <div className="app">
      <Route exact path="/channels/:id" component={Detail} />
      <Route exact path="/channels" component={Listing} />
      <Route exact path="/">
        <Redirect to="/channels" />
      </Route>
    </div>
  );
};

export default App;
