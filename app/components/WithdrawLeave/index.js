/**
 *
 * WithdrawLeave
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import WorkOffIcon from '@material-ui/icons/WorkOff';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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
    overflowX: 'scroll',
    width: '100%',
    maxHeight: '200px'
  }
}));

function WithdrawLeave({transactions, withdrawLeave}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedRow({});
    setOpen(false);
  };

  const handleSubmit = () => {
    withdrawLeave([{...selectedRow,
      leave_status: selectedRow.leave_status == 'Approved' && compareDate(selectedRow.from_date) !== 1 ?
        'Withdraw Approval Pending' : 'Withdrawn',
        apply_withdraw_date: new Date().toISOString().split('T')[0],
    }]);
    handleClose();
  }

  const compareDate = (date = '2020-01-02') => {
    var dateString = new Date(date);
    dateString = dateString.toDateString();
    dateString = new Date(dateString);
    var today = new Date();
    today = today.toDateString();
    today = new Date(today);
    if(today.getTime() == dateString.getTime()) return 0;
    else if(today.getTime() > dateString.getTime()) return -1;
    else return 1;
  }

  function ResponsiveDialog() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    return (
      <div>
        <Dialog
          // fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="Withdraw"
        >
          <DialogTitle id="Withdraw">Do you really want to withdraw?</DialogTitle>
          <DialogContent>
            <div className="row">
              {selectedRow.leave_status == 'Approved' && compareDate(selectedRow.from_date) !== 1 ? (<div className="col-12">Please ask your manager to approve this request</div>) : ('')}
              <div className="col-12">
                Reason: {selectedRow.reason}
              </div>
              <div className="col-6">
                From Date: {new Date(selectedRow.from_date).toDateString()}
              </div>
              <div className="col-6">
                From Half: {selectedRow.from_half}
              </div>
              <div className="col-6">
                To Date: {new Date(selectedRow.to_date).toDateString()}
              </div>
              <div className="col-6">
                To Half: {selectedRow.to_half}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <ResponsiveDialog />
      <div className="row">
        <div className="col-12  pTop-0">
          <Typography variant="subtitle2" gutterBottom className="tabHeading">
            Withdraw Leaves
          </Typography>
        </div>
        <div className="col-12">
          <Paper elevation={6} className={classes.paper}>
            <div className="tableContainer">
              <Table stickyHeader aria-label="transaction table">
                <TableHead>
                  <TableRow>
                    <TableCell>Leave Type</TableCell>
                    <TableCell align="right">From</TableCell>
                    <TableCell align="right">To</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="center">Withdraw</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        {row.leave_type}
                      </TableCell>
                      <TableCell align="right">{row.from_date}</TableCell>
                      <TableCell align="right">{row.to_date}</TableCell>
                      <TableCell align="right">{row.leave_status}</TableCell>
                      <TableCell align="center">
                        <WorkOffIcon onClick={() => handleClickOpen(row)}/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

WithdrawLeave.propTypes = {
  transactions: PropTypes.array,
  withdrawLeave: PropTypes.func,
};

export default memo(WithdrawLeave);
