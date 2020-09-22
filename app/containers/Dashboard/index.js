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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Spinner from 'components/Spinner/index';
import EmpDashboard from 'components/EmpDashboard/Loadable';
import ApplyLeave from 'components/ApplyLeave/Loadable';
import WithdrawLeave from 'components/WithdrawLeave/Loadable';
import EmpAttendance from 'components/EmpAttendance/Loadable';
import HrAddUpdateLeave from 'components/HrAddUpdateLeave/Loadable';
import HrDashboard from 'components/HrDashboard/Loadable';
import AddHoliday from 'components/AddHoliday';
import Review from 'components/Review';
import OptionalHolidayTrigger from 'components/OptionalHolidayTrigger';
import ManagerDashboard from 'components/ManagerDashboard/Loadable'
import DuDashBoard from 'components/DuDashBoard/Loadable'
import HrTeamview from 'components/HrTeamview/Loadable'
import Resume from '../../components/Resume';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

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
    width: '85vw',
  }
}));

export function Dashboard({value, setValue, employeeList, getAllEmployees, userData, getLeaveBalance, getEmployeeInfo, getEmpRole, getLeaves, postLeave, withdrawLeave,
  getCompOffBalance, getNextCompOffBalance, getCompOffTransactions, postCompOff,
  getWfhBalance, getWfhTransactions, postWfh,
  getLeaveData,getAllReviews,getAllEmpTransactions,
  getManagerLeaves, putManagerLeavesActions, putCompOff, putWfh,
  getYearlyEmployees, postYearlyEmployees, getEmployeesLeaveBalance, putEmployeeLeaveBalance,
  loading, leaveBalance, employeeInfo, isApprover, empLeaves, compOffBalance, nextCompOffBalance, empCompOffs,
  wfhBalance, empWfh, managerWfh, hrWfh,
  managerLeaves, managerCompOffs,
  yearlyEmployees, employeesLeaveBalance, hrCompOffs,
  holidayList, optionalHolidayList,
  getHoliday, postHoliday, deleteHoliday,
  getOptionalHoliday, postOptionalHoliday, deleteOptionalHoliday,
  leaveData,reviews,empTransactions, resourceType, getResourceType, putResourceType,
  getUntriggeredEmployees, unTriggeredEmployee,
}) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });
  const classes = useStyles();
  // const [value, setValue] = useState(0);
  const [showEmployee, setShowEmployee] = useState(value < 6 && value > 0 );
  const [showManager, setShowManager] = useState(value < 12 && value > 5);
  const [showHr, setShowHr] = useState(value > 11);
  const hrAccessID = process.env.HR_ACCESS ? process.env.HR_ACCESS.split(',') : [];
  const hrAccessTabValid = hrAccessID.some(emailGroup=> userData.userGroups.includes(emailGroup));
  const employeeList_mngr = employeeList.filter(
    employee => employee.manager_id == employeeInfo.emp_id,
  );
  const employeeList_du = employeeList.filter(
    employee => (employee.du_head_id == employeeInfo.emp_id),
  );


  useEffect(() => {
    getAllEmployees();
    getEmpRole();
    getLeaveBalance();
    getEmployeeInfo();
    // getLeaves();
    getCompOffBalance();
    getNextCompOffBalance();
    // getCompOffTransactions('employee');
    // getWfhTransactions('employee');
    getWfhBalance();
    getHoliday(new Date().getFullYear());
    getOptionalHoliday(new Date().getFullYear());
  },[]);

  const handleChange = (event, newValue) => {
    if(newValue == 1 || newValue == 6 || newValue == 12) setValue(newValue + 1);
    else
      setValue(newValue);
  };

  const setShowEmp = () => {
    if(showEmployee) setValue(0);
    else {
      setShowHr(false);
      setShowManager(false);
    }
    setShowEmployee(!showEmployee);
  }

  const setShowMgr = () => {
    if(isApprover) {
      if(showManager) setValue(0);
      else {
        setShowHr(false);
        setShowEmployee(false);
      }
      setShowManager(!showManager);
    } else setValue(0);
  }

  const setShowHR = () => {
    if(showHr) setValue(0);
    else {
      setShowEmployee(false);
      setShowManager(false);
    }
    setShowHr(!showHr);
  }

  const getUpcomingHolidays = () => {
    const today = new Date().toISOString().split('T')[0];
    const date = new Date(today).getTime();
    const mandatoryHoliday = holidayList.filter(holiday => (new Date(holiday.holiday_date).getTime() >= date) && !holiday.is_optional);
    const optionalHoliday = optionalHolidayList.filter(holiday => new Date(holiday.holiday_date).getTime() >= date);
    return mandatoryHoliday.concat(optionalHoliday);
  }

  const filterWithdrawLeaves = () =>
    empLeaves.filter(leave => leave.leave_status == 'Approved' || leave.leave_status == 'Applied');

  return (
    <div className={classes.root}>
      { loading ? (<Spinner />) : '' }
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={"tabs " + classes.tabs}
      >
        <Tab className={classes.headerTab + " alignNavTab"} label="Dashboard" value={0} {...a11yProps(0)}/>
        <Tab className={classes.headerTab + " alignNavTab"} value={2} label="Apply" {...a11yProps(2)} />
        <Tab className={classes.headerTab + " alignNavTab"} value={4} label="Withdraw" {...a11yProps(4)} />
        <Tab className={classes.headerTab + " alignNavTab"} label="Resume" value={25} {...a11yProps(25)}/>
        {employeeList_mngr.length>0?(<Tab className={classes.headerTab + " alignNavTab"} label="Mngr. View" value={20} {...a11yProps(20)}/>):('')}
        {employeeList_du.length>0?(<Tab className={classes.headerTab + " alignNavTab"} label="DU. View" value={21} {...a11yProps(21)}/>):('')}
        { (isApprover || hrAccessTabValid) && (<Tab className={classes.headerTab  + " alignNavTab"} value={7} label="Review" {...a11yProps(7)} />)}

        {hrAccessTabValid && (<Tab className={classes.headerTab  + " alignNavTab"} label="HR &#707;&#707;" value={12} {...a11yProps(12)} onClick={() => setShowHR()}/>)}
          {showHr ? (<Tab className={classes.tab + " alignNavTab"} value={13} label=" &nbsp; &nbsp;HR Dashboard" {...a11yProps(13)} />) : ''}
          {showHr ? (<Tab className={classes.tab + " alignNavTab"} value={14} label=" &nbsp; &nbsp;Credit Leaves" {...a11yProps(14)} />) : ''}
          {showHr ? (<Tab className={classes.tab + " alignNavTab"} value={17} label=" &nbsp; &nbsp;Add Holiday" {...a11yProps(17)} />) : ''}
          {showHr ? (<Tab className={classes.tab + " alignNavTab"} value={18} label=" &nbsp; &nbsp;Optional Holiday" {...a11yProps(18)} />) : ''}
          {showHr ? (<Tab className={classes.tab + " alignNavTab"} value={19} label=" &nbsp; &nbsp;Org. View" {...a11yProps(19)} />) : ''}
      </Tabs>
      <TabPanel value={value} className={classes.tabPanel} index={0}>
        <EmpDashboard employeeInfo={employeeInfo}  employeeList={employeeList} leaveData={leaveData} getLeaveData={getLeaveData}/>
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={1}>
        Employee
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={2}>
        <ApplyLeave employeeList={employeeList} applyLeave={postLeave} leaveBalance={leaveBalance} employeeInfo={employeeInfo} postWfh={postWfh} wfhBalance={wfhBalance} postCompOff={postCompOff} compOffBalance={compOffBalance} nextCompOffBalance={nextCompOffBalance} compOffs={empCompOffs} employeeInfo={employeeInfo} holidayList={holidayList} optionalHolidayList={optionalHolidayList} postOptionalHoliday={postOptionalHoliday} deleteOptionalHoliday={deleteOptionalHoliday} resourceType={resourceType} getResourceType={getResourceType}/>
      </TabPanel>
      {/* <TabPanel value={value} className={classes.tabPanel} index={3}>
        <CompOff postCompOff={postCompOff} compOffBalance={compOffBalance} nextCompOffBalance={nextCompOffBalance} compOffs={empCompOffs} employeeInfo={employeeInfo}/>
      </TabPanel> */}
      <TabPanel value={value} className={classes.tabPanel} index={4}>
        <WithdrawLeave transactions={filterWithdrawLeaves()} withdrawLeave={withdrawLeave}/>
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={5}>
        <EmpAttendance />
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={6}>
        Approver
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={7}>
        <Review isHr={hrAccessTabValid} getAllReviews={getAllReviews} reviews={reviews} putWfh={putWfh} putCompOff={putCompOff} putLeave={putManagerLeavesActions}/>
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={12}>
        HR
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={13}>
        <HrDashboard />
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={14}>
        <HrAddUpdateLeave getYearlyEmployees={getYearlyEmployees} yearlyEmployees={yearlyEmployees} postYearlyEmployees={postYearlyEmployees} getLeaveBalance={getEmployeesLeaveBalance} leaveBalance={employeesLeaveBalance} putLeaveBalance={putEmployeeLeaveBalance}/>
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={17}>
        <AddHoliday holidays={holidayList} postHoliday={postHoliday} deleteHoliday={deleteHoliday}/>
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={18}>
        <OptionalHolidayTrigger holidays={holidayList} postOptionalHoliday={postOptionalHoliday} resourceType={resourceType} getResourceType={getResourceType} putResourceType={putResourceType} getUntriggeredEmployees={getUntriggeredEmployees} unTriggeredEmployee={unTriggeredEmployee} employeeList={employeeList}/>
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={19}>
      <HrTeamview employeeInfo={employeeInfo} employeeList={employeeList} leaveData={leaveData} getLeaveData={getLeaveData} empTransactions={empTransactions} getAllEmpTransactions={getAllEmpTransactions} isHr={hrAccessTabValid}/>
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={20}>
        <ManagerDashboard employeeInfo={employeeInfo} employeeList={employeeList_mngr} leaveData={leaveData} getLeaveData={getLeaveData} empTransactions={empTransactions} getAllEmpTransactions={getAllEmpTransactions} isHr={hrAccessTabValid}/>
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={21}>
        <DuDashBoard employeeInfo={employeeInfo} employeeList={employeeList_du} leaveData={leaveData} getLeaveData={getLeaveData} empTransactions={empTransactions} getAllEmpTransactions={getAllEmpTransactions} isHr={hrAccessTabValid}/>
      </TabPanel>
      <TabPanel value={value} className={classes.tabPanel} index={25}>
        <Resume employeeInfo={employeeInfo}/>
      </TabPanel>
    </div>
  );
}

