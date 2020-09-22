/**
 *
 * Dashboardcomp
 *
 * leaveData Array details:
 * 0: leave_balance
 * 1: transactions
 * 2: comp_off balance
 * 3: comp_offs
 * 4: wfh_balance
 * 5: wfhs
 * 6: holidays
 * 7: optional_holidays
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField, TableContainer } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import './style.scss';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: 'black solid',
    borderBottom: '1px solid',
    fontSize: 13,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

function createData(
  leave_type,
  credited,
  applied,
  approved,
  balance,
  carryforward,
) {
  return { leave_type, credited, applied, approved, balance, carryforward };
}

function createDatan(
  from,
  to,
  CL,
  PL,
  WFH,
  CompOff,
  UnPaid,
  Maternity,
  Paternity,
  Business,
  Status,
  reason,
  remarks,
  dsr,
) {
  return {
    from,
    to,
    CL,
    PL,
    WFH,
    CompOff,
    UnPaid,
    Maternity,
    Paternity,
    Business,
    Status,
    reason,
    remarks,
    dsr,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: '15px',
  },
  header: {
    fontSize: '1.2em',
    padding: '10px',
    // marginBottom: '20px'
  },
  subHeading: {
    margin: '10px',
    backgroundColor: '#d2e3e8',
    width: '340px',
  },
  tableContainer: {
    overflowX: 'auto',
    width: '100%',
    // maxHeight: '200px'
  },
  table: {
    maxHeight: '200px',
  },
  container: {
    maxHeight: '350px',
  },
  holidayTable: {
    // minHeight: '280px',
    // maxHeight: '350px',
    height: '235px',
    overflowY: 'scroll',
    borderBottom: 'none',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  reportingTo: {
    backgroundColor: '#d2e3e8',
    width: '330px',
  },
  rowheader: {
    backgroundColor: '#dfebee',
  },
  w100: {
    marginRight: '10px',
    maxWidth: '100px',
  },
  w100per: {
    width: '120px',
  },
  w200per: {
    width: '380px',
  },
  flexBox: {
    display: 'flex'
  },
  flex30: {
    flex: '30%'
  },
  flex70: {
    flex: '70%'
  }
}));

function Dashboardcomp({
  employeeInfo,
  leaveData,
  getLeaveData,
  Dashboardfor,
  employeeList,
}) {
  const classes = useStyles();

  const getListofYears = () => {
    let listofYears = [];
    let year = new Date(Date.parse(employeeInfo.date_of_joining)).getFullYear();
    while (year <= new Date().getFullYear()) {
      if(year>="2020"){
      listofYears.push(year);}
      year+=1;
    }
    if (new Date().getMonth() == 11) {
      listofYears.push(year);
    }
    return listofYears;
  };

  const [years, setYears] = useState([new Date().getFullYear()]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [selectedEmployee, setSelectedEmployee] = useState(employeeInfo.emp_id);

  useEffect(() => {
    setSelectedEmployee(employeeInfo.emp_id);
    setYears(getListofYears());
  }, [employeeInfo]);

  useEffect(() => {
    if (selectedYear && selectedEmployee)
      getLeaveData(selectedYear, selectedEmployee);
  }, [selectedYear, selectedEmployee]);

  const [leaveBalance, setLeaveBalance] = useState(leaveData[0]);
  const [transactions, setTransactions] = useState(leaveData[1]);
  const [compOffBalance, setCompOffBalance] = useState(leaveData[2]);
  const [compOffs, setCompOffs] = useState(leaveData[3]);
  const [wfhBalance, setWfhBalance] = useState(leaveData[4]);
  const [wfhs, setWfhs] = useState(leaveData[5]);
  const [holidays, setHolidays] = useState(leaveData[6]);
  const [optionalHolidayList, setOptionalHolidayList] = useState(leaveData[7]);

  const [open, setOpen] = useState(-1);

  useEffect(() => {
    if (leaveData) {
      setLeaveBalance(leaveData[0]);
      setTransactions(leaveData[1]);
      setCompOffBalance(leaveData[2]);
      setCompOffs(leaveData[3]);
      setWfhBalance(leaveData[4]);
      setWfhs(leaveData[5]);
      setHolidays(leaveData[6]);
      setOptionalHolidayList(leaveData[7]);
    }
  }, [leaveData]);

  const rows = [
    createData(
      'CL',
      leaveBalance.creditCL,
      leaveBalance.appliedCL,
      leaveBalance.approvedCL,
      leaveBalance.balanceCL,
      leaveBalance.carryForwardCL,
    ),
    createData(
      'PL',
      leaveBalance.creditPL,
      leaveBalance.appliedPL,
      leaveBalance.approvedPL,
      leaveBalance.balancePL,
      leaveBalance.carryForwardPL,
    ),
    createData(
      'Comp-Off',
      compOffBalance.availedCompOff,
      compOffBalance.appliedCompOff,
      compOffBalance.approvedCompOff,
      compOffBalance.availedCompOff -
        compOffBalance.approvedCompOff -
        compOffBalance.appliedCompOff,
      '0',
    ),
    createData(
      'WFH',
      wfhBalance.Approved + wfhBalance.Applied,
      wfhBalance.Applied,
      wfhBalance.Approved,
      '0',
      '0',
    ),
  ];

  const rows_ls = [];
  {
    transactions.map(rowt =>
      rows_ls.push(
        createDatan(
          new Date(rowt.from_date).toDateString().slice(4),
          new Date(rowt.to_date).toDateString().slice(4),
          rowt.leave_type === 'CL' ? rowt.days : '_',
          rowt.leave_type === 'PL' ? rowt.days : '_',
          '_',
          '_',
          rowt.leave_type === 'Unpaid-Leave' ? rowt.days : '_',
          rowt.leave_type === 'Maternity-Leave' ? rowt.days : '_',
          rowt.leave_type === 'Paternity-Leave' ? rowt.days : '_',
          rowt.leave_type === 'OTT' ? rowt.days : '_',
          rowt.leave_status,
          rowt.reason,
          rowt.remarks,
        ),
      ),
    );
  }
  {
    wfhs.map(rowt =>
      rows_ls.push(
        createDatan(
          new Date(rowt.from_date).toDateString().slice(4),
          new Date(rowt.to_date).toDateString().slice(4),
          '_',
          '_',
          rowt.days,
          '_',
          '_',
          '_',
          '_',
          '_',
          rowt.wfh_status,
          rowt.reason,
          rowt.remarks,
          rowt.dsr,
        ),
      ),
    );
  }
  {
    compOffs.map(rowt =>
      rows_ls.push(
        createDatan(
          new Date(rowt.from_date).toDateString().slice(4),
          new Date(rowt.to_date).toDateString().slice(4),
          '_',
          '_',
          '_',
          rowt.days,
          '_',
          '_',
          '_',
          '_',
          rowt.comp_off_status,
          rowt.reason,
          rowt.remarks,
          rowt.dsr,
        ),
      ),
    );
  }

  function returndate(dates) {
    return new Date(Date.parse(dates));
  }
  const rowsn = rows_ls.sort((a, b) => returndate(b.from) - returndate(a.from));
  const mandatoryHoliday = holidays.filter(holiday => !holiday.is_optional);
  const mandatoryHolidaySort = mandatoryHoliday.sort(
    (a, b) => returndate(a.holiday_date) - returndate(b.holiday_date),
  );
  const optionalHolidaySort = optionalHolidayList.sort(
    (a, b) => returndate(a.holiday_date) - returndate(b.holiday_date),
  );

  return (
    <div className={classes.root}>
    <div className="row">
    <div className="col-8">
    <div className={classes.flexBox}>
      <div className={classes.flex30}>
        <TextField
          id="select"
          label="Select Year"
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
          select
          className={classes.w100per}
          margin="dense"
        > 
          {years.map(year => (
            <MenuItem value={year}>{year}</MenuItem>
          ))}
        </TextField>
      </div>
      {Dashboardfor=="employee" && (
        <div className={classes.flex70} align="center">
            <Typography
              variant="caption"
              gutterBottom
            >
              Reporting Manager 
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.reportingTo}
              align="center"
            >
              {employeeInfo.manager_name}
            </Typography>
        </div>
      )}
      {Dashboardfor=="HR" && (
        <div className={classes.flex70} style={{padding: '0px'}}>
          <TextField
            id="select"
            label="Select Employee"
            value={selectedEmployee}
            onChange={e => setSelectedEmployee(e.target.value)}
            select
            className={classes.w200per}
            margin="dense"
          > 
            {employeeList.map(employee => (
              <MenuItem value={employee.emp_id}>{employee.first_name+' '+employee.last_name+' ('+employee.emp_id+')'}</MenuItem>
            ))}
          </TextField>
        </div>
      )}
    </div>
      <div className="row ">
          {/* <h3>Leave Summary</h3> */}
            <TableContainer component={Paper} className={classes.paper}>
              <Table
                style={{ minWidth: '700px' }}
                className={classes.table}
                size="small"
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Type of Leave</StyledTableCell>
                    <StyledTableCell align="center">Credited</StyledTableCell>
                    <StyledTableCell align="center">Applied</StyledTableCell>
                    <StyledTableCell align="center">Approved</StyledTableCell>
                    <StyledTableCell align="center">Balance</StyledTableCell>
                    <StyledTableCell align="center">
                      Carry-Forward
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.name}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.rowheader}
                      >
                        <b>{row.leave_type}</b>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.credited}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.applied}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.approved}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.balance}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.carryforward}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="col-4 ">
          <div className="row">
            <Paper elevation={6}>
              <div className={classes.holidayTable}>
                {Dashboardfor=="employee"&&
                  <div className={classes.subHeading}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      align="center"
                      color="textPrimary"
                    >
                      Mandatory Holidays
                    </Typography>
                  </div>
                 }
                <Table stickyHeader aria-label="holiday table" size="small">
                  <TableBody>
                    {Dashboardfor=="employee"&&
                      mandatoryHolidaySort.map(row => (
                        <TableRow>
                          <StyledTableCell align="center">
                            {new Date(row.holiday_date).toDateString().slice(4)}
                          </StyledTableCell>
                          <StyledTableCell align="left">{row.holiday_name}</StyledTableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <div className={classes.subHeading}>
                  <Typography variant="subtitle2" gutterBottom align="center" color="textPrimary">
                    Optional Holidays
                  </Typography>
                </div>
                <Table stickyHeader aria-label="holiday table" size="small">
                  <TableBody>
                    {optionalHolidaySort.map(row => (
                      <TableRow>
                        <StyledTableCell align="center">
                          {new Date(row.holiday_date).toDateString().slice(4)}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.holiday_name}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </div>
        </div>
      </div>

      <div className="row">
        <div className={'col-12 ' + classes.tableContainer}>
          {rowsn.length !== 0 ? (
            <TableContainer component={Paper} className={classes.container}>
              <Table
                style={{minWidth: '1140px'}}
                className={classes.table}
                size="small"
                stickyHeader
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell />
                    <StyledTableCell align="center">From</StyledTableCell>
                    <StyledTableCell align="center">To</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">CL</StyledTableCell>
                    <StyledTableCell align="center">PL</StyledTableCell>
                    <StyledTableCell align="center">WFH</StyledTableCell>
                    <StyledTableCell align="center">CompOff</StyledTableCell>
                    <StyledTableCell align="center">Unpaid</StyledTableCell>
                    <StyledTableCell align="center">Maternity</StyledTableCell>
                    <StyledTableCell align="center">Paternity</StyledTableCell>
                    <StyledTableCell align="center">Business</StyledTableCell>                      
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsn.map((row,index) => (
                    <>
                      <TableRow key={row.index}>
                        <TableCell>
                        <IconButton align="left" className="button" aria-label="expand row" size="small" onClick={open==index?() => setOpen(-1):() => setOpen(index)}>
                          {open==index ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>  
                        </TableCell>
                        <StyledTableCell align="center">
                          {row.from}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.to}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.Status}
                        </StyledTableCell>
                        {row.CL !== '_' ? (
                          <StyledTableCell align="center" className="CL-prop">
                            {row.CL}
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell align="center">
                            {row.CL}
                          </StyledTableCell>
                        )}
                        {row.PL !== '_' ? (
                          <StyledTableCell align="center" className="PL-prop">
                            {row.PL}
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell align="center">
                            {row.PL}
                          </StyledTableCell>
                        )}
                        {row.WFH !== '_' ? (
                          <StyledTableCell align="center" className="WFH-prop">
                            {row.WFH}
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell align="center">
                            {row.WFH}
                          </StyledTableCell>
                        )}
                        {row.CompOff !== '_' ? (
                          <StyledTableCell
                            align="center"
                            className="CompOff-prop"
                          >
                            {row.CompOff}
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell align="center">
                            {row.CompOff}
                          </StyledTableCell>
                        )}
                        {row.UnPaid !== '_' ? (
                          <StyledTableCell
                            align="center"
                            className="miscLeave-prop"
                          >
                            {row.UnPaid}
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell align="center">
                            {row.UnPaid}
                          </StyledTableCell>
                        )}
                        {row.Maternity !== '_' ? (
                          <StyledTableCell
                            align="center"
                            className="miscLeave-prop"
                          >
                            {row.Maternity}
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell align="center">
                            {row.Maternity}
                          </StyledTableCell>
                        )}
                        {row.Paternity !== '_' ? (
                          <StyledTableCell
                            align="center"
                            className="miscLeave-prop"
                          >
                            {row.Paternity}
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell align="center">
                            {row.Paternity}
                          </StyledTableCell>
                        )}
                        {row.Business !== '_' ? (
                          <StyledTableCell
                            align="center"
                            className="miscLeave-prop"
                          >
                            {row.Business}
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell align="center">
                            {row.Business}
                          </StyledTableCell>
                        )}
                      </TableRow>
                      <TableRow>
                          <TableCell padding="none" colSpan={12}>
                            <Collapse in={open==index} timeout="auto" unmountOnExit>
                            <Box marginLeft={10}>
                                <Typography variant ="subtitle2">
                                  <b> Reason :</b> {row.reason}</Typography>
                                <Typography variant ="subtitle2">
                                  <b>Remarks :</b> {row.remarks?row.remarks:''}</Typography> 
                                {((row.WFH!='_')||(row.CompOff!=='_'&&(row.Status=="Requested"||row.Status=="Acknowledged"||row.Status=="Availed"||row.Status=="Request Rejected")))?
                                  <Typography variant ="subtitle2">
                                    <b> DSR :</b> {row.dsr}</Typography>:''}
                              </Box> 
                            </Collapse> 
                          </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            'No Transactions Available'
          )}
        </div>
      </div>
    </div>
  );
}

Dashboardcomp.propTypes = {
  employeeInfo: PropTypes.object,
  employeeList: PropTypes.array,
  leaveData: PropTypes.array,
  getLeaveData: PropTypes.func,
};

export default memo(Dashboardcomp);
