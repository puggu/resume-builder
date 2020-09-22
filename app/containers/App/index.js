/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';

import PrivateRoute from '../../PrivateRoute';
import reducer from './reducer';

import HomePage from 'containers/HomePage/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Notification from '../../components/Notification/index';
import Navigation from 'containers/Navigation/Loadable';

import GlobalStyle from '../../global-styles';
import { makeSelectAuth, makeApiResponse } from './selectors';
import { makeSelectMode } from 'containers/Navigation/selectors'

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App({ isAuthenticated, apiResponse, mode }) {
  
  useInjectReducer({ key: 'app', reducer });

  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${mode})`);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'light' : 'dark',
        },
      }),
    [prefersDarkMode, mode],
  );

  const LoginContainer = () => (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={props => <LoginPage user={props}/>} />
      </Switch>
    </React.Fragment>
  );

  const RedirectContainer = () => (
    <React.Fragment>
      <Redirect to="/dashboard" />
    </React.Fragment>
  );

  const DefaultContainer = () => (
    <React.Fragment>
      <Navigation />
      {apiResponse && apiResponse.status !== 'inProgress' ? (
        <Notification
          infoMessage={apiResponse.message}
          variantType={apiResponse.status}
        />
      ) : (
        ''
      )}
      <Switch>
        <PrivateRoute
          exact
          path="/dashboard"
          component={Dashboard}
          authed={isAuthenticated}
        />
        <PrivateRoute component={NotFoundPage} authed={isAuthenticated} />
      </Switch>
    </React.Fragment>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    {/* <div> */}
      <Switch>
        <Route
          exact
          path="/"
          component={LoginContainer}
        />
        <Route component={DefaultContainer} />
      </Switch>
      <GlobalStyle />
    {/* </div> */}
    </ThemeProvider>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  apiResponse: PropTypes.object,
  mode: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectAuth(),
  apiResponse: makeApiResponse(),
  mode: makeSelectMode(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(App);
