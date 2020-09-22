import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.dashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () =>
  createSelector(selectDashboardDomain, substate => substate);

const makeSelectTabValue = () =>
  createSelector(selectDashboardDomain, substate => substate.value);

const makeSelectLoading = () =>
  createSelector(selectDashboardDomain, substate => substate.loading);

const makeSelectEmployeeList = () =>
  createSelector(selectDashboardDomain, substate => substate.employeeList);

const makeSelectLeaveBalance = () =>
  createSelector(selectDashboardDomain, substate => substate.leaveBalance);

const makeSelectEmployeeInfo = () =>
  createSelector(selectDashboardDomain, substate => substate.employeeInfo);

const makeSelectEmployeeRole = () =>
  createSelector(selectDashboardDomain, substate => substate.isApprover);

const makeSelectEmployeeLeaves = () =>
  createSelector(selectDashboardDomain, substate => substate.leaves);

const makeSelectCompOffBalance = () =>
  createSelector(selectDashboardDomain, substate => substate.compOffBalance);

const makeSelectNextCompOffBalance = () =>
  createSelector(selectDashboardDomain, substate => substate.nextCompOffBalance);

const makeSelectEmpCompOffTransactions = () =>
  createSelector(selectDashboardDomain, substate => substate.empCompOffTransactions);

const makeSelectManagerCompOffTransactions = () =>
  createSelector(selectDashboardDomain, substate => substate.managerCompOffTransactions);

const makeSelectHrCompOffTransactions = () =>
  createSelector(selectDashboardDomain, substate => substate.hrCompOffTransactions);

const makeSelectWfhBalance = () =>
  createSelector(selectDashboardDomain, substate => substate.wfhBalance);

const makeSelectEmpWfh = () =>
  createSelector(selectDashboardDomain, substate => substate.empWfh);

const makeSelectManagerWfh = () =>
  createSelector(selectDashboardDomain, substate => substate.managerWfh);

const makeSelectHrWfh = () =>
  createSelector(selectDashboardDomain, substate => substate.hrWfh);

const makeSelectLeaveData = () =>
  createSelector(selectDashboardDomain, substate => substate.leaveData); 


//---------------------------Manager Selectors-------------------------------------------------
const makeSelectReviews = () =>
  createSelector(selectDashboardDomain, substate => substate.reviews);

const makeSelectEmpTransactions = () =>
  createSelector(selectDashboardDomain, substate => substate.empTransactions);

const makeSelectManagerLeaves = () =>
  createSelector(selectDashboardDomain, substate => substate.managerLeaves);

//---------------------------HR Selectors-------------------------------------------------
const makeSelectYearlyEmployees = () =>
  createSelector(selectDashboardDomain, substate => substate.yearlyEmployeesList);

const makeSelectEmployeesLeaveBalance = () =>
  createSelector(selectDashboardDomain, substate => substate.employeesLeaveBalance);


const makeSelectHolidayList = () =>
  createSelector(selectDashboardDomain, substate => substate.holidayList);

const makeSelectOptionalHolidayList = () =>
  createSelector(selectDashboardDomain, substate => substate.optionalHolidayList);

const makeSelectResourceType = () =>
  createSelector(selectDashboardDomain, substate => substate.resourceType);

const makeSelectUnTriggeredEmployee = () =>
  createSelector(selectDashboardDomain, substate => substate.untriggeredEmployees);

export default makeSelectDashboard;
export { selectDashboardDomain, makeSelectTabValue, makeSelectLoading, makeSelectEmployeeList,
  makeSelectLeaveBalance,
  makeSelectEmployeeInfo, makeSelectEmployeeRole, makeSelectEmployeeLeaves,
  makeSelectLeaveData,
  makeSelectReviews,
  makeSelectEmpTransactions,
  makeSelectManagerLeaves,
  makeSelectYearlyEmployees, makeSelectEmployeesLeaveBalance,
  makeSelectCompOffBalance, makeSelectNextCompOffBalance, makeSelectEmpCompOffTransactions,
  makeSelectManagerCompOffTransactions, makeSelectHrCompOffTransactions,
  makeSelectWfhBalance, makeSelectEmpWfh, makeSelectManagerWfh, makeSelectHrWfh,
  makeSelectHolidayList, makeSelectOptionalHolidayList, makeSelectResourceType,
  makeSelectUnTriggeredEmployee
};
