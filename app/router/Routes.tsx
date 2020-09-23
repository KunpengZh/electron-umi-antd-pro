/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from '../containers/App';
import HomePage from '../containers/HomePage';
import NotFound from '../containers/NotFound';
import DatasetPage from '../containers/DatasetPage';
import ModelPage from '../containers/ModelPage';
import { routes } from '.';

// Lazily load routes and code split with webpack
const LazyCounterPage = React.lazy(
  () =>
    import(/* webpackChunkName: "CounterPage" */ '../containers/CounterPage')
);

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

interface Comps {
  [key: string]: any;
}

const components: Comps = {
  home: HomePage,
  notFound: NotFound,
  dataset: DatasetPage,
  model: ModelPage,
  counter: CounterPage,
};

export default function Routes(): JSX.Element {
  return (
    <App>
      <Switch>
        {routes.map(
          (route) =>
            components[route.name] && (
              <Route
                path={route.path}
                exact
                component={components[route.name]}
                key={route.name}
              />
            )
        )}
      </Switch>
    </App>
  );
}