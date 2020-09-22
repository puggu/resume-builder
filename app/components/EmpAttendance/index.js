/**
 *
 * EmpAttendance
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button, ButtonGroup  } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Calendar from 'react-calendar';
import './Calendar.css';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WidgetsIcon from '@material-ui/icons/Widgets';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  calanderClass: {
    width: '100% !important',
  },
  tile: {
    border: '1px solid #cbd5e1 !important',
  }, 
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  borderBox: {
    border: '1px solid #cbd5e1',
  },
  m15: {
    // marginTop: '10px',
    marginBottom: '15px'
  },
  span1: {fontSize: 'x-large', textAlign: 'center', color: '#60599aab'},
  span2: {fontSize: '12px', marginBottom: '0px', marginTop: '0px'},
  span3: {fontSize: 'large', textAlign: 'center', color: '#6d8da9'},
  span4: {
    fontSize: 'small',
    padding: '3px 3px 3px 5px',
    color: '#7f9cb5de',
  },
  shiftTable: {
    display: 'block',
    overflowX: 'auto',
    whiteSpace: 'nowrap'
  },
  tableHead: {fontSize: 'small', color: '#7f8fa4'},
  tableCell: {color: '#000000ad'},
  heading1: {padding: '10px', fontWeight: '550', color: '#149292c7'},
}));

function DateTile({activeStartDate, date, view}){
  
  const isWeekend = date.getDay() == 0 || date.getDay() == 6 ? true : false;

  return (
    <div>
      <p>{isWeekend ? 'R' : 'P'}</p>
      <span style={{float: 'right'}}>{isWeekend ? '' : 'GS'}</span>
    </div>
  );
}

DateTile.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date),
  date: PropTypes.instanceOf(Date),
  view: PropTypes.string,
};

function EmpAttendance() {
  const classes = useStyles();

  const [view, setView] = useState('Calander');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expandSwipe, setExpandSwipe] = useState(false);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [tableDateRange, setTableDateRange] = useState({
    startDate: new Date(),
    endDate: new Date()
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={classes.root}>
      <div align="right">
        <ButtonGroup size="small" variant="outlined" color="primary">
          <Button variant={view == 'Calander' ? 'contained' : 'outlined'} onClick={() => setView('Calander')}>
            <WidgetsIcon />
          </Button>
          <Button variant={view == 'Tabular' ? 'contained' : 'outlined'} onClick={() => setView('Tabular')}>
            <FormatListBulletedIcon />
          </Button>
        </ButtonGroup>
      </div>
      {view == 'Calander' ? (
        <div className="row">
          <div className="col-7">
            <Calendar
              onChange={(value, event) => setSelectedDate(value)}
              // value={}
              calendarType="US"
              className={classes.calanderClass}
              tileClassName={classes.tile}
              onActiveStartDateChange={({ activeStartDate, view }) => console.log('Changed view to: ', activeStartDate, view)}
              tileContent={({ activeStartDate, date, view }) => <DateTile activeStartDate={activeStartDate} date={date} view={view}/>}
            />
          </div>
          <div className={"col-5 " + classes.flexContainer}>
            <div className={classes.m15}>
              <div className={classes.flexRow + ' ' + classes.borderBox}>
                <div style={{width: '16.66%'}} className={classes.borderBox} align="center">
                  <span className={classes.span1}>{selectedDate.getDate()}</span><br></br>
                  <span className={classes.span2}>{days[selectedDate.getDay()]}</span>
                </div>
                <div style={{width: '41.66%'}} align="center">
                  <span className={classes.span3}>General Shift(GS)</span><br></br>
                  <span className={classes.span2}>Shift : 09:30 to 18:30</span>
                </div>
                <div style={{width: '41.66%'}} align="center">
                  <span className={classes.span3}>General Scheme</span><br></br>
                  <span className={classes.span2}>Attendance Scheme</span>
                </div>
              </div>
              <div className={classes.borderBox}>
                <span className={classes.span4}>
                  Processed on 12th Mar at 04:03 am
                </span>
              </div>
              <div className={classes.borderBox}>
                <TableContainer component={Paper}>
                  <Table size="small" style={{minWidth: '800px'}}>
                    <TableHead style={{backgroundColor: '#00ffff47'}}>
                      <TableRow>
                        <TableCell className={classes.tableHead}>First In</TableCell>
                        <TableCell className={classes.tableHead} align="left">Last Out</TableCell>
                        <TableCell className={classes.tableHead} align="left">Total Work hrs</TableCell>
                        <TableCell className={classes.tableHead} align="left">Break Hours</TableCell>
                        <TableCell className={classes.tableHead} align="left">Actual Work hrs</TableCell>
                        <TableCell className={classes.tableHead} align="left">Shortfall hrs</TableCell>
                        <TableCell className={classes.tableHead} align="left">Excess hrs</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key={1}>
                        <TableCell className={classes.tableCell} component="th" scope="row">10:05</TableCell>
                        <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                        <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                        <TableCell className={classes.tableCell} align="left">-</TableCell>
                        <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                        <TableCell className={classes.tableCell} align="left">- 00:20</TableCell>
                        <TableCell className={classes.tableCell} align="left">-</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            <Paper className={classes.m15 + ' ' + classes.borderBox}>
              <div className={classes.heading1}>Session Details</div>
              <TableContainer component={Paper}>
                <Table size="small" style={{minWidth: '700px'}}>
                  <TableHead style={{backgroundColor: '#00ffff47'}}>
                    <TableRow>
                      <TableCell className={classes.tableHead}>Session</TableCell>
                      <TableCell className={classes.tableHead} align="left">Session Timing</TableCell>
                      <TableCell className={classes.tableHead} align="left">First In</TableCell>
                      <TableCell className={classes.tableHead} align="left">Last Out</TableCell>
                      <TableCell className={classes.tableHead} align="left">Late In hrs</TableCell>
                      <TableCell className={classes.tableHead} align="left">Early Out hrs</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={1}>
                      <TableCell className={classes.tableCell} component="th" scope="row">Session 1</TableCell>
                      <TableCell className={classes.tableCell} align="left">09:30 - 14:00</TableCell>
                      <TableCell className={classes.tableCell} align="left">10:05</TableCell>
                      <TableCell className={classes.tableCell} align="left">-</TableCell>
                      <TableCell className={classes.tableCell} align="left">+00:35</TableCell>
                      <TableCell className={classes.tableCell} align="left">-</TableCell>
                    </TableRow>
                    <TableRow key={2}>
                      <TableCell className={classes.tableCell} component="th" scope="row">Session 2</TableCell>
                      <TableCell className={classes.tableCell} align="left">14:01 - 18:30</TableCell>
                      <TableCell className={classes.tableCell} align="left">-</TableCell>
                      <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                      <TableCell className={classes.tableCell} align="left">-</TableCell>
                      <TableCell className={classes.tableCell} align="left">-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Paper className={classes.m15 + ' ' + classes.borderBox}>
              <div className={classes.heading1}>
                Swipes
                <span style={{float: 'right'}}>
                  {expandSwipe ? (
                    <ExpandLessIcon onClick={() => setExpandSwipe(!expandSwipe)}/>
                  ) : (
                    <ExpandMoreIcon onClick={() => setExpandSwipe(!expandSwipe)}/>
                  )}
                </span>
              </div>
              {expandSwipe ? (
                <TableContainer component={Paper}>
                  <Table size="small" style={{minWidth: '100%'}}>
                    <TableHead style={{backgroundColor: '#00ffff47'}}>
                      <TableRow>
                        <TableCell className={classes.tableHead}>Swipe Time</TableCell>
                        <TableCell className={classes.tableHead} align="left">Door Address</TableCell>
                        <TableCell className={classes.tableHead} align="left">Info</TableCell>                      
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key={1}>
                        <TableCell className={classes.tableCell} component="th" scope="row">10:06:24 am</TableCell>
                        <TableCell className={classes.tableCell} align="left">afourtech - 2</TableCell>
                        <TableCell className={classes.tableCell} align="left">Info</TableCell>
                      </TableRow>
                      <TableRow key={2}>
                        <TableCell className={classes.tableCell} component="th" scope="row">11:06:24 am</TableCell>
                        <TableCell className={classes.tableCell} align="left">afourtech - 3</TableCell>
                        <TableCell className={classes.tableCell} align="left">Info</TableCell>                      
                      </TableRow>
                      <TableRow key={3}>
                        <TableCell className={classes.tableCell} component="th" scope="row">11:16:24 am</TableCell>
                        <TableCell className={classes.tableCell} align="left">afourtech - 3</TableCell>
                        <TableCell className={classes.tableCell} align="left">Info</TableCell>
                      </TableRow>
                      <TableRow key={4}>
                        <TableCell className={classes.tableCell} component="th" scope="row">01:36:44 pm</TableCell>
                        <TableCell className={classes.tableCell} align="left">afourtech - 3</TableCell>
                        <TableCell className={classes.tableCell} align="left">Info</TableCell>                      
                      </TableRow>
                      <TableRow key={5}>
                        <TableCell className={classes.tableCell} component="th" scope="row">03:01:10 pm</TableCell>
                        <TableCell className={classes.tableCell} align="left">afourtech - 1</TableCell>
                        <TableCell className={classes.tableCell} align="left">Info</TableCell>
                      </TableRow>
                      <TableRow key={6}>
                        <TableCell className={classes.tableCell} component="th" scope="row">06:45:13 pm</TableCell>
                        <TableCell className={classes.tableCell} align="left">afourtech - 2</TableCell>
                        <TableCell className={classes.tableCell} align="left">Info</TableCell>                      
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : ''}
            </Paper>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <TextField value={tableDateRange.startDate.toDateString().slice(4) + ' to ' + tableDateRange.endDate.toDateString().slice(4) }/>
            <DateRangeIcon aria-describedby={id} color="primary" onClick={handleClick}/>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <DateRange
                editableDateInputs={true}
                onChange={item => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
              />
              <div align="center" style={{padding: '5px'}}>
                <Button variant="contained" color="primary" onClick={() => {setTableDateRange(dateRange[0]); handleClose()}}>Apply</Button>
              </div>
            </Popover>
          </div>
          <div className="col-12">
          <TableContainer component={Paper} style={{maxHeight: '300px'}}>
            <Table stickyHeader size="small" style={{minWidth: '1000px'}}>
              <TableHead style={{backgroundColor: '#00ffff47'}}>
                <TableRow>
                  <TableCell className={classes.tableHead} variant="head" component="th" scope="row">Date</TableCell>
                  <TableCell className={classes.tableHead} align="left">First In</TableCell>
                  <TableCell className={classes.tableHead} align="left">Last Out</TableCell>
                  <TableCell className={classes.tableHead} align="left">Work hrs</TableCell>
                  <TableCell className={classes.tableHead} align="left">Actual hrs</TableCell>
                  <TableCell className={classes.tableHead} align="left">Shortfall/Excess hrs</TableCell>
                  <TableCell className={classes.tableHead} align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={1}>
                  <TableCell className={classes.tableCell} variant="head" component="th" scope="row">18 Mar 2020</TableCell>
                  <TableCell className={classes.tableCell} align="left">10:05</TableCell>
                  <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">+ 00:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">P</TableCell>
                </TableRow>
                <TableRow key={2}>
                  <TableCell className={classes.tableCell} variant="head" component="th" scope="row">18 Mar 2020</TableCell>
                  <TableCell className={classes.tableCell} align="left">10:05</TableCell>
                  <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">+ 00:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">P</TableCell>
                </TableRow>
                <TableRow key={3}>
                  <TableCell className={classes.tableCell} variant="head" component="th" scope="row">18 Mar 2020</TableCell>
                  <TableCell className={classes.tableCell} align="left">10:05</TableCell>
                  <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">+ 00:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">P</TableCell>
                </TableRow>
                <TableRow key={4}>
                  <TableCell className={classes.tableCell} variant="head" component="th" scope="row">18 Mar 2020</TableCell>
                  <TableCell className={classes.tableCell} align="left">10:05</TableCell>
                  <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">+ 00:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">P</TableCell>
                </TableRow>
                <TableRow key={5}>
                  <TableCell className={classes.tableCell} variant="head" component="th" scope="row">18 Mar 2020</TableCell>
                  <TableCell className={classes.tableCell} align="left">10:05</TableCell>
                  <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">+ 00:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">P</TableCell>
                </TableRow>
                <TableRow key={6}>
                  <TableCell className={classes.tableCell} variant="head" component="th" scope="row">18 Mar 2020</TableCell>
                  <TableCell className={classes.tableCell} align="left">10:05</TableCell>
                  <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">+ 00:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">P</TableCell>
                </TableRow>
                <TableRow key={4}>
                  <TableCell className={classes.tableCell} variant="head" component="th" scope="row">18 Mar 2020</TableCell>
                  <TableCell className={classes.tableCell} align="left">10:05</TableCell>
                  <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">+ 00:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">P</TableCell>
                </TableRow>
                <TableRow key={5}>
                  <TableCell className={classes.tableCell} variant="head" component="th" scope="row">18 Mar 2020</TableCell>
                  <TableCell className={classes.tableCell} align="left">10:05</TableCell>
                  <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">+ 00:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">P</TableCell>
                </TableRow>
                <TableRow key={6}>
                  <TableCell className={classes.tableCell} variant="head" component="th" scope="row">18 Mar 2020</TableCell>
                  <TableCell className={classes.tableCell} align="left">10:05</TableCell>
                  <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">+ 00:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">P</TableCell>
                </TableRow>
                <TableRow key={4}>
                  <TableCell className={classes.tableCell} variant="head" component="th" scope="row">18 Mar 2020</TableCell>
                  <TableCell className={classes.tableCell} align="left">10:05</TableCell>
                  <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">+ 00:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">P</TableCell>
                </TableRow>
                <TableRow key={5}>
                  <TableCell className={classes.tableCell} variant="head" component="th" scope="row">18 Mar 2020</TableCell>
                  <TableCell className={classes.tableCell} align="left">10:05</TableCell>
                  <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">+ 00:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">P</TableCell>
                </TableRow>
                <TableRow key={6}>
                  <TableCell className={classes.tableCell} variant="head" component="th" scope="row">18 Mar 2020</TableCell>
                  <TableCell className={classes.tableCell} align="left">10:05</TableCell>
                  <TableCell className={classes.tableCell} align="left">18:45</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">+ 00:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">P</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            <Table stickyHeader size="small">
              <TableHead style={{backgroundColor: '#00ffff47'}}>
                <TableRow>
                  <TableCell className={classes.tableHead} align="left">Total Work hrs</TableCell>
                  <TableCell className={classes.tableHead} align="left">Total Actual hrs</TableCell>
                  <TableCell className={classes.tableHead} align="left">Total Shortfall/Excess hrs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={1}>
                  <TableCell className={classes.tableCell} align="left">08:40</TableCell>
                  <TableCell className={classes.tableCell} align="left">08:20</TableCell>
                  <TableCell className={classes.tableCell} align="left">+ 00:20</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            </TableContainer>
          </div>
        </div>  
      ) }
    </div>
  );
}

EmpAttendance.propTypes = {};

export default memo(EmpAttendance);
