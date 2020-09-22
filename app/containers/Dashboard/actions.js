/*
 *
 * Dashboard actions
 *
 */

import {
  DEFAULT_ACTION, PUT_TAB_VALUE,
  GET_ALL_EMPLOYEES, GET_ALL_EMPLOYEES_SUCCESS, GET_ALL_EMPLOYEES_FAILURE,
  GET_LEAVE_BALANCE, GET_LEAVE_BALANCE_SUCCESS, GET_LEAVE_BALANCE_FAILURE,
  GET_EMPLOYEE_INFO, GET_EMPLOYEE_INFO_SUCCESS, GET_EMPLOYEE_INFO_FAILURE,
  GET_EMPLOYEE_ROLES, GET_EMPLOYEE_ROLES_SUCCESS, GET_EMPLOYEE_ROLES_FAILURE,
  GET_LEAVES, GET_LEAVES_SUCCESS, GET_LEAVES_FAILURE,
  POST_LEAVE, POST_LEAVE_SUCCESS, POST_LEAVE_FAILURE,
  WITHDRAW_LEAVE, WITHDRAW_LEAVE_SUCCESS, WITHDRAW_LEAVE_FAILURE,
  GET_COMPOFF_BALANCE, GET_COMPOFF_BALANCE_SUCCESS, GET_COMPOFF_BALANCE_FAILURE,
  GET_NEXT_COMPOFF_BALANCE, GET_NEXT_COMPOFF_BALANCE_SUCCESS, GET_NEXT_COMPOFF_BALANCE_FAILURE,
  GET_COMPOFF_TRANSACTIONS, GET_COMPOFF_TRANSACTIONS_SUCCESS, GET_COMPOFF_TRANSACTIONS_FAILURE,
  POST_COMPOFF, POST_COMPOFF_SUCCESS, POST_COMPOFF_FAILURE,
  GET_WFH_BALANCE, GET_WFH_BALANCE_SUCCESS, GET_WFH_BALANCE_FAILURE,
  GET_WFH_TRANSACTIONS, GET_WFH_TRANSACTIONS_SUCCESS, GET_WFH_TRANSACTIONS_FAILURE,
  POST_WFH, POST_WFH_SUCCESS, POST_WFH_FAILURE,
  GET_OPTIONAL_HOLIDAY, GET_OPTIONAL_HOLIDAY_SUCCESS, GET_OPTIONAL_HOLIDAY_FAILURE,
  POST_OPTIONAL_HOLIDAY, POST_OPTIONAL_HOLIDAY_SUCCESS, POST_OPTIONAL_HOLIDAY_FAILURE,
  DELETE_OPTIONAL_HOLIDAY, DELETE_OPTIONAL_HOLIDAY_SUCCESS, DELETE_OPTIONAL_HOLIDAY_FAILURE,
  GET_LEAVEDATA,GET_LEAVEDATA_SUCCESS,GET_LEAVEDATA_FAILURE,

  GET_ALL_REVIEWS, GET_ALL_REVIEWS_SUCCESS, GET_ALL_REVIEWS_FAILURE,
  GET_EMPTRANSACTIONS, GET_EMPTRANSACTIONS_SUCCESS, GET_EMPTRANSACTIONS_FAILURE,
  GET_MANAGER_LEAVES, GET_MANAGER_LEAVES_SUCCESS, GET_MANAGER_LEAVES_FAILURE,
  PUT_MANAGER_LEAVES_ACTIONS, PUT_MANAGER_LEAVES_ACTIONS_SUCCESS, PUT_MANAGER_LEAVES_ACTIONS_FAILURE,
  PUT_COMPOFF, PUT_COMPOFF_SUCCESS, PUT_COMPOFF_FAILURE,
  PUT_WFH, PUT_WFH_SUCCESS, PUT_WFH_FAILURE,

  GET_YEARLY_EMPLOYEES, GET_YEARLY_EMPLOYEES_SUCCESS, GET_YEARLY_EMPLOYEES_FAILURE,
  POST_YEARLY_EMPLOYEES, POST_YEARLY_EMPLOYEES_SUCCESS, POST_YEARLY_EMPLOYEES_FAILURE,
  GET_EMPLOYEES_LEAVE_BALANCE, GET_EMPLOYEES_LEAVE_BALANCE_SUCCESS, GET_EMPLOYEES_LEAVE_BALANCE_FAILURE,
  PUT_EMPLOYEE_LEAVE_BALANCE, PUT_EMPLOYEE_LEAVE_BALANCE_SUCCESS, PUT_EMPLOYEE_LEAVE_BALANCE_FAILURE,

  GET_HOLIDAY, GET_HOLIDAY_SUCCESS, GET_HOLIDAY_FAILURE,
  POST_HOLIDAY, POST_HOLIDAY_SUCCESS, POST_HOLIDAY_FAILURE,
  DELETE_HOLIDAY, DELETE_HOLIDAY_SUCCESS, DELETE_HOLIDAY_FAILURE,
  GET_RESOURCE_TYPE, GET_RESOURCE_TYPE_SUCCESS, GET_RESOURCE_TYPE_FAILURE,
  PUT_RESOURCE_TYPE, PUT_RESOURCE_TYPE_SUCCESS, PUT_RESOURCE_TYPE_FAILURE,
  GET_UNTRIGGERED_EMPLOYEES, GET_UNTRIGGERED_EMPLOYEES_SUCCESS, GET_UNTRIGGERED_EMPLOYEES_FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function putTabValue(tabValue) {
  return {
    type: PUT_TAB_VALUE,
    tabValue,
  };
}

export function getAllEmployees() {
  return {
    type: GET_ALL_EMPLOYEES,
  };
}

export function getAllEmployeesSuccess(employeeList) {
  const employees = employeeList.sort((e1, e2) => (e1.first_name + ' ' + e1.last_name > e2.first_name + ' ' + e2.last_name) ? 1 : -1)
  return {
    type: GET_ALL_EMPLOYEES_SUCCESS,
    employees,
  };
}

export function getAllEmployeesFailure(error) {
  return {
    type: GET_ALL_EMPLOYEES_FAILURE,
    error
  };
}


//--------------------------------Employee Actions---------------------------
export function getLeaveBalance() {
  return {
    type: GET_LEAVE_BALANCE,
  };
}

export function getLeaveBalanceSuccess(leaveBalance) {
  var leaves = {
    approvedPL: 0, appliedPL: 0, balancePL: 0, creditPL: 0, carryForwardPL: 0,
    approvedCL: 0, appliedCL: 0, balanceCL: 0, creditCL: 0, carryForwardCL: 0,
    approvedUL: 0, appliedUL: 0, balanceUL: 0, creditUL: 0, carryForwardUL: 0
  };
  leaveBalance.forEach((bal, index) => {
    if(bal.leave_type == "PL")
      leaves = {...leaves, approvedPL: bal.approved_leaves, appliedPL: bal.applied_leaves, balancePL: bal.balance_leaves, creditPL: bal.credit_leaves, carryForwardPL: bal.carry_forward_leaves,}
    if(bal.leave_type == "CL")
      leaves = {...leaves, approvedCL: bal.approved_leaves, appliedCL: bal.applied_leaves, balanceCL: bal.balance_leaves, creditCL: bal.credit_leaves, carryForwardCL: bal.carry_forward_leaves,}
    else if(bal.leave_type == "Unpaid-Leave")
      leaves = {...leaves, approvedUL: bal.approved_leaves, appliedUL: bal.applied_leaves, balanceUL: bal.balance_leaves, creditUL: bal.credit_leaves, carryForwarUCL: bal.carry_forward_leaves,}
  });
  return {
    type: GET_LEAVE_BALANCE_SUCCESS,
    leaves,
  };
}

export function getLeaveBalanceFailure() {
  return {
    type: GET_LEAVE_BALANCE_FAILURE,
  };
}

export function getEmployeeInfo() {
  return {
    type: GET_EMPLOYEE_INFO,
  };
}

export function getEmployeeInfoSuccess(employeeInfo) {
  return {
    type: GET_EMPLOYEE_INFO_SUCCESS,
    employeeInfo,
  };
}

export function getEmployeeInfoFailure(error) {
  return {
    type: GET_EMPLOYEE_INFO_FAILURE,
    error,
  };
}

export function getEmployeeRoles() {
  return {
    type: GET_EMPLOYEE_ROLES,
  };
}

export function getEmployeeRolesSuccess(employeeRole, reportees) {
  return {
    type: GET_EMPLOYEE_ROLES_SUCCESS,
    employeeRole, reportees
  };
}

export function getEmployeeRolesFailure(error) {
  return {
    type: GET_EMPLOYEE_ROLES_FAILURE,
    error,
  };
}

export function getLeaves() {
  return {
    type: GET_LEAVES,
  }
}

export function getLeavesSuccess(leaves) {
  return {
    type: GET_LEAVES_SUCCESS,
    leaves: leaves.sort(function(a, b) {
      a = new Date(a.apply_withdraw_date);
      b = new Date(b.apply_withdraw_date);
      return a>b ? -1 : a<b ? 1 : 0;
    }),
  }
}

export function getLeavesFailure(error) {
  return {
    type: GET_LEAVES_FAILURE,
    error,
  }
}

export function postLeave(leave) {
  return {
    type: POST_LEAVE,
    leave,
  }
}

export function postLeaveSuccess() {
  return {
    type: POST_LEAVE_SUCCESS,
  }
}

export function postLeaveFailure(error) {
  return {
    type: POST_LEAVE_FAILURE,
    error,
  }
}

export function withdrawLeave(leave) {
  return {
    type: WITHDRAW_LEAVE,
    leave,
  }
}

export function withdrawLeaveSuccess() {
  return {
    type: WITHDRAW_LEAVE_SUCCESS,
  }
}

export function withdrawLeaveFailure(error) {
  return {
    type: WITHDRAW_LEAVE_FAILURE,
    error,
  }
}

export function getCompOffBalance() {
  return {
    type: GET_COMPOFF_BALANCE,
  }
}

export function getCompOffBalanceSuccess(balance) {
  const compOffBalance = {
    availedCompOff: balance.credited_days,
    approvedCompOff: balance.approved_days,
    appliedCompOff: balance.applied_days,
  };
  return {
    type: GET_COMPOFF_BALANCE_SUCCESS,
    compOffBalance,
  }
}

export function getCompOffBalanceFailure(error) {
  return {
    type: GET_COMPOFF_BALANCE_FAILURE,
    error
  }
}

export function getNextCompOffBalance() {
  return {
    type: GET_NEXT_COMPOFF_BALANCE,
  }
}

export function getNextCompOffBalanceSuccess(balance) {
  const compOffBalance = {
    availedCompOff: balance.credited_days,
    approvedCompOff: balance.approved_days,
    appliedCompOff: balance.applied_days,
  };
  return {
    type: GET_NEXT_COMPOFF_BALANCE_SUCCESS,
    compOffBalance,
  }
}

export function getNextCompOffBalanceFailure(error) {
  return {
    type: GET_NEXT_COMPOFF_BALANCE_FAILURE,
    error
  }
}

export function getCompOffTransactions(user) {
  return {
    type: GET_COMPOFF_TRANSACTIONS,
    user
  }
}

export function getCompOffTransactionsSuccess(user, transactions) {
  return {
    type: GET_COMPOFF_TRANSACTIONS_SUCCESS,
    user,
    transactions: transactions.sort(function(a, b) {
      a = new Date(a.from_date);
      b = new Date(b.from_date);
      return a>b ? -1 : a<b ? 1 : 0;
    }),
  }
}

export function getCompOffTransactionsFailure(error) {
  return {
    type: GET_COMPOFF_TRANSACTIONS_FAILURE,
    error
  }
}

export function postCompOff(compOff) {
  return {
    type: POST_COMPOFF,
    compOff,
  }
}

export function postCompOffSuccess() {
  return {
    type: POST_COMPOFF_SUCCESS,
  }
}

export function postCompOffFailure(error) {
  return {
    type: POST_COMPOFF_FAILURE,
    error,
  }
}

export function getWfhBalance() {
  return {
    type: GET_WFH_BALANCE,
  }
}

export function getWfhBalanceSuccess(wfhBalance) {
  return {
    type: GET_WFH_BALANCE_SUCCESS,
    wfhBalance
  }
}

export function getWfhBalanceFailure(error) {
  return {
    type: GET_WFH_BALANCE_FAILURE,
    error
  }
}

export function getWfhTransactions(user) {
  return {
    type: GET_WFH_TRANSACTIONS,
    user
  }
}

export function getWfhTransactionsSuccess(user, transactions) {
  return {
    type: GET_WFH_TRANSACTIONS_SUCCESS,
    user,
    transactions: transactions.sort(function(a, b) {
      a = new Date(a.from_date);
      b = new Date(b.from_date);
      return a>b ? -1 : a<b ? 1 : 0;
    })
  }
}

export function getWfhTransactionsFailure(error) {
  return {
    type: GET_WFH_TRANSACTIONS_FAILURE,
    error
  }
}

export function postWfh(transaction) {
  return {
    type: POST_WFH,
    transaction
  }
}

export function postWfhSuccess() {
  return {
    type: POST_WFH_SUCCESS,
  }
}

export function postWfhFailure(error) {
  return {
    type: POST_WFH_FAILURE,
    error
  }
}

export function getOptionalHoliday(year) {
  return {
    type: GET_OPTIONAL_HOLIDAY,
    year,
  }
}

export function getOptionalHolidaySuccess(optionalHoliday) {
  return {
    type: GET_OPTIONAL_HOLIDAY_SUCCESS,
    optionalHoliday
  }
}

export function getOptionalHolidayFailure(error) {
  return {
    type: GET_OPTIONAL_HOLIDAY_FAILURE,
    error,
  }
}

export function postOptionalHoliday(year, optionalHoliday) {
  return {
    type: POST_OPTIONAL_HOLIDAY,
    year, optionalHoliday
  }
}

export function postOptionalHolidaySuccess() {
  return {
    type: POST_OPTIONAL_HOLIDAY_SUCCESS,
  }
}

export function postOptionalHolidayFailure(error) {
  return {
    type: POST_OPTIONAL_HOLIDAY_FAILURE,
    error,
  }
}

export function deleteOptionalHoliday(year, optionalHoliday) {
  return {
    type: DELETE_OPTIONAL_HOLIDAY,
    year, optionalHoliday
  }
}

export function deleteOptionalHolidaySuccess() {
  return {
    type: DELETE_OPTIONAL_HOLIDAY_SUCCESS,
  }
}

export function deleteOptionalHolidayFailure(error) {
  return {
    type: DELETE_OPTIONAL_HOLIDAY_FAILURE,
    error,
  }
}

export function getLeaveData(year,emp_id){
  // console.log('selected year',year,emp_id)
  return{
    type: GET_LEAVEDATA,
    year,emp_id 
  }
}

export function getLeaveDataSuccess(leaveData){
  var leaves = {
    approvedPL: 0, appliedPL: 0, balancePL: 0, creditPL: 0, carryForwardPL: 0,
    approvedCL: 0, appliedCL: 0, balanceCL: 0, creditCL: 0, carryForwardCL: 0,
    approvedUL: 0, appliedUL: 0, balanceUL: 0, creditUL: 0, carryForwardUL: 0
  };
  leaveData[0].forEach((bal, index) => {
    if(bal.leave_type == "PL")
      leaves = {...leaves, approvedPL: bal.approved_leaves, appliedPL: bal.applied_leaves, balancePL: bal.balance_leaves, creditPL: bal.credit_leaves, carryForwardPL: bal.carry_forward_leaves,}
    if(bal.leave_type == "CL")
      leaves = {...leaves, approvedCL: bal.approved_leaves, appliedCL: bal.applied_leaves, balanceCL: bal.balance_leaves, creditCL: bal.credit_leaves, carryForwardCL: bal.carry_forward_leaves,}
    else if(bal.leave_type == "Unpaid-Leave")
      leaves = {...leaves, approvedUL: bal.approved_leaves, appliedUL: bal.applied_leaves, balanceUL: bal.balance_leaves, creditUL: bal.credit_leaves, carryForwarUCL: bal.carry_forward_leaves,}
  });
  const compOffBalance = {
    availedCompOff: leaveData[2].credited_days,
    approvedCompOff: leaveData[2].approved_days,
    appliedCompOff: leaveData[2].applied_days,
  };
  leaveData[0]=leaves;
  leaveData[2]=compOffBalance;
  // {console.log('leave data action',leaveData)}
  return{
    type: GET_LEAVEDATA_SUCCESS,
    leaveData
  }
}

export function getLeaveDataFailure(error){
  return{
    type: GET_LEAVEDATA_FAILURE,
    error,
  }
}

//--------------------------------Manager Actions--------------------------------------
export function getAllReviews(isHr) {
  return {
    type: GET_ALL_REVIEWS,
    isHr
  }
}

export function getAllReviewsSuccess(reviews) {
  const refinedReviews = reviews.map(review => Array.isArray(review) ? review : []);
  return {
    type: GET_ALL_REVIEWS_SUCCESS,
    reviews: refinedReviews,
  }
}

export function getAllReviewsFailure(error) {
  return {
    type: GET_ALL_REVIEWS_FAILURE,
    error,
  }
}

export function getAllEmpTransactions(isHr,year) {
  return {
    type: GET_EMPTRANSACTIONS,
    isHr,year
  }
}

export function getEmpTransactionsSuccess(empTransactions) {
  const refinedTransactions = empTransactions.map(transaction => Array.isArray(transaction) ? transaction : []);
  return {
    type: GET_EMPTRANSACTIONS_SUCCESS,
    empTransactions: refinedTransactions,
  }
}

export function getEmpTransactionsFailure(error) {
  return {
    type: GET_EMPTRANSACTIONS_FAILURE,
    error,
  }
}

export function getManagerLeaves(view) {
  return {
    type: GET_MANAGER_LEAVES,
    view
  }
}

export function getManagerLeavesSuccess(leaves) {
  return {
    type: GET_MANAGER_LEAVES_SUCCESS,
    leaves,
  }
}

export function getManagerLeavesFailure(error) {
  return {
    type: GET_MANAGER_LEAVES_FAILURE,
    error,
  }
}

export function putManagerLeavesActions(leaves) {
  return {
    type: PUT_MANAGER_LEAVES_ACTIONS,
    leaves
  }
}

export function putManagerLeavesActionsSuccess() {
  return {
    type: PUT_MANAGER_LEAVES_ACTIONS_SUCCESS,
  }
}

export function putManagerLeavesActionsFailure(error) {
  return {
    type: PUT_MANAGER_LEAVES_ACTIONS_FAILURE,
    error
  }
}

export function putCompOff(compOff) {
  return {
    type: PUT_COMPOFF,
    compOff
  }
}

export function putCompOffSuccess() {
  return {
    type: PUT_COMPOFF_SUCCESS,
  }
}

export function putCompOffFailure(error) {
  return {
    type: PUT_COMPOFF_FAILURE,
    error
  }
}

export function putWfh(transaction) {
  return {
    type: PUT_WFH,
    transaction
  }
}

export function putWfhSuccess() {
  return {
    type: PUT_WFH_SUCCESS,
  }
}

export function putWfhFailure(error) {
  return {
    type: PUT_WFH_FAILURE,
    error
  }
}


//--------------------------------HR Actions--------------------------------------
export function getYearlyEmployees(year) {
  return {
    type: GET_YEARLY_EMPLOYEES,
    year,
  };
}

export function getYearlyEmployeesSuccess(employees) {
  return {
    type: GET_YEARLY_EMPLOYEES_SUCCESS,
    employees,
  };
}

export function getYearlyEmployeesFailure(error) {
  return {
    type: GET_YEARLY_EMPLOYEES_FAILURE,
    error,
  };
}

export function postYearlyEmployees(employees) {
  return {
    type: POST_YEARLY_EMPLOYEES,
    employees,
  };
}

export function postYearlyEmployeesSuccess() {
  return {
    type: POST_YEARLY_EMPLOYEES_SUCCESS,
  };
}

export function postYearlyEmployeesFailure(error) {
  return {
    type: POST_YEARLY_EMPLOYEES_FAILURE,
    error,
  };
}

export function getEmployeesLeaveBalance(year) {
  return {
    type: GET_EMPLOYEES_LEAVE_BALANCE,
    year,
  };
}

export function getEmployeesLeaveBalanceSuccess(leaveBalance) {
  const empleave =   {
    "leave_type": "PL",
    "emp_id": "AFTI0019",
    "emp_name": "Deepanshu Bansal",
    "credit_leaves": 10,
    "approved_leaves": 0,
    "year": 2020,
    "id": 6,
    "carry_forward_leaves": 10,
    "applied_leaves": 0,
    "balance_leaves": 20
  }
  var employeesLeaveBalance = [];
  const leave = {
    emp_name: '', emp_id: '', year: 0,
    approvedPL: 0, appliedPL: 0, balancePL: 0, creditPL: 0, carryForwardPL: 0,
    approvedCL: 0, appliedCL: 0, balanceCL: 0, creditCL: 0, carryForwardCL: 0,
  };
  if(!Array.isArray(leaveBalance)) {
      return {
      type: GET_EMPLOYEES_LEAVE_BALANCE_SUCCESS,
      employeesLeaveBalance,
    }
  } else {
    leaveBalance.forEach((bal, index) => {
      const i = employeesLeaveBalance.findIndex(e => e.emp_id == bal.emp_id);
      if(i == -1) {
        var tempLeave = {...leave, emp_name: bal.emp_name, emp_id: bal.emp_id, year: bal.year};
        if(bal.leave_type == 'CL')
          tempLeave = {...tempLeave, approvedCL: bal.approved_leaves, appliedCL: bal.applied_leaves,
            balanceCL: bal.balance_leaves, creditCL: bal.credit_leaves, carryForwardCL: bal.carry_forward_leaves
          };
        else if(bal.leave_type == 'PL')
          tempLeave = {...tempLeave, approvedPL: bal.approved_leaves, appliedPL: bal.applied_leaves,
            balancePL: bal.balance_leaves, creditPL: bal.credit_leaves, carryForwardPL: bal.carry_forward_leaves
          };
        employeesLeaveBalance.push(tempLeave);
      } else {
        var tempLeave = employeesLeaveBalance[i];
        if(bal.leave_type == 'CL')
          employeesLeaveBalance[i] = {...tempLeave, approvedCL: bal.approved_leaves, appliedCL: bal.applied_leaves,
            balanceCL: bal.balance_leaves, creditCL: bal.credit_leaves, carryForwardCL: bal.carry_forward_leaves
          };
        else if(bal.leave_type == 'PL')
          employeesLeaveBalance[i] = {...tempLeave, approvedPL: bal.approved_leaves, appliedPL: bal.applied_leaves,
            balancePL: bal.balance_leaves, creditPL: bal.credit_leaves, carryForwardPL: bal.carry_forward_leaves
          };
      }
    });
    return {
      type: GET_EMPLOYEES_LEAVE_BALANCE_SUCCESS,
      employeesLeaveBalance,
    };
  }
}

export function getEmployeesLeaveBalanceFailure() {
  return {
    type: GET_EMPLOYEES_LEAVE_BALANCE_FAILURE,
  };
}

export function putEmployeeLeaveBalance(leaveBalance) {
  return {
    type: PUT_EMPLOYEE_LEAVE_BALANCE,
    leaveBalance,
  };
}

export function putEmployeeLeaveBalanceSuccess() {
  return {
    type: PUT_EMPLOYEE_LEAVE_BALANCE_SUCCESS,
  };
}

export function putEmployeeLeaveBalanceFailure(error) {
  return {
    type: PUT_EMPLOYEE_LEAVE_BALANCE_FAILURE,
    error,
  };
}

export function getHoliday(year) {
  return {
    type: GET_HOLIDAY,
    year
  }
}

export function getHolidaySuccess(holiday) {
  return {
    type: GET_HOLIDAY_SUCCESS,
    holiday
  }
}

export function getHolidayFailure(error) {
  return {
    type: GET_HOLIDAY_FAILURE,
    error
  }
}

export function postHoliday(year, holiday) {
  return {
    type: POST_HOLIDAY,
    year, holiday
  }
}

export function postHolidaySuccess() {
  return {
    type: POST_HOLIDAY_SUCCESS,
  }
}

export function postHolidayFailure(error) {
  return {
    type: POST_HOLIDAY_FAILURE,
    error
  }
}

export function deleteHoliday(year, holiday) {
  return {
    type: DELETE_HOLIDAY,
    year, holiday
  }
}

export function deleteHolidaySuccess() {
  return {
    type: DELETE_HOLIDAY_SUCCESS,
  }
}

export function deleteHolidayFailure(error) {
  return {
    type: DELETE_HOLIDAY_FAILURE,
    error
  }
}

export function getResourceType() {
  return {
    type: GET_RESOURCE_TYPE,
  }
}

export function getResourceTypeSuccess(resourceType) {
  return {
    type: GET_RESOURCE_TYPE_SUCCESS,
    resourceType,
  }
}

export function getResourceTypeFailure(error) {
  return {
    type: GET_RESOURCE_TYPE_FAILURE,
    error
  }
}

export function putResourceType(resource) {
  return {
    type: PUT_RESOURCE_TYPE,
    resource
  }
}

export function putResourceTypeSuccess() {
  return {
    type: PUT_RESOURCE_TYPE_SUCCESS,
  }
}

export function putResourceTypeFailure(error) {
  return {
    type: PUT_RESOURCE_TYPE_FAILURE,
    error
  }
}

export function getUntriggeredEmployees(year) {
  return {
    type: GET_UNTRIGGERED_EMPLOYEES,
    year
  }
}

export function getUntriggeredEmployeesSuccess(employees) {
  return {
    type: GET_UNTRIGGERED_EMPLOYEES_SUCCESS,
    employees
  }
}

export function getUntriggeredEmployeesFailure(error) {
  return {
    type: GET_UNTRIGGERED_EMPLOYEES_FAILURE,
    error
  }
}