/**
 *
 * CompOff
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import RequestCompOff from 'components/RequestCompOff';
import ApplyCompOff from 'components/ApplyCompOff';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header: {
    fontSize: '1.2em',
    padding: '10px',
    // marginBottom: '20px'
  },
  textArea: {
    width: '-webkit-fill-available'
  },
  secButton: {
    color: '#E54555',
    borderColor: '#E54555',
    textTransform: 'none',
    marginRight: '25px',
  },
  roundBorder: {
    borderStyle: 'groove',
    border: '2px solid #ab9999',
    borderRadius: '15px',
  },
  h78: {
    height: '78px !important',
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

function Summary({}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>

    </div>
  );
}

Summary.propTypes = {

}

function Guidelines({}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p style={{'fontSize': '1.2em'}}>Comp off will be considered in following cases:</p>
      <ol>
        <li>
          Only if your client / Reporting Manager has requested to work by email on one of the following days:
          <ol>
            <li style={{'listStyleType': 'lower-alpha'}}>Working on Saturdays and Sundays for Engineering department.</li>
            <li style={{'listStyleType': 'lower-alpha'}}>Working on the holidays listed in the holiday calendar.</li>
            <li style={{'listStyleType': 'lower-alpha'}}>If you come for two recruitment drives, you will eligible for one comp off (for Engineering department).</li>
          </ol>
        </li>
        <li>
          Applicability and Conditions:
          <ol>
            <li style={{'listStyleType': 'lower-alpha'}}>All comp offs will lapse on 31st December of every year.</li>
            <li style={{'listStyleType': 'lower-alpha'}}>Comp offs earned in the month of December will be carried forward to the next year.</li>
            <li style={{'listStyleType': 'lower-alpha'}}>You need to fill in the timesheet to avail comp off.</li>
            <li style={{'listStyleType': 'lower-alpha'}}>While applying for comp off, you must mention the Holiday on which you worked.</li>
            <li style={{'listStyleType': 'lower-alpha'}}>The comp offs earned in the month of December of the current year will be carried forward to the next year.</li>
          </ol>
        </li>
      </ol>
    </div>
  );
}

function CompOff({postCompOff, compOffBalance, nextCompOffBalance, compOffs, employeeInfo}) {
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
              <Tab label="Request" {...a11yProps(0)} className="tabHorizontalButton"/>
              <Tab label="Apply" {...a11yProps(1)} className="tabHorizontalButton"/>
              <Tab label="Guidelines" {...a11yProps(2)} className="tabHorizontalButton"/>
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <RequestCompOff employeeInfo={employeeInfo} postCompOff={postCompOff}/>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <ApplyCompOff employeeInfo={employeeInfo} postCompOff={postCompOff} compOffBalance={compOffBalance.availedCompOff - compOffBalance.approvedCompOff - compOffBalance.appliedCompOff} nextCompOffBalance={nextCompOffBalance.availedCompOff - nextCompOffBalance.approvedCompOff - nextCompOffBalance.appliedCompOff}/>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <Guidelines />
            </TabPanel>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

CompOff.propTypes = {
  postCompOff: PropTypes.func,
  compOffBalance: PropTypes.object,
  nextCompOffBalance: PropTypes.object,
  compOffs: PropTypes.array,
  employeeInfo: PropTypes.object,
};

export default memo(CompOff);
