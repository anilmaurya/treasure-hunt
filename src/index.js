import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

// examples:
import Home from './Home';
import HallOfFame from './HallOfFame';
import Main from './components/Main';

// styles
import './index.css';

// components
import App from './App';

// utils
import registerServiceWorker from './registerServiceWorker';

const defaultPath = process.env.REACT_APP_BASE_PATH;

ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route exact path={defaultPath} component={Home} />
        {/* New examples here */}
        <Route path={`${defaultPath}puzzle`} component={Main} />
        <Route path={`${defaultPath}hall_of_fame`} component={HallOfFame} />
        <Redirect exact from="*" to={defaultPath} />
      </Switch>
    </App>
  </Router>,
  document.getElementById('root'),
);

registerServiceWorker();
