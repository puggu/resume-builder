import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { apiResponseSuccess, apiResponseError } from 'containers/App/actions';
import { makeSelectUser } from 'containers/App/selectors';
import {
  GET_ALL_EMPLOYEES,
  GET_LEAVE_BALANCE, GET_EMPLOYEE_INFO, GET_EMPLOYEE_ROLES, GET_LEAVES, POST_LEAVE, WITHDRAW_LEAVE,
  GET_COMPOFF_BALANCE, GET_NEXT_COMPOFF_BALANCE,
  GET_COMPOFF_TRANSACTIONS, POST_COMPOFF,
  GET_WFH_BALANCE, GET_WFH_TRANSACTIONS, POST_WFH,
  GET_OPTIONAL_HOLIDAY, DELETE_OPTIONAL_HOLIDAY, POST_OPTIONAL_HOLIDAY,
  GET_LEAVEDATA,
  GET_ALL_REVIEWS,
  GET_EMPTRANSACTIONS,
  GET_MANAGER_LEAVES, PUT_MANAGER_LEAVES_ACTIONS,
  PUT_COMPOFF, PUT_WFH,

  GET_YEARLY_EMPLOYEES, POST_YEARLY_EMPLOYEES, GET_EMPLOYEES_LEAVE_BALANCE, PUT_EMPLOYEE_LEAVE_BALANCE,

  GET_HOLIDAY, POST_HOLIDAY, DELETE_HOLIDAY,
  GET_RESOURCE_TYPE, PUT_RESOURCE_TYPE, GET_UNTRIGGERED_EMPLOYEES,
} from './constants';
import {
  getAllEmployeesSuccess, getAllEmployeesFailure,
  getLeaveBalance, getLeaveBalanceSuccess, getLeaveBalanceFailure,
  getEmployeeInfoSuccess, getEmployeeInfoFailure,
  getEmployeeRolesSuccess, getEmployeeRolesFailure,
  getLeaves, getLeavesSuccess, getLeavesFailure,
  postLeaveSuccess, postLeaveFailure,
  withdrawLeaveSuccess, withdrawLeaveFailure,
  getCompOffBalance, getCompOffBalanceSuccess, getCompOffBalanceFailure,
  getNextCompOffBalanceSuccess, getNextCompOffBalanceFailure,
  getCompOffTransactions, getCompOffTransactionsSuccess, getCompOffTransactionsFailure,
  postCompOffSuccess, postCompOffFailure,
  getWfhBalanceSuccess, getWfhBalanceFailure,
  getWfhTransactions, getWfhTransactionsSuccess, getWfhTransactionsFailure,
  postWfhSuccess, postWfhFailure,
  getOptionalHoliday, getOptionalHolidaySuccess, getOptionalHolidayFailure,
  deleteOptionalHolidaySuccess, deleteOptionalHolidayFailure,
  postOptionalHolidaySuccess, postOptionalHolidayFailure,getLeaveData,
  getLeaveDataSuccess,getLeaveDataFailure,

  getAllReviewsSuccess, getAllReviewsFailure,
  getEmpTransactionsSuccess,getEmpTransactionsFailure,
  getManagerLeaves, getManagerLeavesSuccess, getManagerLeavesFailure,
  putManagerLeavesActionsSuccess, putManagerLeavesActionsFailure,
  putCompOffSuccess, putCompOffFailure,
  putWfhSuccess, putWfhFailure,

  getYearlyEmployeesSuccess, getYearlyEmployeesFailure,
  postYearlyEmployeesSuccess, postYearlyEmployeesFailure,
  getEmployeesLeaveBalanceSuccess, getEmployeesLeaveBalanceFailure,
  putEmployeeLeaveBalanceSuccess, putEmployeeLeaveBalanceFailure,

  getHoliday, getHolidaySuccess, getHolidayFailure,
  postHolidaySuccess, postHolidayFailure,
  deleteHolidaySuccess, deleteHolidayFailure,
  getResourceType, getResourceTypeSuccess, getResourceTypeFailure,
  putResourceTypeSuccess, putResourceTypeFailure,
  getUntriggeredEmployeesSuccess, getUntriggeredEmployeesFailure,
} from './actions';
import request from 'utils/request';
import { API } from 'utils/constants';