Dashboard.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  value: PropTypes.number,
  setValue: PropTypes.func,
  employeeList: PropTypes.array,
  getAllEmployees: PropTypes.func,
  userData: PropTypes.object,
  getLeaveBalance: PropTypes.func,
  getEmployeeInfo: PropTypes.func,
  isApprover: PropTypes.bool,
  getLeaves: PropTypes.func,
  postLeave: PropTypes.func,
  withdrawLeave: PropTypes.func,
  getCompOffBalance: PropTypes.func,
  getNextCompOffBalance: PropTypes.func,
  getCompOffTransactions: PropTypes.func,
  postCompOff: PropTypes.func,
  getWfhBalance: PropTypes.func,
  getWfhTransactions: PropTypes.func,
  postWfh: PropTypes.func,
  getLeaveData: PropTypes.func,
  getAllReviews: PropTypes.func,
  getAllEmpTransactions: PropTypes.func,
  getManagerLeaves: PropTypes.func,
  putManagerLeavesActions: PropTypes.func,
  putCompOff: PropTypes.func,
  putWfh: PropTypes.func,
  getYearlyEmployees: PropTypes.func,
  postYearlyEmployees: PropTypes.func,
  getEmployeesLeaveBalance: PropTypes.func,
  putEmployeeLeaveBalance: PropTypes.func,
  loading: PropTypes.bool,
  leaveBalance: PropTypes.object,
  employeeInfo: PropTypes.object,
  empLeaves: PropTypes.array,
  compOffBalance: PropTypes.object,
  nextCompOffBalance: PropTypes.object,
  empCompOffs: PropTypes.array,
  managerCompOffs: PropTypes.array,
  hrCompOffs: PropTypes.array,
  wfhBalance: PropTypes.object,
  empWfh: PropTypes.array,
  managerWfh: PropTypes.array,
  hrWfh: PropTypes.array,
  managerLeaves: PropTypes.array,
  yearlyEmployees: PropTypes.array,
  employeesLeaveBalance: PropTypes.array,
  holidayList: PropTypes.array,
  optionalHolidayList: PropTypes.array,
  getHoliday: PropTypes.func,
  postHoliday: PropTypes.func,
  deleteHoliday: PropTypes.func,
  getOptionalHoliday: PropTypes.func,
  postOptionalHoliday: PropTypes.func,
  deleteOptionalHoliday: PropTypes.func,
  leaveData: PropTypes.array,
  reviews: PropTypes.array,
  empTransactions: PropTypes.array,
  resourceType: PropTypes.array,
  getResourceType: PropTypes.func,
  putResourceType: PropTypes.func,
  getUntriggeredEmployees: PropTypes.func,
  unTriggeredEmployee: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  // dashboard: makeSelectDashboard(),
  value: makeSelectTabValue(),
  employeeList: makeSelectEmployeeList(),
  userData: makeSelectUser(),
  loading: makeSelectLoading(),
  leaveBalance: makeSelectLeaveBalance(),
  employeeInfo: makeSelectEmployeeInfo(),
  isApprover: makeSelectEmployeeRole(),
  empLeaves: makeSelectEmployeeLeaves(),
  compOffBalance: makeSelectCompOffBalance(),
  nextCompOffBalance: makeSelectNextCompOffBalance(),
  empCompOffs: makeSelectEmpCompOffTransactions(),
  managerCompOffs: makeSelectManagerCompOffTransactions(),
  hrCompOffs: makeSelectHrCompOffTransactions(),
  wfhBalance: makeSelectWfhBalance(),
  empWfh: makeSelectEmpWfh(),
  managerWfh: makeSelectManagerWfh(),
  hrWfh: makeSelectHrWfh(),
  managerLeaves: makeSelectManagerLeaves(),
  yearlyEmployees: makeSelectYearlyEmployees(),
  employeesLeaveBalance: makeSelectEmployeesLeaveBalance(),
  holidayList: makeSelectHolidayList(),
  optionalHolidayList: makeSelectOptionalHolidayList(),
  leaveData: makeSelectLeaveData(),
  reviews: makeSelectReviews(),
  empTransactions: makeSelectEmpTransactions(),
  resourceType: makeSelectResourceType(),
  unTriggeredEmployee: makeSelectUnTriggeredEmployee(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    setValue: (value) => dispatch(putTabValue(value)),
    getAllEmployees: () => dispatch(getAllEmployees()),
    getLeaveBalance: () => dispatch(getLeaveBalance()),
    getEmployeeInfo: () => dispatch(getEmployeeInfo()),
    getEmpRole: () => dispatch(getEmployeeRoles()),
    getLeaves: () => dispatch(getLeaves()),
    postLeave: leave => dispatch(postLeave(leave)),
    withdrawLeave: leave => dispatch(withdrawLeave(leave)),
    getCompOffBalance: () => dispatch(getCompOffBalance()),
    getNextCompOffBalance: () => dispatch(getNextCompOffBalance()),
    getCompOffTransactions: user => dispatch(getCompOffTransactions(user)),
    postCompOff: compOff => dispatch(postCompOff(compOff)),
    getWfhBalance: () => dispatch(getWfhBalance()),
    getWfhTransactions: user => dispatch(getWfhTransactions(user)),
    postWfh: transaction => dispatch(postWfh(transaction)),
    getLeaveData: (year,emp_id) => dispatch(getLeaveData(year,emp_id)),
    getAllReviews: (isHr) => dispatch(getAllReviews(isHr)),
    getAllEmpTransactions: (isHr,year) => dispatch(getAllEmpTransactions(isHr,year)),
    getManagerLeaves: (view) => dispatch(getManagerLeaves(view)),
    putManagerLeavesActions: (leaves) => dispatch(putManagerLeavesActions(leaves)),
    putCompOff: (compOff) => dispatch(putCompOff(compOff)),
    putWfh: (transaction) => dispatch(putWfh(transaction)),
    getYearlyEmployees: year => dispatch(getYearlyEmployees(year)),
    postYearlyEmployees: employees => dispatch(postYearlyEmployees(employees)),
    getEmployeesLeaveBalance: year => dispatch(getEmployeesLeaveBalance(year)),
    putEmployeeLeaveBalance: leaveBalance => dispatch(putEmployeeLeaveBalance(leaveBalance)),
    getHoliday: year => dispatch(getHoliday(year)),
    postHoliday: (year, holiday) => dispatch(postHoliday(year, holiday)),
    deleteHoliday: (year, holiday) => dispatch(deleteHoliday(year, holiday)),
    getOptionalHoliday: year => dispatch(getOptionalHoliday(year)),
    postOptionalHoliday: (year, holiday) => dispatch(postOptionalHoliday(year, holiday)),
    deleteOptionalHoliday: (year, holiday) => dispatch(deleteOptionalHoliday(year, holiday)),
    getResourceType: () => dispatch(getResourceType()),
    putResourceType: (resource) => dispatch(putResourceType(resource)),
    getUntriggeredEmployees: (year) => dispatch(getUntriggeredEmployees(year))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Dashboard);
