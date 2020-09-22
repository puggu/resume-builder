/**
 *
 * HrDashboard
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button,TextField } from '@material-ui/core';

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
}));

function HrDashboard() {
  const classes = useStyles();
  const [maxPl, setMaxPl] = useState(15);
  const [tempMaxPl, setTempMaxPl] = useState(maxPl);
  const [edit, setEdit] = useState(false);

  return (
    <div className={classes.root}>
      <div className="row">
        {/* <div className="col-12 pTop-0">
          <Typography variant="h5" gutterBottom className="tabHeading">
            HR Dashboard
          </Typography>
        </div> */}
        <div className="col-6" align="center">
          <Paper elevation={6} className={classes.paper}>
            <div className={classes.subHeading}>
              <Typography variant="h6" gutterBottom className={classes.header}>
                Max Carry-forward PL Limit
              </Typography>
            </div>
            <div className={classes.holidayTable}>
              {edit ? (
                <div className="row">
                  <div className="col-12">
                    <TextField type={"number"} inputProps={{min: 0}} label="Max PL limit" value={tempMaxPl} onChange={e => setTempMaxPl(e.target.value)}/>
                  </div>
                  <div className="col-12">
                    <Button variant="outlined" color="secondary" className={classes.secButton} onClick={() => {setTempMaxPl(maxPl); setEdit(false)}}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary" className={classes.primaryButton} onClick={() => { setMaxPl(tempMaxPl); setEdit(false)}}>
                      Submit
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-12">Max Limit: {maxPl}</div>
                  <div className="col-12">
                    <Button variant="contained" color="primary" onClick={() => setEdit(true)}>
                      Edit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Paper>
        </div>
        <div className="col-6" align="center">
          <Paper elevation={6} className={classes.paper}>
            <div className={classes.subHeading}>
              <Typography variant="h6" gutterBottom className={classes.header}>
                T&A vs Leaves
              </Typography>
            </div>
            <div className={classes.holidayTable}>
              
            </div>
          </Paper>
        </div>
        <div className="col-4" align="center">
          <Paper elevation={6} className={classes.paper}>
            <div className={classes.subHeading}>
              <Typography variant="h6" gutterBottom className={classes.header}>
                Unapproved WFHs, Comp-offs
              </Typography>
            </div>
            <div className={classes.holidayTable}>
              
            </div>
          </Paper>
        </div>
        <div className="col-4" align="center">
          <Paper elevation={6} className={classes.paper}>
            <div className={classes.subHeading}>
              <Typography variant="h6" gutterBottom className={classes.header}>
                Leave Statistics
              </Typography>
            </div>
            <div className={classes.holidayTable}>
              
            </div>
          </Paper>
        </div>
        <div className="col-4" align="center">
          <Paper elevation={6} className={classes.paper}>
            <div className={classes.subHeading}>
              <Typography variant="h6" gutterBottom className={classes.header}>
                Leave Encashment History
              </Typography>
            </div>
            <div className={classes.holidayTable}>
              
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

HrDashboard.propTypes = {};

export default memo(HrDashboard);