function* getAllEmployeesList(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/employee_info`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const employees = yield call(request, reqUrl, headers);
    yield put(getAllEmployeesSuccess(Array.isArray(employees) ? employees : []));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching employees leave balance', error);
    yield put(getAllEmployeesFailure(error));
    // yield put(apiResponseError());
  }
}

function* getEmpLeaveBalance() {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/leave_balance?year=${new Date().getFullYear()}&emp_id=${authCode.employeeID}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const balance = yield call(request, reqUrl, headers);
    yield put(getLeaveBalanceSuccess(balance));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching leave balance', error);
    yield put(getLeaveBalanceFailure(error));
    // yield put(apiResponseError());
  }
}

function* getEmpInfo() {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/employee_info?emp_id=${authCode.employeeID}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const employeeinfo = yield call(request, reqUrl, headers);
    yield put(getEmployeeInfoSuccess(Array.isArray(employeeinfo) ? employeeinfo[0] : {}));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching employee info', error);
    yield put(getLeaveBalanceFailure(error));
    // yield put(apiResponseError());
  }
}

function* getEmpRole() {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/employee_info/reportees/${authCode.employeeID}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const employeeRole = yield call(request, reqUrl, headers);
    if(Array.isArray(employeeRole)) {
      yield put(getEmployeeRolesSuccess(true, employeeRole));
    } else {
      yield put(getEmployeeRolesSuccess(false, []));
    }
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching employee info', error);
    yield put(getEmployeeRolesFailure(error));
    // yield put(apiResponseError());
  }
}

function* getEmpLeaves() {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/apply_leave/${new Date().getFullYear()}?emp_id=${authCode.employeeID}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const leaves = yield call(request, reqUrl, headers);
    yield put(getLeavesSuccess(Array.isArray(leaves) ? leaves.reverse() : []));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching employee leaves', error);
    yield put(getLeavesFailure(error));
    // yield put(apiResponseError());
  }
}

function* postEmpLeave(action) {
  const authCode = yield select(makeSelectUser());
  const url = action.leave.leave_type == 'CL' || action.leave.leave_type == 'PL' ? 'apply_leave' : 'misc_leave';
  const reqUrl = `${API}/${url}`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('state'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.leave),
  };
  try {
    const leaves = yield call(request, reqUrl, headers);
    yield put(postLeaveSuccess());
    yield put(apiResponseSuccess(leaves.message));
    yield put(getLeaves());
    yield put(getLeaveBalance());
  } catch (error) {
    console.log('error fetching employee leaves', error);
    yield put(postLeaveFailure(error));
    yield put(apiResponseError(error.message ? error.message : (error.error ? error.error : '')));
  }
}

function* withdrawEmpLeave(action) {
  const authCode = yield select(makeSelectUser());
  const url = action.leave[0].leave_type == 'CL' || action.leave[0].leave_type == 'PL' || action.leave[0].leave_type == 'Unpaid-Leave' ? 'apply_leave' : 'misc_leave';
  const reqUrl = `${API}/${url}`;
  const headers = {
    method: 'PUT',
    headers: {
      Authorization: localStorage.getItem('state'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.leave),
  };
  try {
    const leaves = yield call(request, reqUrl, headers);
    yield put(withdrawLeaveSuccess())
    yield put(apiResponseSuccess(leaves.message || leaves.error));
    yield put(getLeaves());
    yield put(getLeaveBalance());
  } catch (error) {
    console.log('error withdrawing employee leave', error);
    yield put(withdrawLeaveFailure(error));
    yield put(apiResponseError());
  }
}

function* getEmpCompOffBalance() {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/comp_off/balance/${new Date().getFullYear()}/${authCode.employeeID}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const balance = yield call(request, reqUrl, headers);
    yield put(getCompOffBalanceSuccess(Array.isArray(balance) ? {...balance[0]} : {"applied_days": 0, "credited_days": 0, "approved_days": 0}));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching comp-off balance', error);
    yield put(getCompOffBalanceFailure(error));
    // yield put(apiResponseError());
  }
}

function* getEmpNextCompOffBalance() {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/comp_off/balance/${new Date().getFullYear() + 1}/${authCode.employeeID}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const balance = yield call(request, reqUrl, headers);
    yield put(getNextCompOffBalanceSuccess(Array.isArray(balance) ? {...balance[0]} : {"applied_days": 0, "credited_days": 0, "approved_days": 0}));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching comp-off balance', error);
    yield put(getNextCompOffBalanceFailure(error));
    // yield put(apiResponseError());
  }
}

function* postCompOffs(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/comp_off`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('state'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.compOff),
  };
  try {
    const leaves = yield call(request, reqUrl, headers);
    yield put(postCompOffSuccess())
    yield put(apiResponseSuccess());
    // yield put(getLeaves());
    // yield put(getLeaveBalance());
  } catch (error) {
    console.log('error posting employee comp-off', error);
    yield put(postCompOffFailure(error));
    yield put(apiResponseError());
  }
}

