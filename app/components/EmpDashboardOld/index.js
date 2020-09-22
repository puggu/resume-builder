/**
 *
 * EmpDashboard
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TextareaAutosize, FormLabel, TextField } from '@material-ui/core';

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
    width: '-webkit-fill-available',
    cursor: 'initial !important',
    backgroundColor: 'white !important'
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
  paper: {
    paddingTop: '1px',
  },
  subHeading: {
    margin: '10px',
    backgroundColor: '#d2e3e8',
  },
  tableContainer: {
    overflowX: 'auto',
    width: '100%',
    // maxHeight: '200px'
  },
  table: {
    maxHeight: '200px'
  },
  holidayTable: {
    height: '200px',
    overflowY: 'scroll'
  },
  spanLabel: {
    padding: '2px',
    borderRadius: '3px',
    backgroundColor: '#3a87ad',
    fontSize: '10.998px',
    fontWeight: 'bold',
    lineHeight: '14px',
    color: '#fff',
    textShadow: '0 -1px 0 rgba(0,0,0,0.25)',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  reportingTo: {
    backgroundColor: '#d2e3e8',
    paddingLeft: '10px',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EmpDashboard({leaveBalance, compOffBalance, nextCompOffBalance, employeeInfo, transactions, compOffs, wfhBalance, wfhs, holidays}) {
  const classes = useStyles();

  // const [holidays, setHolidays] = useState([
  //   {id: 1, day: 'Friday', date: '01 May 2020', name: 'Maharashtra Day'},
  //   {id: 2, day: 'Saturday', date: '15 August 2020', name: 'Independence Day'},
  //   {id: 3, day: 'Friday', date: '02 October 2020', name: 'Gandhi Jayanthi'},
  // ]);
  const [expanded, setExpanded] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setSelectedRow({});
    setRowType('');
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    // const id = '#' + panel;
    // const selectedDiv = document.querySelector(id);
    // setTimeout(function(){
    //   selectedDiv.scrollIntoView(true);
    // }, 100);
  };

  const showDsr = () => rowType == 'WFH' || selectedRow.comp_off_status == 'Requested' || selectedRow.comp_off_status == 'Acknowledged' || selectedRow.comp_off_status == 'Availed' || selectedRow.comp_off_status == 'Request Rejected';

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={classes.root}>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {rowType}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div className="row">
          <div className="col-12">
            Status: {selectedRow.leave_status || selectedRow.wfh_status || selectedRow.comp_off_status}
          </div>
          <div className="col-6">
            From Date: {new Date(selectedRow.from_date).toDateString()}
          </div>
          <div className="col-6">
            To Date: {new Date(selectedRow.to_date).toDateString()}
          </div>
          <div className="col-6">
            From Half: {selectedRow.from_half}
          </div>
          <div className="col-6">
            To Half: {selectedRow.to_half}
          </div>
          <div className="col-6">
            <FormLabel component="legend">{showDsr() ? ('Credit Days') : ('Applied Days')}</FormLabel>
            <TextField value={selectedRow.days} disabled={true}/>
          </div>
          <div className="col-6">
            <FormLabel component="legend">Reason</FormLabel>
            <TextareaAutosize aria-label="minimum height" value={selectedRow.reason} className={classes.textArea} rows={3} disabled={true}/>
          </div>
          {showDsr() ? (<div className="col-12">
            <FormLabel component="legend">DSR</FormLabel>
            <TextareaAutosize aria-label="minimum height" value={selectedRow.dsr ? selectedRow.dsr : ''} className={classes.textArea} rows={3} disabled={true}/>
          </div>) : ''}
          <div className="col-12">
            <FormLabel component="legend">Remarks</FormLabel>
            <TextareaAutosize aria-label="minimum height" value={selectedRow.remarks ? selectedRow.remarks : ''} className={classes.textArea} rows={3} disabled={true}/>
          </div>
        </div>
      </Dialog>
      <div className="row">
        <div className="col-8 pTop-0">
          <Typography variant="h5" gutterBottom className="tabHeading">
            Employee Dashboard
          </Typography>
        </div>
        <div className="col-4 pTop-0">
          <Paper elevation={4}>
              <Typography variant="subtitle1" gutterBottom className={classes.reportingTo}>
                Reporting to: {employeeInfo.manager_name}
              </Typography>
          </Paper>
        </div>
        <div className="col-8" align="center">
          <Paper elevation={6} className={classes.paper}>
            <div className={classes.subHeading}>
              <Typography variant="h6" gutterBottom className={classes.header}>
                Leave Balance
              </Typography>
            </div>
            <div className={classes.holidayTable}>
              <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} id="panel1">
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  key={1}
                >
                  <Typography className={classes.heading} align="left">PL</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Balance: {leaveBalance.balancePL}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className="row" align="right">
                    <div className="col-6"><Typography>Credited: {leaveBalance.creditPL}</Typography></div>
                    <div className="col-6"><Typography>Carry-Forward: {leaveBalance.carryForwardPL}</Typography></div>
                    <div className="col-6"><Typography>Applied: {leaveBalance.appliedPL}</Typography></div>
                    <div className="col-6"><Typography>Approved: {leaveBalance.approvedPL}</Typography></div>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')} id="panel2">
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                  key={2}
                >
                  <Typography className={classes.heading} align="left">CL</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Balance: {leaveBalance.balanceCL}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className="row" align="right">
                    <div className="col-6"><Typography>Credited: {leaveBalance.creditCL}</Typography></div>
                    <div className="col-6"><Typography>Carry-Forward: {leaveBalance.carryForwardCL}</Typography></div>
                    <div className="col-6"><Typography>Applied: {leaveBalance.appliedCL}</Typography></div>
                    <div className="col-6"><Typography>Approved: {leaveBalance.approvedCL}</Typography></div>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')} id="panel3">
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                  key={3}
                >
                  <Typography className={classes.heading} align="left">Comp-Off</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Balance: {compOffBalance.availedCompOff - compOffBalance.approvedCompOff - compOffBalance.appliedCompOff}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="row" align="right">
                  <div className="col-4"><Typography>Availed: {compOffBalance.availedCompOff}</Typography></div>
                  <div className="col-4"><Typography>Applied: {compOffBalance.appliedCompOff}</Typography></div>
                  <div className="col-4"><Typography>Approved: {compOffBalance.approvedCompOff}</Typography></div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')} id="panel4">
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                  key={4}
                >
                  <Typography className={classes.heading} align="left">WFH</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Approved: {wfhBalance.Approved}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="row" align="right">
                  <div className="col-4"><Typography>Applied: {wfhBalance.Applied}</Typography></div>
                  <div className="col-4"><Typography>Acknowledged: {wfhBalance.Acknowledged}</Typography></div>
                  <div className="col-4"><Typography>Approved: {wfhBalance.Approved}</Typography></div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              {new Date().getMonth() == 11 && (
                <ExpansionPanel expanded={expanded === 'panel5'} onChange={handleChange('panel5')} id="panel5">
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                    key={4}
                  >
                    <Typography className={classes.heading} align="left">{new Date().getFullYear() + 1} Comp-Off</Typography>
                    <Typography className={classes.secondaryHeading}>
                      Balance: {nextCompOffBalance.availedCompOff - nextCompOffBalance.approvedCompOff - nextCompOffBalance.appliedCompOff}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="row" align="right">
                    <div className="col-4"><Typography>Availed: {nextCompOffBalance.availedCompOff}</Typography></div>
                    <div className="col-4"><Typography>Applied: {compOffBalance.appliedCompOff}</Typography></div>
                    <div className="col-4"><Typography>Approved: {nextCompOffBalance.approvedCompOff}</Typography></div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )}
            </div>
          </Paper>
        </div>
        <div className="col-4" align="center">
          <Paper elevation={6} className={classes.paper}>
            <div className={classes.subHeading}>
              <Typography variant="h6" gutterBottom className={classes.header}>
                Upcoming Holidays
              </Typography>
            </div>
            <div className={classes.holidayTable}>
              <Table stickyHeader aria-label="holiday table">
                <TableBody>
                  {holidays.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <span className={classes.spanLabel}>
                          {days[new Date(row.holiday_date).getDay()]}
                        </span><br></br>
                        {new Date(row.holiday_date).toDateString().slice(4)}
                      </TableCell>
                      <TableCell align="center">{row.holiday_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </div>
        <div className="col-12" align="center">
          <Paper elevation={6} className={classes.paper}>
            <div className={classes.subHeading}>
              <Typography variant="h6" gutterBottom className={classes.header}>
                Leave Transactions
              </Typography>
            </div>
            <div className={classes.tableContainer}>
              {transactions.length !== 0 ? (
                <TableContainer component={Paper} className={classes.table}>
                  <Table stickyHeader aria-label="transaction table" size="small" style={{minWidth: '960px'}}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Leave Type</TableCell>
                        <TableCell align="left">Applied/Withdrawn On</TableCell>
                        <TableCell align="left">From</TableCell>
                        <TableCell align="left">To</TableCell>
                        <TableCell align="left">Days</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Approved/Rejected On</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((row) => (
                        <TableRow key={row.id} onClick={() => handleClickOpen(row, 'LEAVE')} className="handPointer">
                          <TableCell>
                            {row.leave_type}
                          </TableCell>
                          <TableCell align="left">{new Date(row.apply_withdraw_date).toDateString().slice(4)}</TableCell>
                          <TableCell align="left">{new Date(row.from_date).toDateString().slice(4)}</TableCell>
                          <TableCell align="left">{new Date(row.to_date).toDateString().slice(4)}</TableCell>
                          <TableCell align="right">{row.days}</TableCell>
                          <TableCell align="left">{row.leave_status}</TableCell>
                          <TableCell align="left">{row.approve_reject_date ? new Date(row.approve_reject_date).toDateString().slice(4) : 'NA'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                'No Transactions Available'
              )}
            </div>
          </Paper>
        </div>
        <div className="col-12" align="center">
          <Paper elevation={6} className={classes.paper}>
            <div className={classes.subHeading}>
              <Typography variant="h6" gutterBottom className={classes.header}>
                WFH Transactions
              </Typography>
            </div>
            <div className={classes.tableContainer}>
              {wfhs.length !== 0 ? (
                <TableContainer component={Paper} className={classes.table}>
                  <Table stickyHeader aria-label="transaction table" size="small" style={{minWidth: '750px'}}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">From</TableCell>
                        <TableCell align="left">To</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Days</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {wfhs.map((row) => (
                        <TableRow key={row._id} onClick={() => handleClickOpen(row, 'WFH')} className="handPointer">
                          <TableCell align="left">{new Date(row.from_date).toDateString().slice(4)}</TableCell>
                          <TableCell align="left">{new Date(row.to_date).toDateString().slice(4)}</TableCell>
                          <TableCell align="left">{row.wfh_status}</TableCell>
                          <TableCell align="right">{row.days}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                'No Transactions Available'
              )}
            </div>
          </Paper>
        </div>
        <div className="col-12" align="center">
          <Paper elevation={6} className={classes.paper}>
            <div className={classes.subHeading}>
              <Typography variant="h6" gutterBottom className={classes.header}>
                Comp-Off Transactions
              </Typography>
            </div>
            <div className={classes.tableContainer}>
              {compOffs.length !== 0 ? (
                <TableContainer component={Paper} className={classes.table}>
                  <Table stickyHeader aria-label="transaction table" size="small" style={{minWidth: '750px'}}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">From</TableCell>
                        <TableCell align="left">To</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Applied/Credited Days</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {compOffs.map((row) => (
                        <TableRow key={row._id} onClick={() => handleClickOpen(row, 'COMP-Off')} className="handPointer">
                          <TableCell align="left">{new Date(row.from_date).toDateString().slice(4)}</TableCell>
                          <TableCell align="left">{new Date(row.to_date).toDateString().slice(4)}</TableCell>
                          <TableCell align="left">{row.comp_off_status}</TableCell>
                          <TableCell align="right">{row.days}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                'No Transactions Available'
              )}
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

EmpDashboard.propTypes = {
  leaveBalance: PropTypes.object,
  compOffBalance: PropTypes.object,
  nextCompOffBalance: PropTypes.object,
  employeeInfo: PropTypes.object,
  transactions: PropTypes.array,
  compOffs: PropTypes.array,
  wfhBalance: PropTypes.object, 
  wfhs: PropTypes.array,
  holidays: PropTypes.array,
};

export default memo(EmpDashboard);
