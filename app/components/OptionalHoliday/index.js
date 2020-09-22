/**
 *
 * OptionalHoliday
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';  
import { TextField } from '@material-ui/core';

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
  w100per: {
    minWidth: '200px'
  }
}));

function OptionalHoliday({ employeeInfo, holidayList, optionalHolidayList, postOptionalHoliday, deleteOptionalHoliday, triggerData }) {
  const classes = useStyles();

  const tempHoliday = {
    "holiday_name": '',
    "holiday_date": new Date().toISOString().split('T')[0],
    "emp_id": employeeInfo.emp_id,
    isNew: true,
  };

  const [transactions, setTransactions] = useState(optionalHolidayList);
  const [maxHoliday, setMaxHoliday] = useState(0);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    setTransactions(optionalHolidayList);
    setMaxHoliday(triggerData.days ? triggerData.days : 0);
    if(triggerData.days) {
      const today = new Date();
      const sd = new Date(triggerData.from);
      const ed = new Date(triggerData.to);
      setIsTriggered(sd <= today && today <= ed);
    }
  }, [optionalHolidayList])

  const addNewHolidayTab = () => {
    if(maxHoliday <= transactions.length || !isTriggered) return;
    setTransactions(transactions.concat(tempHoliday));
  }

  const removeRow = index => {
    const tempTransactions = transactions;
    const element = tempTransactions.splice(index, 1);
    setTransactions([...tempTransactions]);
  }

  const updateTransaction = (index, value, name) => {
    var tempTransactions = transactions;
    tempTransactions[index][name] = value;
    if(name == 'holiday_date') {
      const holiday = holidayList.find(holiday => holiday.holiday_date == value);
      if(holiday) tempTransactions[index].holiday_name = holiday.holiday_name;
    }
    setTransactions([...tempTransactions]);
  }

  const getPostData = () => transactions.filter(transaction => transaction.isNew);

  function returndate(dates) {
    return new Date(Date.parse(dates));
  }
  const sort_transactions= transactions.sort((a, b) => returndate(a.holiday_date) - returndate(b.holiday_date));
  

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom align="center">
        {isTriggered ? `Add upto ${maxHoliday} holidays till ${new Date(triggerData.to).toDateString()}` : 'Your Optional Holidays'}
      </Typography>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Holiday Name</TableCell>
                <TableCell align="center">
                  <AddCircleIcon color="primary"
                    onClick={() => addNewHolidayTab()}
                    disabled={maxHoliday == transactions.length || !isTriggered}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sort_transactions.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.isNew ? (
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          value={transactions[index].holiday_date}
                          onChange={date => updateTransaction(index, new Date(date).toISOString().split('T')[0], 'holiday_date')}
                        />
                      </MuiPickersUtilsProvider>
                    ) : (new Date(row.holiday_date).toDateString())}
                  </TableCell>
                  <TableCell align="left">
                    {row.isNew ? (
                      <TextField value={transactions[index].holiday_name} onChange={(e) => updateTransaction(index, e.target.value, 'holiday_name')}/>
                    ) : (row.holiday_name)}
                  </TableCell>
                  <TableCell align="center">
                    {row.isNew ? (
                      <RemoveCircleOutlineIcon color="secondary" onClick={() => removeRow(index)}/>
                    ) : (
                      <DeleteIcon color="secondary" disabled={!isTriggered} onClick={() => { if(isTriggered) deleteOptionalHoliday(new Date().getFullYear(), transactions[index]) }}/>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      <div className="col-12" align="right">
        <Button variant="outlined" className={classes.secButton} disabled={!isTriggered} onClick={() => setTransactions(optionalHolidayList)}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" disabled={maxHoliday != transactions.length || !isTriggered} className={classes.primaryButton} onClick={() => postOptionalHoliday(new Date().getFullYear(), getPostData())}>
          Save
        </Button>
      </div>
    </div>
  );
}

OptionalHoliday.propTypes = {
  employeeInfo: PropTypes.object,
  holidayList: PropTypes.array,
  optionalHolidayList: PropTypes.array,
  postOptionalHoliday: PropTypes.func,
  deleteOptionalHoliday: PropTypes.func,
  triggerData: PropTypes.object,
};

export default memo(OptionalHoliday);
