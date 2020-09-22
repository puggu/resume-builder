/**
 *
 * AddHoliday
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';  
import { TextField, MenuItem } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

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
}));

function AddHoliday({holidays, postHoliday, deleteHoliday}) {
  const classes = useStyles();

  const tempHoliday = {
    "holiday_name": '',
    "holiday_date": new Date().toISOString().split('T')[0],
    "is_optional": false,
    isNew: true,
  };

  const [transactions, setTransactions] = useState(holidays);

  useEffect(() => {
    setTransactions(holidays);
  }, [holidays])

  const addNewHolidayTab = () => {
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
    setTransactions([...tempTransactions]);
  }

  const getPostData = () => transactions.filter(transaction => transaction.isNew)

  return (
    <div className={classes.root}>
      <div className="row">
        {/* <div className="col-12 pTop-0">
          <Typography variant="subtitle2" gutterBottom className="tabHeading">
            Add/Delete Holiday
          </Typography>
        </div> */}
        <div className="col-12" align="right">
          <Button variant="outlined" className={classes.secButton} onClick={() => setTransactions(holidays)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" className={classes.primaryButton} onClick={() => postHoliday(new Date().getFullYear(), getPostData())}>
            Save
          </Button>
        </div>
        <div className="col-12">
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="left">Holiday Name</TableCell>
                  <TableCell align="left">Holiday Type</TableCell>
                  <TableCell align="center">
                    <AddCircleIcon color="primary"
                      onClick={() => addNewHolidayTab()}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((row, index) => (
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
                    <TableCell align="left">
                      {row.isNew ? (
                        <TextField
                          id="select"
                          value={transactions[index].is_optional}
                          onChange={(e) => updateTransaction(index, e.target.value, 'is_optional')} 
                          select
                        >
                          <MenuItem value={true}>Optional</MenuItem>
                          <MenuItem value={false}>Mandatory</MenuItem>
                        </TextField>
                      ) : (row.is_optional ? 'Optional' : 'Mandatory')}
                    </TableCell>
                    <TableCell align="center">
                      {row.isNew ? (
                        <RemoveCircleOutlineIcon color="secondary" onClick={() => removeRow(index)}/>
                      ) : (
                        <DeleteIcon color="secondary" onClick={() => deleteHoliday(new Date().getFullYear(), transactions[index])}/>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

AddHoliday.propTypes = {
  holidays: PropTypes.array,
  postHoliday: PropTypes.func,
  deleteHoliday: PropTypes.func,
};

export default memo(AddHoliday);
