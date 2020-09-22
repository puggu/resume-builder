/**
 *
 * HrAddUpdateLeave
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import HrUpdateLeaveBalance from 'components/HrUpdateLeaveBalance/index';
import HrAddLeaveBalance from 'components/HrAddLeaveBalance/index';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import { TextField, Button } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  tabRoot: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header: {
    fontSize: '1.2em',
    padding: '10px',
    marginBottom: '20px'
  },
  textArea: {
    width: '-webkit-fill-available'
  },
  primaryButton : {
    marginTop: '15px'
  },
  secButton: {
    color: '#E54555',
    borderColor: '#E54555',
    textTransform: 'none',
    marginRight: '25px',
    marginTop: '15px',
  },
  roundBorder: {
    borderStyle: 'groove',
    border: '2px solid #ab9999',
    borderRadius: '15px',
  },
  w100: {
    marginRight: '10px',
    maxWidth: '100px'
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
      {value === index && <Box p={3}>{children}</Box>}
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

function HrAddUpdateLeave({ getYearlyEmployees, yearlyEmployees, postYearlyEmployees, getLeaveBalance, leaveBalance, putLeaveBalance }) {
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
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="full width tabs example"
              centered
            >
              <Tab label="Add Leave Balance" {...a11yProps(0)} />
              <Tab label="Update Leave Balance" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <HrAddLeaveBalance getYearlyEmployees={getYearlyEmployees} yearlyEmployees={yearlyEmployees} postYearlyEmployees={postYearlyEmployees}/>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <HrUpdateLeaveBalance getLeaveBalance={getLeaveBalance} leaveBalance={leaveBalance} putLeaveBalance={putLeaveBalance}/>
            </TabPanel>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

HrAddUpdateLeave.propTypes = {
  getYearlyEmployees: PropTypes.func,
  yearlyEmployees: PropTypes.array,
  postYearlyEmployees: PropTypes.func,
  getLeaveBalance: PropTypes.func,
  leaveBalance: PropTypes.array,
  putLeaveBalance: PropTypes.func,
};

export default memo(HrAddUpdateLeave);
