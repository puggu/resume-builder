/**
 *
 * RequestCompOff
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import { TextField, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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

function RequestCompOff({employeeInfo, postCompOff}) {
  const classes = useStyles();

  const initCompOffData = {
    "emp_id": employeeInfo.emp_id,
    "emp_name": employeeInfo.first_name + " " + employeeInfo.last_name,
    "approver_id": employeeInfo.du_head_id,
    "approver_name": employeeInfo.du_head_name,
    "year":  new Date().getMonth() > 10 ? new Date().getFullYear() + 1 : new Date().getFullYear(),
    "from_date": new Date().toISOString().split('T')[0],
    "to_date": new Date().toISOString().split('T')[0],
    "from_half": "H1",
    "to_half": "H2",
    "days": 0,
    "comp_off_status": "Requested",
    "reason": "",
    "dsr": "",
  }
 
  const [compOff, setCompOff] = useState(initCompOffData);

  const differenceInDate = (d1, d2, h1, h2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    var difference = (date2.getTime() - date1.getTime())/(1000 * 3600 * 24);
    if(h1 == 'H1') difference += 0.5;
    if(h2 == 'H2') difference += 0.5;
    return difference;
  }

  const disableSubmit = () => {
    const days = differenceInDate(compOff.from_date, compOff.to_date, compOff.from_half, compOff.to_half);
    if(days == 0 || compOff.reason == '' || compOff.dsr == '') return true;
    else return false;
  }

  const handleSubmit = () => {
    console.log({...compOff});
  }

  return (
    <div className={classes.root}>
      <div className="row">
        <div className="col-6">
          <FormLabel component="legend">From Date</FormLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              // maxDate={compOff.to_date}
              value={compOff.from_date}
              onChange={from_date => setCompOff({...compOff, from_date: from_date.toISOString().split('T')[0]})}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="col-6">
          <FormLabel component="legend">From Half</FormLabel>
          <RadioGroup row aria-label="position" name="from half" value={compOff.from_half} onChange={e => setCompOff({...compOff, from_half: e.target.value})}>
            <FormControlLabel
              value="H1"
              control={<Radio color="primary" />}
              label="First Half"
            />
            <FormControlLabel
              value="H2"
              control={<Radio color="primary" />}
              label="Second Half"
            />
          </RadioGroup>
        </div>
        <div className="col-6">
          <FormLabel component="legend">To Date</FormLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              minDate={compOff.from_date}
              value={compOff.to_date}
              onChange={to_date => setCompOff({...compOff, to_date: to_date.toISOString().split('T')[0]})}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="col-6">
          <FormLabel component="legend">To Half</FormLabel>
          <RadioGroup row aria-label="position" name="to half" value={compOff.to_half} onChange={e => setCompOff({...compOff, to_half: e.target.value})}>
            <FormControlLabel
              value="H1"
              control={<Radio color="primary" />}
              label="First Half"
            />
            <FormControlLabel
              value="H2"
              control={<Radio color="primary" />}
              label="Second Half"
            />
          </RadioGroup>
        </div>
        <div className="col-6">
          <FormLabel component="legend">Reason</FormLabel>
          <TextareaAutosize aria-label="minimum height" className={classes.textArea} rows={3} value={compOff.reason} onChange={e => setCompOff({...compOff, reason: e.target.value})}/>
        </div>
        <div className="col-6">
          <FormLabel component="legend">DSR</FormLabel>
          <TextareaAutosize aria-label="minimum height" className={classes.textArea} rows={3} value={compOff.dsr} onChange={e => setCompOff({...compOff, dsr: e.target.value})}/>
        </div>
        <div className="col-12">
          <Button variant="outlined" className={classes.secButton} onClick={() => setCompOff(initCompOffData)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" disabled={disableSubmit()} onClick={() => postCompOff(compOff)}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

RequestCompOff.propTypes = {
  employeeInfo: PropTypes.object,
  postCompOff: PropTypes.func,
};

export default memo(RequestCompOff);
