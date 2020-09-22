/**
 *
 * ApplyCompOff
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
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

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
  },
  formHelperText: {
    color: 'rgba(199, 29, 29, 0.78) !important',
  }
}));

function ApplyCompOff({employeeInfo, postCompOff, compOffBalance, nextCompOffBalance}) {
  const classes = useStyles();

  const initCompOffData = {
    "emp_id": employeeInfo.emp_id,
    "emp_name": employeeInfo.first_name + " " + employeeInfo.last_name,
    "approver_id": employeeInfo.manager_id,
    "approver_name": employeeInfo.manager_name,
    "year": new Date().getFullYear(),
    "from_date": new Date().toISOString().split('T')[0],
    "to_date": new Date().toISOString().split('T')[0],
    "from_half": "H1",
    "to_half": "H2",
    "days": 0,
    "comp_off_status": "Applied",
    "reason": "",
    "dsr": "",
  }
 
  const [compOff, setCompOff] = useState(initCompOffData);
  const [approver, setApprover] = useState('Manager');

  const handleApproverChange = (value) => {
    if(value == 'Manager') {
      setApprover('Manager');
      setCompOff({...compOff, approver_id: employeeInfo.manager_id, approver_name: employeeInfo.manager_name});
    } else if(value == 'DU') {
      setApprover('DU');
      setCompOff({...compOff, approver_name: employeeInfo.du_head_name, approver_id: employeeInfo.du_head_id});
    }
  }

  const isDecember = () => new Date().getMonth() == 11;

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
    if(days == 0 || compOff.reason == '' || days > 2 || days > (compOff.year == new Date().getFullYear() ? compOffBalance : nextCompOffBalance)) return true;
    else return false;
  }

  const handleSubmit = () => {
    const days = differenceInDate(compOff.from_date, compOff.to_date, compOff.from_half, compOff.to_half);
    postCompOff({...compOff, days: days});
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
        {new Date().getMonth() == 11 && nextCompOffBalance > 0 && (<div className="col-12">
          <TextField
            id="select"
            label="Select Year"
            value={compOff.year}
            onChange={(e) => setCompOff({...compOff, year: e.target.value})} 
            select
          >
            <MenuItem value={new Date().getFullYear()}>{new Date().getFullYear() + ' (Balance: ' + compOffBalance + ')'}</MenuItem>)
            <MenuItem value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1 + ' (Balance: ' + nextCompOffBalance + ')'}</MenuItem>
          </TextField>
        </div>)}
        <div className="col-6">
          <TextField
            id="select"
            label="Select Approver"
            value={approver}
            onChange={(e) => handleApproverChange(e.target.value)} 
            select
          >
            <MenuItem value={'Manager'}>{employeeInfo.manager_name}</MenuItem>)
            <MenuItem value={'DU'}>{employeeInfo.du_head_name}</MenuItem>
          </TextField>
        </div>
        <div className="col-6">
          Days: {differenceInDate(compOff.from_date, compOff.to_date, compOff.from_half, compOff.to_half)}
          {differenceInDate(compOff.from_date, compOff.to_date, compOff.from_half, compOff.to_half) > 2 ? (<FormHelperText className={classes.formHelperText}>As per policy, Days can't exceed 2</FormHelperText>) : ''}
          {differenceInDate(compOff.from_date, compOff.to_date, compOff.from_half, compOff.to_half) > (compOff.year == new Date().getFullYear() ? compOffBalance : nextCompOffBalance) ? (<FormHelperText className={classes.formHelperText}>You don't have enough Comp-Off Balance in {compOff.year}</FormHelperText>) : ''}
        </div>
        <div className="col-12">
          <FormLabel component="legend">Reason</FormLabel>
          <TextareaAutosize aria-label="minimum height" className={classes.textArea} rows={3} value={compOff.reason} onChange={e => setCompOff({...compOff, reason: e.target.value})}/>
        </div>
        <div className="col-12">
          <Button variant="outlined" className={classes.secButton} onClick={() => setCompOff(initCompOffData)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" disabled={disableSubmit()} onClick={() => handleSubmit()}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

ApplyCompOff.propTypes = {
  employeeInfo: PropTypes.object,
  postCompOff: PropTypes.func,
  compOffBalance: PropTypes.number,
  nextCompOffBalance: PropTypes.number,
};

export default memo(ApplyCompOff);
