import React from 'react';
import './App.css';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { NotFound, BasicPage } from './pages'

function App() {
  return (
    <div className="App">
    <Switch>
      <Route path="/" exact component={BasicPage} />
      <Route path="*" component={NotFound} />
    </Switch>
    </div>
  );
}

export default App;
