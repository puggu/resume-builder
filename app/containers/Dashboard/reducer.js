/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, PUT_TAB_VALUE,
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

export const initialState = {
  value: 0,
  loading: true,
  employeeList: [],
  leaveBalance: {},
  employeeInfo: {},
  isApprover: false,
  reportees: [],
  leaves: [],
  managerLeaves: [],
  yearlyEmployeesList: [],
  employeesLeaveBalance: [],
  compOffBalance: {
    availedCompOff: 0,
    approvedCompOff: 0,
    appliedCompOff: 0,
  },
  nextCompOffBalance: {
    availedCompOff: 0,
    approvedCompOff: 0,
    appliedCompOff: 0,
  },
  empCompOffTransactions: [],
  managerCompOffTransactions: [],
  hrCompOffTransactions: [],
  wfhBalance: {
    "Applied": 0,
    "Acknowledged": 0,
    "Approved": 0
  },
  empWfh: [],
  managerWfh: [],
  hrWfh: [],
  holidayList: [],
  optionalHolidayList: [],
  leaveData: [
    {},
    [],
    {
      availedCompOff: 0,
      approvedCompOff: 0,
      appliedCompOff: 0,
    },
    [],
    {
      "Applied": 0,
      "Acknowledged": 0,
      "Approved": 0
    },
    [],
    [],
    []
  ],
  reviews: [],
  empTransactions: [],
  untriggeredEmployees: [],
  resourceType: [
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
  ],
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case PUT_TAB_VALUE:
        draft.value = action.tabValue;
        break;
      case GET_ALL_EMPLOYEES:
        break;
      case GET_ALL_EMPLOYEES_SUCCESS:
        draft.employeeList = action.employees;
        break;
      case GET_ALL_EMPLOYEES_FAILURE:
        break;
      case GET_LEAVE_BALANCE:
        draft.loading = true;
        break;
      case GET_LEAVE_BALANCE_SUCCESS:
        draft.loading = false;
        draft.leaveBalance = action.leaves;
        break;
      case GET_LEAVE_BALANCE_FAILURE:
        draft.loading = false;
        break;
      case GET_EMPLOYEE_INFO:
        draft.loading = true;
        break;
      case GET_EMPLOYEE_INFO_SUCCESS:
        draft.loading = false;
        draft.employeeInfo = action.employeeInfo;
        break;
      case GET_EMPLOYEE_INFO_FAILURE:
        draft.loading = false;
        break;
      case GET_EMPLOYEE_ROLES:
        // draft.loading = true;
        break;
      case GET_EMPLOYEE_ROLES_SUCCESS:
        // draft.loading = false;
        draft.isApprover = action.employeeRole;
        draft.reportees = action.reportees;
        break;
      case GET_EMPLOYEE_ROLES_FAILURE:
        // draft.loading = false;
        draft.isApprover = false;
        break;
      case GET_LEAVES:
        draft.loading = true;
        break;
      case GET_LEAVES_SUCCESS:
        draft.loading = false;
        draft.leaves = action.leaves;
        break;
      case GET_LEAVES_FAILURE:
        draft.loading = false;
        break;
      case POST_LEAVE:
        draft.loading = true;
        break;
      case POST_LEAVE_SUCCESS:
        draft.loading = false;
        break;
      case POST_LEAVE_FAILURE:
        draft.loading = false;
        break;
      case WITHDRAW_LEAVE:
        draft.loading = true;
        break;
      case WITHDRAW_LEAVE_SUCCESS:
        draft.loading = false;
        break;
      case WITHDRAW_LEAVE_FAILURE:
        draft.loading = false;
        break;
      case GET_COMPOFF_BALANCE:
        draft.loading = true;
        break;
      case GET_COMPOFF_BALANCE_SUCCESS:
        draft.loading = false;
        draft.compOffBalance = action.compOffBalance;
        break;
      case GET_COMPOFF_BALANCE_FAILURE:
        draft.loading = false;
        break;
      case GET_NEXT_COMPOFF_BALANCE:
        draft.loading = true;
        break;
      case GET_NEXT_COMPOFF_BALANCE_SUCCESS:
        draft.loading = false;
        draft.nextCompOffBalance = action.compOffBalance;
        break;
      case GET_NEXT_COMPOFF_BALANCE_FAILURE:
        draft.loading = false;
        break;
      case GET_COMPOFF_TRANSACTIONS:
        draft.loading = true;
        break;
      case GET_COMPOFF_TRANSACTIONS_SUCCESS:
        draft.loading = false;
        if(action.user == 'employee') draft.empCompOffTransactions = action.transactions;
        else if(action.user == 'manager') draft.managerCompOffTransactions = action.transactions;
        else if(action.user == 'hr') draft.hrCompOffTransactions = action.transactions;
        break;
      case GET_COMPOFF_TRANSACTIONS_FAILURE:
        draft.loading = false;
        break;
      case POST_COMPOFF:
        draft.loading = true;
        break;
      case POST_COMPOFF_SUCCESS:
        draft.loading = false;
        break;
      case POST_COMPOFF_FAILURE:
        draft.loading = false;
        break;
      case GET_WFH_BALANCE:
        draft.loading = true;
        break;
      case GET_WFH_BALANCE_SUCCESS:
        draft.loading = false;
        draft.wfhBalance = action.wfhBalance;
        break;
      case GET_WFH_BALANCE_FAILURE:
        draft.loading = false;
        break;
      case GET_WFH_TRANSACTIONS:
        draft.loading = true;
        break;
      case GET_WFH_TRANSACTIONS_SUCCESS:
        draft.loading = false;
        if(action.user == 'employee') draft.empWfh = action.transactions;
        else if(action.user == 'manager') draft.managerWfh = action.transactions;
        else if(action.user == 'hr') draft.hrWfh = action.transactions;
        break;
      case GET_WFH_TRANSACTIONS_FAILURE:
        draft.loading = false;
        break;
      case POST_WFH:
        draft.loading = true;
        break;
      case POST_WFH_SUCCESS:
        draft.loading = false;
        break;
      case POST_WFH_FAILURE:
        draft.loading = false;
        break;
      case GET_OPTIONAL_HOLIDAY:
        draft.loading = true;
        break;
      case GET_OPTIONAL_HOLIDAY_SUCCESS:
        draft.loading = false;
        draft.optionalHolidayList = action.optionalHoliday;
        break;
      case GET_OPTIONAL_HOLIDAY_FAILURE:
        draft.loading = false;
        break;
      case POST_OPTIONAL_HOLIDAY:
        draft.loading = true;
        break;
      case POST_OPTIONAL_HOLIDAY_SUCCESS:
        draft.loading = false;
        break;
      case POST_OPTIONAL_HOLIDAY_FAILURE:
        draft.loading = false;
        break;
      case DELETE_OPTIONAL_HOLIDAY:
        draft.loading = true;
        break;
      case DELETE_OPTIONAL_HOLIDAY_SUCCESS:
        draft.loading = false;
        break;
      case DELETE_OPTIONAL_HOLIDAY_FAILURE:
        draft.loading = false;
        break;
      case GET_LEAVEDATA:
        draft.loading = true;
        draft.leaveData=[
          {},
          [],
          {
            availedCompOff: 0,
            approvedCompOff: 0,
            appliedCompOff: 0,
          },
          [],
          {
            "Applied": 0,
            "Acknowledged": 0,
            "Approved": 0
          },
          [],
          [],
          []
        ];
        break;
      case GET_LEAVEDATA_SUCCESS:
        draft.loading = false;
        draft.leaveData = action.leaveData;
        break;
      case GET_LEAVEDATA_FAILURE:
        draft.loading = false;
        break;

      case GET_ALL_REVIEWS:
        draft.loading = true;
        break;
      case GET_ALL_REVIEWS_SUCCESS:
        draft.loading = false;
        draft.reviews = action.reviews;
        break;
      case GET_ALL_REVIEWS_FAILURE:
        draft.loading = false;
        break;
      case GET_EMPTRANSACTIONS:
        draft.loading = true;
        break;
      case GET_EMPTRANSACTIONS_SUCCESS:
        draft.loading = false;
        draft.empTransactions = action.empTransactions;
        break;
      case GET_EMPTRANSACTIONS_FAILURE:
        draft.loading = false;
        break;
      case GET_MANAGER_LEAVES:
        draft.loading = true;
        break;
      case GET_MANAGER_LEAVES_SUCCESS:
        draft.loading = false;
        draft.managerLeaves = action.leaves;
        break;
      case GET_MANAGER_LEAVES_FAILURE:
        draft.loading = false;
        break;
      case PUT_MANAGER_LEAVES_ACTIONS:
        draft.loading = true;
        break;
      case PUT_MANAGER_LEAVES_ACTIONS_SUCCESS:
        draft.loading = false;
        break;
      case PUT_MANAGER_LEAVES_ACTIONS_FAILURE:
        draft.loading = false;
        break;
      case PUT_COMPOFF:
        draft.loading = true;
        break;
      case PUT_COMPOFF_SUCCESS:
        draft.loading = false;
        break;
      case PUT_COMPOFF_FAILURE:
        draft.loading = false;
        break;
      case PUT_WFH:
        draft.loading = true;
        break;
      case PUT_WFH_SUCCESS:
        draft.loading = false;
        break;
      case PUT_WFH_FAILURE:
        draft.loading = false;
        break;


      case GET_YEARLY_EMPLOYEES:
        draft.loading = true;
        break;
      case GET_YEARLY_EMPLOYEES_SUCCESS:
        draft.loading = false;
        draft.yearlyEmployeesList = action.employees;
        break;
      case GET_YEARLY_EMPLOYEES_FAILURE:
        draft.loading = false;
        break;
      case POST_YEARLY_EMPLOYEES:
        draft.loading = true;
        break;
      case POST_YEARLY_EMPLOYEES_SUCCESS:
        draft.loading = false;
        draft.yearlyEmployeesList = [];
        break;
      case POST_YEARLY_EMPLOYEES_FAILURE:
        draft.loading = false;
        break;
      case GET_EMPLOYEES_LEAVE_BALANCE:
        draft.loading = true;
        break;
      case GET_EMPLOYEES_LEAVE_BALANCE_SUCCESS:
        draft.loading = false;
        draft.employeesLeaveBalance = action.employeesLeaveBalance;
        break;
      case GET_EMPLOYEES_LEAVE_BALANCE_FAILURE:
        draft.loading = false;
        break;
      case PUT_EMPLOYEE_LEAVE_BALANCE:
        draft.loading = true;
        break;
      case PUT_EMPLOYEE_LEAVE_BALANCE_SUCCESS:
        draft.loading = false;
        break;
      case PUT_EMPLOYEE_LEAVE_BALANCE_FAILURE:
        draft.loading = false;
        break;

      case GET_HOLIDAY:
        draft.loading = true;
        break;
      case GET_HOLIDAY_SUCCESS:
        draft.loading = false;
        draft.holidayList = action.holiday;
        break;
      case GET_HOLIDAY_FAILURE:
        draft.loading = false;
        break;
      case POST_HOLIDAY:
        draft.loading = true;
        break;
      case POST_HOLIDAY_SUCCESS:
        draft.loading = false;
        break;
      case POST_HOLIDAY_FAILURE:
        draft.loading = false;
        break;
      case DELETE_HOLIDAY:
        draft.loading = true;
        break;
      case DELETE_HOLIDAY_SUCCESS:
        draft.loading = false;
        break;
      case DELETE_HOLIDAY_FAILURE:
        draft.loading = false;
        break;

      case GET_RESOURCE_TYPE:
        draft.loading = true;
        break;
      case GET_RESOURCE_TYPE_SUCCESS:
        draft.loading = false;
        draft.resourceType = action.resourceType;
        break;
      case GET_RESOURCE_TYPE_FAILURE:
        draft.loading = false;
        break;
      case PUT_RESOURCE_TYPE:
        draft.loading = true;
        break;
      case PUT_RESOURCE_TYPE_SUCCESS:
        draft.loading = false;
        break;
      case PUT_RESOURCE_TYPE_FAILURE:
        draft.loading = false;
        break;
      case GET_UNTRIGGERED_EMPLOYEES:
        draft.loading = true;
        break;
      case GET_UNTRIGGERED_EMPLOYEES_SUCCESS:
        draft.untriggeredEmployees = action.employees;
        draft.loading = false;
        break;
      case GET_UNTRIGGERED_EMPLOYEES_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default dashboardReducer;