function* getCompOffs(action) {
  const authCode = yield select(makeSelectUser());
  var user = '';
  if(action.user == 'employee') user = `?emp_id=${authCode.employeeID}`
  else if(action.user == 'manager') user = `?approver_id=${authCode.employeeID}`
  const reqUrl = `${API}/comp_off/${new Date().getFullYear()}${user}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    var transaction = yield call(request, reqUrl, headers);
    if(new Date().getMonth() == 11) {
      const reqUrl1 = `${API}/comp_off/${new Date().getFullYear() + 1}${user}`;
      var transaction1 = yield call(request, reqUrl1, headers);
      if(Array.isArray(transaction1)) {
        if(Array.isArray(transaction)) transaction = transaction.concat(transaction1);
        else transaction = transaction1;
      }
    }
    yield put(getCompOffTransactionsSuccess(action.user, Array.isArray(transaction) ? transaction.reverse() : []));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching comp-off transactions', error);
    yield put(getCompOffTransactionsFailure(error));
    // yield put(apiResponseError());
  }
}

function* getWfhBalance() {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/wfh/balance/${new Date().getFullYear()}/${authCode.employeeID}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const balance = yield call(request, reqUrl, headers);
    yield put(getWfhBalanceSuccess(balance));
    // yield put(getWfhBalanceSuccess(Array.isArray(balance) ? {...balance[0]} : {"applied_days": 0, "credited_days": 0, "approved_days": 0}));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching comp-off balance', error);
    yield put(getWfhBalanceFailure(error));
    // yield put(apiResponseError());
  }
}

function* getAllWfhTransactions(action) {
  const authCode = yield select(makeSelectUser());
  var user = '';
  if(action.user == 'employee') user = `?emp_id=${authCode.employeeID}`
  else if(action.user == 'manager') user = `?approver_id=${authCode.employeeID}`
  const reqUrl = `${API}/wfh/${new Date().getFullYear()}${user}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    var transaction = yield call(request, reqUrl, headers);
    yield put(getWfhTransactionsSuccess(action.user, Array.isArray(transaction) ? transaction.reverse() : []));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching wfh transactions', error);
    yield put(getWfhTransactionsFailure(error));
    // yield put(apiResponseError());
  }
}

function* postWfh(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/wfh`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('state'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.transaction),
  };
  try {
    const wfh = yield call(request, reqUrl, headers);
    yield put(postWfhSuccess())
    yield put(apiResponseSuccess(wfh.message));
  } catch (error) {
    console.log('error posting employee wfh', error);
    yield put(postWfhFailure(error));
    yield put(apiResponseError());
  }
}

function* getOptionalHolidayList(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/optional_holidays/${action.year}?emp_id=${authCode.employeeID}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const holidays = yield call(request, reqUrl, headers);
    yield put(getOptionalHolidaySuccess(Array.isArray(holidays) ? holidays : []));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching optional holidays', error);
    yield put(getOptionalHolidayFailure(error));
    // yield put(apiResponseError());
  }
}

function* postOptionalHoliday(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/optional_holidays`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('state'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.optionalHoliday),
  };
  try {
    const holiday = yield call(request, reqUrl, headers);
    yield put(postOptionalHolidaySuccess());
    if(holiday.message) yield put(apiResponseSuccess(holiday.message));
    else if(holiday.error) yield put(postOptionalHolidayFailure(holiday.error));
    else yield put(apiResponseSuccess());
    yield put(getOptionalHoliday(action.year));
  } catch (error) {
    console.log('error posting holiday', error);
    yield put(postOptionalHolidayFailure(error));
    yield put(apiResponseError());
  }
}

