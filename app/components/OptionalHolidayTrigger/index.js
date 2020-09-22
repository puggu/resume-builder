/**
 *
 * OptionalHolidayTrigger
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import { TextField, Button, FormLabel } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'react-select';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  selectLeave: {
    margin: '10px',
    padding: '20px',
    textAlign: 'center'
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
  primaryButton: {
    padding: '5px',
    margin: '5px',
    width: '100px'
  },
  w100per: {
    minWidth: '200px'
  },
  dialoge2: {
    height: '300px !important'
  },
  mar10: {
    margin: '10px !important'
  }
}));


function OptionalHolidayTrigger({ holidays, postOptionalHoliday, 
  resourceType, getResourceType, putResourceType, 
  getUntriggeredEmployees, unTriggeredEmployee, employeeList
}) {
  const classes = useStyles();
  
  const [employees, setEmployees] = useState([]);
  const [seleRows, setSeleRows] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [triggerDialouge, setTriggerDialouge] = useState(false);
  const [postDialouge, setPostDialouge] = useState(false);
  const [selectedOH, setSelectedOH] = useState([]);
  const [triggerData, setTriggerData] = useState({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
    days: 0
  })

  const openPostDialouge = () => {
    setPostDialouge(true);
  };

  const closePostDialouge = () => {
    setPostDialouge(false);
  };

  const openTriggerDialouge = () => {
    setTriggerDialouge(true);
  };

  const closeTriggerDialouge = () => {
    setTriggerDialouge(false);
  };
  
  useEffect(() => {
    getUntriggeredEmployees(new Date().getFullYear());
    getResourceType();
  }, []);

  useEffect(() => {
    const tempEmployees = employeeList.filter(emp => unTriggeredEmployee.includes(emp.emp_id));
    const uniqueEmployees = [];
    const uniqueObject = {};
    for (let i in tempEmployees) { 
      uniqueObject[tempEmployees[i]['emp_id']] = tempEmployees[i]; 
    }
    for (let i in uniqueObject) { 
      uniqueEmployees.push(uniqueObject[i]); 
    } 
    setEmployees(uniqueEmployees);
  }, [unTriggeredEmployee]);

  const setRowsSel = (employees) => {
    setSeleRows(employees)
  };

  const columns = [
    {
      name: "emp_id",
      label: "Employee ID",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "first_name",
      label: "First Name",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "manager_name",
      label: "Manager",
      options: {
        filter: true,
        sort: true,
        filterList: filteredList[3],
      }
    },
    {
      name: "du_head_name",
      label: "DU Head",
      options: {
        filter: true,
        sort: true,
        filterList: filteredList[4],
      }
    }
  ];

  const options = {
    filterType: 'checkbox',
    rowsSelected: seleRows,
    onRowsSelect: (row, rows) => setSeleRows(rows.map(row => row.dataIndex)),
    viewColumns: false,
    disableToolbarSelect: true,
    searchText: searchedText,
    onSearchChange: (searchText) => setSearchedText(searchText),
    viewColumns: false,
    onFilterChange: (changedColumn, filterList, type) => setFilteredList(filterList)
  };

  const selectOHOptions = () => {
    const tempOptions = [];
    holidays.forEach(holiday => {
      if(holiday.is_optional)  tempOptions.push({label: holiday.holiday_name, value: holiday.holiday_date})
    });
    return tempOptions;
  }

  const handleSubmitPost = () => {
    closePostDialouge();
    const postArray = [];
    seleRows.forEach((row) => {
      selectedOH.forEach((holiday) => {
        postArray.push({emp_id: employees[row].emp_id, holiday_date: holiday.value, holiday_name: holiday.label});
      });
    });
    postOptionalHoliday(new Date().getFullYear(), postArray);
    setSelectedOH([]);
  }

  const setEmpTrigger = () => {
    var data = {};
    seleRows.forEach(row => {
      data = {...data, [employees[row].emp_id]: triggerData}
    });
    return data;
  }

  const handleSubmitTrigger = () => {
    closeTriggerDialouge();
    const oHRes = resourceType.find(res => res.resource_type == 'Optional-Holiday');
    const year = new Date().getFullYear();
    const currData = oHRes.data.trigger[year] ? oHRes.data.trigger[year] : {};
    const putArray = [{
      resource_type: 'Optional-Holiday',
      data: {
        trigger: {
          [year] : {...currData, ...setEmpTrigger()}
        }
      }
    }];
    putResourceType(putArray);
  }

  return (
    <div className={classes.root}>
       <div>
        <Dialog open={triggerDialouge} onClose={closeTriggerDialouge} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Trigger Optional Holiday</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select date and number of days.
            </DialogContentText>
            <TextField
              className={classes.mar10}
              autoFocus
              margin="dense"
              value={triggerData.days}
              onChange={e => setTriggerData({...triggerData, days: parseInt(e.target.value)})}
              id="days"
              label="Days"
              type="number"
            />
            <div className={classes.mar10}>
              <FormLabel component="legend">From Date</FormLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  value={triggerData.from}
                  onChange={from => setTriggerData({...triggerData, from: from.toISOString().split('T')[0]})}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.mar10}>
              <FormLabel component="legend">To Date</FormLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  value={triggerData.to}
                  onChange={to => setTriggerData({...triggerData, to: to.toISOString().split('T')[0]})}
                />
              </MuiPickersUtilsProvider>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeTriggerDialouge} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={() => handleSubmitTrigger()} color="primary" variant="contained">
              Trigger
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={postDialouge} onClose={closePostDialouge} aria-labelledby="form-dialog-title" fullWidth={true}>
          <DialogTitle id="form-dialog-title">Post Optional Holidays</DialogTitle>
          <DialogContent className={classes.dialoge2}>
            <DialogContentText>
              Select Leaves
            </DialogContentText>
            <Select
              value={selectedOH}
              isMulti
              name="Select Optional Holidays"
              options={selectOHOptions()}
              onChange={(e) => setSelectedOH([...e])}
              placeholder="Select Holidays"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closePostDialouge} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={() => handleSubmitPost()} color="primary" variant="contained" disabled={selectedOH.length == 0}>
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="row">
        <div className="col-12" align="right">
          <Button className={classes.primaryButton} variant="contained" color="primary" onClick={openTriggerDialouge} disabled={seleRows.length == 0}>
            Trigger
          </Button>
          <Button className={classes.primaryButton} variant="contained" color="primary" onClick={openPostDialouge} disabled={seleRows.length == 0}>
            Post
          </Button>
        </div>
        <div className="col-12">
          <MUIDataTable data={employees} columns={columns} options={options} title={'Employee List'}/>
        </div>
      </div>
    </div>
  );
}

OptionalHolidayTrigger.propTypes = {
  holidays: PropTypes.array,
  postOptionalHoliday: PropTypes.func,
  resourceType: PropTypes.array,
  getResourceType: PropTypes.func,
  putResourceType: PropTypes.func,
  getUntriggeredEmployees: PropTypes.func,
  unTriggeredEmployee: PropTypes.array,
  employeeList: PropTypes.array,
};

export default memo(OptionalHolidayTrigger);
