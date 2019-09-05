import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Reader from '../Reader/Reader';
import publicationsList from '../Data/publications.json';

const App = () => {
  return (
    <Switch>
      <Route
        path="/reader"
        render={props => <Reader {...props} items={publicationsList} />}
      />
      <Redirect push to="/reader" />
    </Switch>
  );
};

export default App;
