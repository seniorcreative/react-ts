import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Search from './pages/search/search';
import './App.css';

function App() {

  return (
    <Router>
      <div className="container mt-8 p-8 _bg-indigo-100 rounded-2xl border-4">
        <Switch>
          <Route exact path="/" component={Search} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
