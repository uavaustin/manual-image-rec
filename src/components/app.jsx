import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import PageMenu from './page-menu';
import Classifier from '../pages/Classifier/Classifier';
import Explorer from '../pages/Explorer/Explorer';
import PageNotFound from '../pages/page-not-found';
import Targets from '../pages/Targets/Targets';

import './app.css';

const App = () => (
  <div className='page-wrapper'>
    <PageMenu />
    <main>
      <Switch>
        <Redirect exact from='(/|/app)' to='/app/explorer' />
        <Route exact path='/app/explorer' component={Explorer} />
        <Route exact path='/app/classifier' component={Classifier} />
        <Route exact path='/app/targets' component={Targets} />
        <Route component={PageNotFound} />
      </Switch>
    </main>
  </div>
);

export default App;
