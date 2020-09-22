/**
 *
 * ManagerDashboard
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Dashboardcomp from 'components/Dashboardcomp';
import MonthView from 'components/MonthView';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  } 
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1} m={0}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function ManagerDashboard({ employeeInfo, employeeList,leaveData,getLeaveData,empTransactions,getAllEmpTransactions,isHr}) {
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <div className="row">
        <div className={classes.tabRoot}>
          <AppBar position="static" color="default" elevation={0}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="full width tabs example"
              centered
            >
              <Tab label="Employee View" {...a11yProps(0)} />
              <Tab label="Monthly View" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Dashboardcomp employeeInfo={employeeList[0]} Dashboardfor="HR" leaveData={leaveData} getLeaveData={getLeaveData} employeeList={employeeList}/>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <MonthView employeeInfo={employeeInfo} empTransactions={empTransactions} getAllEmpTransactions={getAllEmpTransactions} isHr={isHr} employeeList={employeeList}/>
            </TabPanel>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

ManagerDashboard.propTypes = {
  employeeInfo: PropTypes.object,
  employeeList: PropTypes.array,
  leaveData: PropTypes.array,
  getLeaveData: PropTypes.func,
};

export default memo(ManagerDashboard);