function* deleteOptionalHoliday(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/optional_holidays/${authCode.employeeID}/${action.optionalHoliday.holiday_date}`;
  const headers = {
    method: 'DELETE',
    headers: {
      Authorization: localStorage.getItem('state'),
      // 'Content-Type': 'application/json',
    },
    // body: JSON.stringify(action.holiday),
  };
  try {
    const holiday = yield call(request, reqUrl, headers);
    yield put(deleteHolidaySuccess());
    if(holiday.message) yield put(apiResponseSuccess(holiday.message));
    else if(holiday.error) yield put(apiResponseError(holiday.error));
    else yield put(apiResponseSuccess());
    yield put(getHoliday(action.year));
  } catch (error) {
    console.log('error deleting holiday', error);
    yield put(deleteHolidayFailure(error));
    yield put(apiResponseError());
  }
}

function* getLeavedata(action) {
  const authCode = yield select(makeSelectUser());
  const urls = [
    `${API}/leave_balance?year=${action.year}&emp_id=${action.emp_id}`,
    `${API}/apply_leave/${action.year}?emp_id=${action.emp_id}`,
    `${API}/comp_off/balance/${action.year}/${action.emp_id}`,
    `${API}/comp_off/${action.year}?emp_id=${action.emp_id}`,
    `${API}/wfh/balance/${action.year}/${action.emp_id}`,
    `${API}/wfh/${action.year}?emp_id=${action.emp_id}`,
    `${API}/holidays/${action.year}`,
    `${API}/optional_holidays/${action.year}?emp_id=${action.emp_id}`,
  ];
  // {console.log(action.year)}
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  
  const callArray = urls.map(reqUrl => call(request, reqUrl, headers));
  try {
    var leaveData = yield all(callArray);
    leaveData[0]=Array.isArray(leaveData[0]) ? leaveData[0] : [];
    leaveData[1]=Array.isArray(leaveData[1]) ? leaveData[1] : [];
    leaveData[2]=Array.isArray(leaveData[2]) ? {...leaveData[2][0]} : {"applied_days": 0, "credited_days": 0, "approved_days": 0};
    leaveData[3]=Array.isArray(leaveData[3]) ? leaveData[3] : [];
    leaveData[4]=Array.isArray(leaveData[3]) ? leaveData[4] : [];
    leaveData[5]=Array.isArray(leaveData[5]) ? leaveData[5] : [];
    leaveData[6]=Array.isArray(leaveData[6]) ? leaveData[6] : [];
    leaveData[7]=Array.isArray(leaveData[7]) ? leaveData[7] : [];
    // console.log('leave data',leaveData)
    yield put(getLeaveDataSuccess(Array.isArray(leaveData) ? leaveData : []));
  } catch (error) {
    console.log('error fetching leaveData', error);
    yield put(getLeaveDataFailure(error));
  } 
}


//--------------------------------Manager Saga--------------------------------
function* getReviews(action) {
  const authCode = yield select(makeSelectUser());
  const urls = [];
  const managersUrls = [
    `${API}/apply_leave/${new Date().getFullYear()}?approver_id=${authCode.employeeID}`,
    `${API}/wfh/${new Date().getFullYear()}?approver_id=${authCode.employeeID}`,
    `${API}/comp_off/${new Date().getFullYear()}?approver_id=${authCode.employeeID}`,
    `${API}/comp_off/${new Date().getFullYear() + 1}?approver_id=${authCode.employeeID}`
  ];
  const hrUrl = [
    `${API}/apply_leave/${new Date().getFullYear()}`,
    `${API}/wfh/${new Date().getFullYear()}`,
    `${API}/comp_off/${new Date().getFullYear()}`,
    `${API}/comp_off/${new Date().getFullYear() + 1}`
  ]
  urls.push(...managersUrls);
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  if(action.isHr) urls.push(...hrUrl);
  const callArray = urls.map(reqUrl => call(request, reqUrl, headers));
  try {
    const reviews = yield all(callArray);
    yield put(getAllReviewsSuccess(reviews));
  } catch (error) {
    console.log('error fetching reviews', error);
    yield put(getAllReviewsFailure(error));
  }
}

function* getEmpTransactions(action) {
  const authCode = yield select(makeSelectUser());
  const urls = [];
  const managersUrls = [
    `${API}/apply_leave/${action.year}?approver_id=${authCode.employeeID}`,
    `${API}/wfh/${action.year}?approver_id=${authCode.employeeID}`,
    `${API}/comp_off/${action.year}?approver_id=${authCode.employeeID}`,
    `${API}/comp_off/${action.year + 1}?approver_id=${authCode.employeeID}`
  ];
  const hrUrl = [
    `${API}/apply_leave/${action.year}`,
    `${API}/wfh/${action.year}`,
    `${API}/comp_off/${action.year}`,
    `${API}/comp_off/${action.year + 1}`
  ]
  urls.push(...managersUrls);
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  if(action.isHr) urls.push(...hrUrl);
  const callArray = urls.map(reqUrl => call(request, reqUrl, headers));
  try {
    const empTransactions = yield all(callArray);
    yield put(getEmpTransactionsSuccess(empTransactions));
  } catch (error) {
    console.log('error fetching transactions', error);
    yield put(getEmpTransactionsFailure(error));
  }
}



function* getManagersLeaves(action) {
  const authCode = yield select(makeSelectUser());
  const view = action.view == 'hr' ? '' : `?approver_id=${authCode.employeeID}`
  const reqUrl = `${API}/apply_leave/${new Date().getFullYear()}${view}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const leaves = yield call(request, reqUrl, headers);
    yield put(getManagerLeavesSuccess(Array.isArray(leaves) ? leaves.reverse() : []));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching managers leaves', error);
    yield put(getManagerLeavesFailure(error));
    // yield put(apiResponseError());
  }
}

