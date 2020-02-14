import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ImageContextProvider from '../contexts/ImageContext'

import PageMenu from './page-menu';
import Classifier from '../pages/Classifier/Classifier';
import PageNotFound from '../pages/page-not-found';
import Targets from '../pages/Targets/Targets';

import './app.css';

const App = () => (
  <div className='page-wrapper'>
    <PageMenu />
    <main>
      <Switch>
        <Redirect exact from='(/|/app)' to='/app/classifier' />
        <Route exact path='/app/classifier'>
          <ImageContextProvider>
            <Classifier />
          </ImageContextProvider>
        </Route>
        <Route exact path='/app/targets' component={Targets} />
        <Route component={PageNotFound} />
      </Switch>
    </main>
  </div>
);

export default App;
