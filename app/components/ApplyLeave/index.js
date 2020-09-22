/**
 *
 * ApplyLeave
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import CompOff from 'components/CompOff/Loadable';
import OptionalHoliday from 'components/OptionalHoliday/Loadable';

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
    textAlign: 'center',
    background: '#d2e3e8'
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

function ApplyLeave({
  employeeList, applyLeave, leaveBalance, employeeInfo, postWfh, wfhBalance,
  postCompOff, compOffBalance, nextCompOffBalance, compOffs,
  holidayList, optionalHolidayList, postOptionalHoliday, deleteOptionalHoliday, resourceType, getResourceType
}) {
  const classes = useStyles();

  useEffect(() => {
    getResourceType();
  }, []);

  const differenceInDate = (d1, d2, h1, h2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    var difference = (date2.getTime() - date1.getTime())/(1000 * 3600 * 24);
    if(h1 == 'H1') difference += 0.5;
    if(h2 == 'H2') difference += 0.5;
    return difference;
  }

  const initLeaveData = {
    "emp_id": employeeInfo.emp_id,
    "emp_name": employeeInfo.first_name + " " + employeeInfo.last_name,
    "approver_id": employeeInfo.manager_id,
    "approver_name": employeeInfo.manager_name,
    "year": new Date().getFullYear(),
    "from_date": new Date().toISOString().split('T')[0],
    "to_date": new Date().toISOString().split('T')[0],
    "from_half": "H1",
    "to_half": "H2",
    "days": 1,
    "leave_type": "CL",
    "leave_status": "Applied",
    "wfh_status": "Applied",
    "reason": "",
    "dsr": "",
    "cc": [],
  }
  
  const [page, setPage] = useState(1);
  const [leaveData, setLeaveData] = useState(initLeaveData);
  const [approver, setApprover] = useState('Manager');
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const employeeOptions = employeeList.map(employee => {
    return {
      label: employee.first_name + ' ' + employee.last_name,
      value: employee.email,
    }
  });

  const handleApproverChange = (value) => {
    if(value == 'Manager') {
      setApprover('Manager');
      setLeaveData({...leaveData, approver_id: employeeInfo.manager_id, approver_name: employeeInfo.manager_name});
    } else if(value == 'DU') {
      setApprover('DU');
      setLeaveData({...leaveData, approver_name: employeeInfo.du_head_name, approver_id: employeeInfo.du_head_id});
    }
  }

  const handleLeaveTypeChange = (value) => {
    if(value == 'Comp-Off') handleApproverChange('DU');
    setLeaveData({...leaveData, leave_type: value});
  }

  const disableSubmit = () => {
    const days = differenceInDate(leaveData.from_date, leaveData.to_date, leaveData.from_half, leaveData.to_half);
    if((leaveData.leave_type == 'CL' || leaveData.leave_type == 'PL' || leaveData.leave_type == 'Unpaid-Leave' || leaveData.leave_type == 'Maternity-Leave' || leaveData.leave_type == 'Paternity-Leave' || leaveData.leave_type == 'OTT') && (days == 0 || leaveData.reason == '')) return true;
    else if(leaveData.leave_type == 'WFH' && (days == 0 || leaveData.reason == '' || leaveData.dsr == '')) return true;
    else return false;
  }

  const handleSubmit = () => {
    const days = differenceInDate(leaveData.from_date, leaveData.to_date, leaveData.from_half, leaveData.to_half);
    if(leaveData.leave_type == 'WFH') {
      postWfh({...leaveData, days: days, apply_withdraw_date: new Date().toISOString().split('T')[0]});
    } else {
      applyLeave({...leaveData, days: days, apply_withdraw_date: new Date().toISOString().split('T')[0], cc: leaveData.cc.map(emp => emp.value)});
    }
  }

  const calculateTrigger = () => {
    const oHRes = resourceType.find(res => res.resource_type == 'Optional-Holiday');
    if(oHRes) {
      const trigger = oHRes.data.trigger;
      if(trigger) {
        const yearTrig = trigger[new Date().getFullYear()];
        if(yearTrig) {
          const emp = yearTrig[employeeInfo.emp_id];
          if(emp) return emp;
          else return {}
        }
      }
    }
    return {};
  }

  return (
    <div>
    {page == 1 ? (
      <div className="row">
        <div className="col-4">
          <Paper className={classes.selectLeave} onClick={() => {setPage(2); setLeaveData({...leaveData, leave_type: 'CL'})}}>
            Apply Leave/WFH
          </Paper>
        </div>
        <div className="col-4">
          <Paper className={classes.selectLeave} onClick={() => {setPage(2); setLeaveData({...leaveData, leave_type: 'Comp-Off'})}}>
            Apply/Request Comp-Off
          </Paper>
        </div>
        <div className="col-4">
          <Paper className={classes.selectLeave} onClick={() => {setPage(2); setLeaveData({...leaveData, leave_type: 'Optional-Holiday'})}}>
            Optional Holiday
          </Paper>
        </div>
      </div>
    ) : (
      <div>
        <Button variant="contained" color="primary" onClick={() => setPage(1)} style={{marginBottom: '20px'}}>Go Back</Button>
      </div>
    )}
    {leaveData.leave_type == 'Optional-Holiday' ? page == 2 && (
      <OptionalHoliday employeeInfo={employeeInfo} holidayList={holidayList} optionalHolidayList={optionalHolidayList} postOptionalHoliday={postOptionalHoliday} deleteOptionalHoliday={deleteOptionalHoliday} triggerData={calculateTrigger()}/>
    ) : 
    leaveData.leave_type == 'Comp-Off' ? page == 2 && (
      <CompOff postCompOff={postCompOff} compOffBalance={compOffBalance} nextCompOffBalance={nextCompOffBalance} compOffs={compOffs} employeeInfo={employeeInfo}/>
    ) :
    page == 2 && (<div className={classes.root}>
      <div className="row">
        <div className="col-6">
          <TextField
            id="select"
            label="Select Leave Type"
            value={leaveData.leave_type}
            onChange={(e) => handleLeaveTypeChange(e.target.value)} 
            select
            className={classes.w100per}
          >
            <MenuItem value={'CL'}>CL</MenuItem>
            <MenuItem value={'PL'}>PL</MenuItem>
            <MenuItem value={'WFH'}>WFH</MenuItem>
            <MenuItem value={'Unpaid-Leave'}>Unpaid Leave</MenuItem>
            <MenuItem value={'Maternity-Leave'}>Maternity Leave</MenuItem>
            <MenuItem value={'Paternity-Leave'}>Paternity Leave</MenuItem>
            <MenuItem value={'OTT'}>Business Travel</MenuItem>
          </TextField>
        </div>
        <div className="col-6">
          <Paper elevation={6}>
            {leaveData.leave_type == 'CL' && (
              <Typography variant="h6" gutterBottom className={classes.header}>
                CL: {leaveBalance.balanceCL}
              </Typography>
            )}
            {leaveData.leave_type == 'PL' && (
              <Typography variant="h6" gutterBottom className={classes.header}>
                PL: {leaveBalance.balancePL}
              </Typography>
            )}
            {leaveData.leave_type == 'WFH' && (
              <Typography variant="h6" gutterBottom className={classes.header}>
                WFH Approved: {wfhBalance.Approved}
              </Typography>
            )}
            {leaveData.leave_type == 'Unpaid-Leave' && (
              <Typography variant="subtitle1" gutterBottom className={classes.header}>
                Unpaid Leave Approved: {-1 * leaveBalance.balanceUL}
              </Typography>
            )}
            {leaveData.leave_type == 'Maternity-Leave' && (
              <Typography variant="subtitle2" gutterBottom className={classes.header}>
                Max Limit: 6 months
              </Typography>
            )}
            {leaveData.leave_type == 'Paternity-Leave' && (
              <Typography variant="subtitle2" gutterBottom className={classes.header}>
                Max Limit: 3 days
              </Typography>
            )}
            {leaveData.leave_type == 'OTT' && (
              <Typography variant="subtitle2" gutterBottom className={classes.header}>
                Official Tour and Travel
              </Typography>
            )}
          </Paper>
        </div>
        <div className="col-6">
          <FormLabel component="legend">From Date</FormLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={leaveData.from_date}
              onChange={from_date => setLeaveData({...leaveData, from_date: from_date.toISOString().split('T')[0]})}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="col-6">
          <FormLabel component="legend">From Half</FormLabel>
          <RadioGroup row aria-label="position" name="from half" value={leaveData.from_half} onChange={e => setLeaveData({...leaveData, from_half: e.target.value})}>
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
              minDate={leaveData.from_date}
              minDateMessage={"Date should not be before From Date"}
              value={leaveData.to_date}
              onChange={to_date => setLeaveData({...leaveData, to_date: to_date.toISOString().split('T')[0]})}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="col-6">
          <FormLabel component="legend">To Half</FormLabel>
          <RadioGroup row aria-label="position" name="to half" value={leaveData.to_half} onChange={e => setLeaveData({...leaveData, to_half: e.target.value})}>
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
        <div className="col-12">
          <TextField
            id="select"
            label="Select Approver"
            value={approver}
            onChange={(e) => handleApproverChange(e.target.value)} 
            select
            className={classes.w100per}
          >
            {leaveData.leave_type == 'Comp-Off' ? '' : (<MenuItem value={'Manager'}>{employeeInfo.manager_name}</MenuItem>)}
            <MenuItem value={'DU'}>{employeeInfo.du_head_name}</MenuItem>
          </TextField>
        </div>
        {/* <div className="col-6">
          Days: {differenceInDate(leaveData.from_date, leaveData.to_date, leaveData.from_half, leaveData.to_half)}
        </div> */}
        <div className="col-12">
          <FormLabel component="legend">Reason</FormLabel>
          <TextareaAutosize aria-label="minimum height" className={classes.textArea} rows={3} value={leaveData.reason} onChange={e => setLeaveData({...leaveData, reason: e.target.value})}/>
        </div>
        {leaveData.leave_type == 'WFH' && (
          <div className="col-12">
            <FormLabel component="legend">DSR</FormLabel>
            <TextareaAutosize aria-label="minimum height" className={classes.textArea} rows={3} value={leaveData.dsr} onChange={e => setLeaveData({...leaveData, dsr: e.target.value})}/>
          </div>
        )}
        {(leaveData.leave_type !== 'WFH') && (<div className="col-12">
          <FormLabel component="legend">CC to</FormLabel>
          <Select
            label="CC to"
            value={leaveData.cc}
            isMulti
            name="CC to"
            options={employeeOptions}
            onChange={(e) => setLeaveData({...leaveData, cc: e})}
            placeholder="Select Employees"
          />
        </div>)}
        <div className="col-3">
          <Button variant="outlined" className={classes.secButton} onClick={() => setLeaveData(initLeaveData)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" disabled={disableSubmit()} onClick={() => handleSubmit()}>
            Submit
          </Button>
        </div>
      </div>
    </div>)}
    </div>
  );
}

ApplyLeave.propTypes = {
  employeeList: PropTypes.array,
  applyLeave: PropTypes.func,
  leaveBalance: PropTypes.object,
  employeeInfo: PropTypes.object,
  postWfh: PropTypes.func,
  wfhBalance: PropTypes.object,
  postCompOff: PropTypes.func,
  compOffBalance: PropTypes.object,
  nextCompOffBalance: PropTypes.object,
  compOffs: PropTypes.array,
  holidayList: PropTypes.array,
  optionalHolidayList: PropTypes.array,
  postOptionalHoliday: PropTypes.func,
  deleteOptionalHoliday: PropTypes.func,
  resourceType: PropTypes.array,
  getResourceType: PropTypes.func,
};

export default memo(ApplyLeave);