function* putManagerApproveReject(action) {
  const authCode = yield select(makeSelectUser());
  const url = action.leaves[0].leave_type == 'CL' || action.leaves[0].leave_type == 'PL' || action.leaves[0].leave_type == 'Unpaid-Leave' ? 'apply_leave' : 'misc_leave';
  const reqUrl = `${API}/${url}`;
  const headers = {
    method: 'PUT',
    headers: {
      Authorization: localStorage.getItem('state'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.leaves),
  };
  try {
    const leaves = yield call(request, reqUrl, headers);
    yield put(putManagerLeavesActionsSuccess());
    yield put(apiResponseSuccess(leaves.message || leaves.error));
    yield put(getManagerLeaves());
  } catch (error) {
    console.log('error in approve/reject employee leave', error);
    yield put(putManagerLeavesActionsFailure(error));
    yield put(apiResponseError());
  }
}

function* putCompOffAction(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/comp_off`;
  const headers = {
    method: 'PUT',
    headers: {
      Authorization: localStorage.getItem('state'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.compOff),
  };
  try {
    const compOff = yield call(request, reqUrl, headers);
    yield put(putCompOffSuccess())
    yield put(apiResponseSuccess(compOff.message));
    // yield put(getCompOffTransactions(action.user));
  } catch (error) {
    console.log('error in approve/reject employee compoff', error);
    yield put(putCompOffFailure(error));
    yield put(apiResponseError());
  }
}

function* putWfh(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/wfh`;
  const headers = {
    method: 'PUT',
    headers: {
      Authorization: localStorage.getItem('state'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.transaction),
  };
  try {
    const wfh = yield call(request, reqUrl, headers);
    yield put(putWfhSuccess())
    yield put(apiResponseSuccess(wfh.message));
    // yield put(getWfhTransactions(action.user));
  } catch (error) {
    console.log('error put employee wfh', error);
    yield put(putWfhFailure(error));
    yield put(apiResponseError());
  }
}

//----------------------------------HR Saga----------------------------------------------
function* getYearlyEmployeesList(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/employee_info?year=${action.year}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const employees = yield call(request, reqUrl, headers);
    yield put(getYearlyEmployeesSuccess(Array.isArray(employees) ? employees : []));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching employees leave balance', error);
    yield put(getYearlyEmployeesFailure(error));
    // yield put(apiResponseError());
  }
}

function* postYearlyEmployeesList(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/leave_balance`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('state'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.employees),
  };
  try {
    yield call(request, reqUrl, headers);
    yield put(postYearlyEmployeesSuccess());
    yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching employees leave balance', error);
    yield put(postYearlyEmployeesFailure(error));
    yield put(apiResponseError());
  }
}

function* getAllEmpLeaveBalance(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/leave_balance?year=${action.year}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const balance = yield call(request, reqUrl, headers);
    yield put(getEmployeesLeaveBalanceSuccess(balance));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching employees leave balance', error);
    yield put(getEmployeesLeaveBalanceFailure(error));
    // yield put(apiResponseError());
  }
}

function* putEmpLeaveBalance(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/leave_balance`;
  const headers = {
    method: 'PUT',
    headers: {
      Authorization: localStorage.getItem('state'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.leaveBalance),
  };
  try {
    yield call(request, reqUrl, headers);
    yield put(putEmployeeLeaveBalanceSuccess());
    yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error putting employee leave balance', error);
    yield put(putEmployeeLeaveBalanceFailure(error));
    yield put(apiResponseError());
  }
}


function* getHolidayList(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/holidays/${action.year}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const holidays = yield call(request, reqUrl, headers);
    yield put(getHolidaySuccess(Array.isArray(holidays) ? holidays : []));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching holidays', error);
    yield put(getHolidayFailure(error));
    // yield put(apiResponseError());
  }
}

function* postHoliday(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/holidays`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('state'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.holiday),
  };
  try {
    const holiday = yield call(request, reqUrl, headers);
    yield put(postHolidaySuccess());
    yield put(apiResponseSuccess(holiday.message));
    yield put(getHoliday(action.year));
  } catch (error) {
    console.log('error posting holiday', error);
    yield put(postHolidayFailure(error));
    yield put(apiResponseError());
  }
}

function* deleteHoliday(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/holidays/${action.holiday.holiday_date}`;
  const headers = {
    method: 'DELETE',
    headers: {
      Authorization: localStorage.getItem('state'),
      // 'Content-Type': 'application/json',
    },
    // body: JSON.stringify(action.holiday),
  };
  try {
    const holiday = yield call(request, reqUrl, headers);
    yield put(deleteHolidaySuccess());
    yield put(apiResponseSuccess(holiday.message));
    yield put(getHoliday(action.year));
  } catch (error) {
    console.log('error deleting holiday', error);
    yield put(deleteHolidayFailure(error));
    yield put(apiResponseError());
  }
}
const initResourceType = [
  {
      "data": {},
      "resource_type": "CL"
  },
  {
      "data": {},
      "resource_type": "Comp-Off"
  },
  {
      "data": {},
      "resource_type": "WFH"
  },
  {
      "data": {},
      "resource_type": "Unpaid-Leave"
  },
  {
      "data": {},
      "resource_type": "Maternity-Leave"
  },
  {
      "data": {},
      "resource_type": "Paternity-Leave"
  },
  {
      "data": {},
      "resource_type": "OTT"
  },
  {
      "data": {},
      "resource_type": "PL"
  },
  {
      "data": {},
      "resource_type": "Optional-Holiday"
  }
];
function* getResourceList(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/resource_type`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const resource = yield call(request, reqUrl, headers);
    yield put(getResourceTypeSuccess(Array.isArray(resource) ? resource : initResourceType));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching holidays', error);
    yield put(getResourceTypeFailure(error));
    // yield put(apiResponseError());
  }
}

function* putResource(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/resource_type`;
  const headers = {
    method: 'PUT',
    headers: {
      Authorization: localStorage.getItem('state'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.resource),
  };
  try {
    const resource = yield call(request, reqUrl, headers);
    yield put(putResourceTypeSuccess());
    yield put(apiResponseSuccess(resource.message));
    yield put(getResourceType());
  } catch (error) {
    console.log('error putting resource', error);
    yield put(putResourceTypeFailure(error));
    yield put(apiResponseError());
  }
}

function* getUntriggered(action) {
  const authCode = yield select(makeSelectUser());
  const reqUrl = `${API}/optional_holidays/${action.year}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('state')
    },
  };
  try {
    const employees = yield call(request, reqUrl, headers);
    yield put(getUntriggeredEmployeesSuccess(Array.isArray(employees.UnActivated) ? employees.UnActivated : []));
    // yield put(apiResponseSuccess());
  } catch (error) {
    console.log('error fetching optional holidays', error);
    yield put(getOptionalHolidayFailure(error));
    // yield put(apiResponseError());
  }
}

// Individual exports for testing
export default function* dashboardSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ALL_EMPLOYEES, getAllEmployeesList);
  yield takeLatest(GET_LEAVES, getEmpLeaves);
  yield takeLatest(GET_EMPLOYEE_INFO, getEmpInfo);
  yield takeLatest(GET_EMPLOYEE_ROLES, getEmpRole);
  yield takeLatest(GET_LEAVE_BALANCE, getEmpLeaveBalance);
  yield takeLatest(POST_LEAVE, postEmpLeave);
  yield takeLatest(WITHDRAW_LEAVE, withdrawEmpLeave);
  yield takeLatest(GET_COMPOFF_BALANCE, getEmpCompOffBalance);
  yield takeLatest(GET_NEXT_COMPOFF_BALANCE, getEmpNextCompOffBalance);
  yield takeLatest(GET_COMPOFF_TRANSACTIONS, getCompOffs);
  yield takeLatest(POST_COMPOFF, postCompOffs);
  yield takeLatest(GET_WFH_BALANCE, getWfhBalance);
  yield takeLatest(GET_WFH_TRANSACTIONS, getAllWfhTransactions);
  yield takeLatest(POST_WFH, postWfh);

  yield takeLatest(GET_OPTIONAL_HOLIDAY, getOptionalHolidayList);
  yield takeLatest(POST_OPTIONAL_HOLIDAY, postOptionalHoliday);
  yield takeLatest(DELETE_OPTIONAL_HOLIDAY, deleteOptionalHoliday);

  yield takeLatest(GET_LEAVEDATA, getLeavedata);

  //------------------------------------Manager Saga-----------------------
  yield takeLatest(GET_ALL_REVIEWS, getReviews);
  yield takeLatest(GET_EMPTRANSACTIONS, getEmpTransactions);
  yield takeLatest(GET_MANAGER_LEAVES, getManagersLeaves);
  yield takeLatest(PUT_MANAGER_LEAVES_ACTIONS, putManagerApproveReject);
  yield takeLatest(PUT_COMPOFF, putCompOffAction);
  yield takeLatest(PUT_WFH, putWfh);

  //------------------------------------HR Saga-----------------------
  yield takeLatest(GET_YEARLY_EMPLOYEES, getYearlyEmployeesList);
  yield takeLatest(POST_YEARLY_EMPLOYEES, postYearlyEmployeesList);
  yield takeLatest(GET_EMPLOYEES_LEAVE_BALANCE, getAllEmpLeaveBalance);
  yield takeLatest(PUT_EMPLOYEE_LEAVE_BALANCE, putEmpLeaveBalance);

  yield takeLatest(GET_HOLIDAY, getHolidayList);
  yield takeLatest(POST_HOLIDAY, postHoliday);
  yield takeLatest(DELETE_HOLIDAY, deleteHoliday);

  yield takeLatest(GET_RESOURCE_TYPE, getResourceList);
  yield takeLatest(PUT_RESOURCE_TYPE, putResource);
  yield takeLatest(GET_UNTRIGGERED_EMPLOYEES, getUntriggered);
}
