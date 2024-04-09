import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainMenu from './components/MainMenu';
// Import other components/screens here

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainMenu} />
        {/* Add other routes here */}
      </Switch>
    </Router>
  );
};

export default Routes;
