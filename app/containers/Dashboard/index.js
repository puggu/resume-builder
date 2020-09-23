/**
 *
 * Dashboard
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboard, { makeSelectTabValue, makeSelectEmployeeList,
  makeSelectLoading, makeSelectLeaveBalance,
  makeSelectEmployeeInfo, makeSelectEmployeeRole, makeSelectEmployeeLeaves,
  makeSelectLeaveData,makeSelectReviews, makeSelectEmpTransactions, makeSelectOptionalHolidayList,
  makeSelectManagerLeaves,
  makeSelectYearlyEmployees, makeSelectEmployeesLeaveBalance,
  makeSelectCompOffBalance, makeSelectNextCompOffBalance, makeSelectEmpCompOffTransactions,
  makeSelectManagerCompOffTransactions, makeSelectHrCompOffTransactions,
  makeSelectWfhBalance, makeSelectEmpWfh, makeSelectManagerWfh, makeSelectHrWfh,
  makeSelectHolidayList, makeSelectResourceType, makeSelectUnTriggeredEmployee
} from './selectors';
import { makeSelectUser } from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';
import { putTabValue, getAllEmployees,
  getLeaveBalance, getEmployeeInfo, getEmployeeRoles, getLeaves, postLeave, withdrawLeave,
  getCompOffBalance, getNextCompOffBalance, getCompOffTransactions, postCompOff,
  getWfhBalance, getWfhTransactions, postWfh, putWfh,
  getLeaveData,getAllReviews,getAllEmpTransactions,
  getOptionalHoliday, deleteOptionalHoliday, postOptionalHoliday,
  getManagerLeaves, putManagerLeavesActions, putCompOff,
  getYearlyEmployees, postYearlyEmployees, getEmployeesLeaveBalance, putEmployeeLeaveBalance,
  getHoliday, postHoliday, deleteHoliday, getResourceType, putResourceType, getUntriggeredEmployees
} from './actions';

import './styles.scss';

import { makeStyles } from '@material-ui/core/styles';
import Resume from 'components/Resume/Loadable';


const useStyles = makeStyles(theme => ({
  root: {
    // offset: theme.mixins.toolbar,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'calc(100% - 100px) !important',
    minHeight: '-webkit-fill-available'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    maxWidth: '15vw',
    textTransform: 'none'
  },
  headerTab: {
    maxWidth: '15vw',
    // backgroundColor: '#d2e3e8',
    textAlign: 'left',
    fontWeight: '550'
  },
  tabPanel: {
    width: '95vw',
    marginLeft: '20px',
    marginTop: '20px'
  }
}));
const value=0;
export function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.tabPanel}>
      <Resume/>
      </div>
      
        
    </div>
  );
}

Dashboard.propTypes = {
};

export default compose(
  memo,
)(Dashboard);
