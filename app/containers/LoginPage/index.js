/**
 *
 * LoginPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { LinearProgress, Input, FormControl, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectLoginPage, makeSelectLoading } from './selectors';
import { getUserLogin} from './actions';
import reducer from './reducer';
import saga from './saga';
import './styles.scss';
import Logo from './images/logo.png';
import Notification from '../../components/Notification/index';
import Spinner from 'components/Spinner/index';

export function LoginPage({user, loading, getLogin}) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  useEffect(() => {
    getLogin(user.location.search.slice(5));
  }, [])

  return (
    <div>
      <Helmet>
        <title>LHCM</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
        <div className="login-wrapper">
          {loading ? <Spinner /> : ''}
          <div className="banner-bg" />
          <div className="login-center">
            <div className="login-box">
              <div className="logo-center">
                <img className="logo-img" src={Logo} alt="AFourLogo" />
              </div>
              <h1 className="title">AFour Leave Portal</h1>
              <p className="tagline">
                Go to <a href={process.env.ERP_URL}>ERP</a> and signin with your google account.
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getLogin: (uid) => dispatch(getUserLogin(uid))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
