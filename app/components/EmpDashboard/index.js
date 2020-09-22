/**
 *
 * EmpDashboard
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Dashboardcomp from 'components/Dashboardcomp';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  } 
}));



function EmpDashboard({leaveBalance, compOffBalance, nextCompOffBalance, employeeInfo, transactions, compOffs, wfhBalance, wfhs, holidays,optionalHolidayList,employeeList,employeesLeaveBalance,leaveData,getLeaveData}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Dashboardcomp  employeeInfo={employeeInfo}  Dashboardfor="employee" employeeList={employeeList} leaveData={leaveData} getLeaveData={getLeaveData}/>
      </div>
  );
}

EmpDashboard.propTypes = {
  leaveBalance: PropTypes.object,
  compOffBalance: PropTypes.object,
  nextCompOffBalance: PropTypes.object,
  employeeInfo: PropTypes.object,
  transactions: PropTypes.array,
  compOffs: PropTypes.array,
  wfhBalance: PropTypes.object, 
  wfhs: PropTypes.array,
  holidays: PropTypes.array,
  employeeList: PropTypes.array,
  employeesLeaveBalance: PropTypes.array,
  leaveData: PropTypes.array,
  getLeaveData: PropTypes.func
};

export default memo(EmpDashboard);
