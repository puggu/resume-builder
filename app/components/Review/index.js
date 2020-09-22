/**
 *
 * Review
 * Review Array details: {
 *  0: managerLeaves
 *  1: managerWfh
 *  2: managerCompOff
 *  3: managerCompOffNextYear
 *  4: hrLeaves
 *  5: hrWfh
 *  6: hrCompOff
 *  7: hrCompOffNextYear
 * }
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MUIDataTable from "mui-datatables";
import Divider from '@material-ui/core/Divider';
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
    width: '-webkit-fill-available'
  },
  rejectButton: {
    color: '#E54555',
    float: 'right',
    borderColor: '#E54555',
    textTransform: 'none',
    marginLeft: '1%',
  },
  applyButton: {
    borderColor: '#E54555',
    textTransform: 'none',
    float: 'right',
    // marginLeft: '70%',
    // marginRight: '0.5%',
  },
  goBackButton: {
    float: 'left',
  },
  roundBorder: {
    borderStyle: 'groove',
    border: '2px solid #ab9999',
    borderRadius: '15px',
  },
  solidDivider: {
    backgroundColor: '#C21807',
    marginTop: '8px',
    marginBottom: '10px',
    borderBottomWidth: '1',
  },
  employeeDetailBar: {
    backgroundColor : 'green',
    color : 'white',
    borderRadius: '10px',
    // display: "inline-block",
    width: "70px",
    height: "200px",
  },
  w100per: {
    minWidth: '200px'
  }
}));

function Review({isHr, getAllReviews, reviews, putWfh, putCompOff, putLeave}) {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [viewForm, setViewForm] = useState(false);
  const [selectedRow, setselectedRow] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [remarks, setRemarks] = useState('');
  const [days, setDays] = useState(0);

  const filterReviews = () => {
    const tempReviews = [];
    reviews.forEach((transaction, index) => {
      if(index == 0 || index == 4) {
        transaction.forEach(review => {
          if(
            (index == 0 && (review.leave_status == 'Applied' || review.leave_status == 'Withdraw Approval Pending')) ||
            (index == 4 && review.leave_status == 'Acknowledged')
          )
            tempReviews.push({
              ...review,
              type: review.leave_type,
              status: review.leave_status,
            });
        });
      } else if(index == 1 || index == 5) {
        transaction.forEach(review => {
          if(
            (index == 1 && (review.wfh_status == 'Applied' || review.wfh_status == 'Withdraw Approval Pending')) ||
            (index == 5 && review.wfh_status == 'Acknowledged')
          )
            tempReviews.push({
              ...review,
              type: 'WFH',
              status: review.wfh_status, 
            });
        });
      } else if(index == 2 || index == 3 || index == 6 || index == 7) {
        transaction.forEach(review => {
          if(
            ((index == 2 || index == 3) && (review.comp_off_status == 'Applied' || review.comp_off_status == 'Requested' || review.comp_off_status == 'Withdraw Approval Pending')) ||
            ((index == 6 || index == 7) && review.comp_off_status == 'Acknowledged')
          )
          tempReviews.push({
            ...review,
            type: 'Comp-Off',
            status: review.comp_off_status,
          });
        });
      }
    });
    setTransactions(tempReviews);
  }

  useEffect(() => {
    getAllReviews(isHr);
    filterReviews();
  }, [reviews.length]);

  useEffect(() => {
    filterReviews();
  }, [reviews]);

  const columns = [
    {
      name: "emp_id",
      label: "Employee ID",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "emp_name",
      label: "Name",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "days",
      label: "Days",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "from_date",
      label: "From",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "to_date",
      label: "To",
      options: {
        filter: false,
        sort: true,
      }
    },
  ];

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    disableToolbarSelect: true,
    viewColumns: false,
    onRowClick: (rowData, rowMeta) => showForm(rowMeta.dataIndex),
    filter: true,
  };

  const submitApproveReject = (data) => {
    if(data[0].type == 'WFH') putWfh(data);
    else if(data[0].type == 'Comp-Off') putCompOff(data);
    else putLeave(data);
  }

  const showForm = (index) => {
    setSelectedRowIndex(index);
    setselectedRow(transactions[index]);
    // setRemarks(transactions[index].remarks);
    setDays(transactions[index].days);
    setViewForm(true);
  }

  const hideForm = () => {
    setSelectedRowIndex(-1);
    setselectedRow({});
    setRemarks('');
    setDays(0);
    setViewForm(false);
  }

  const getLeaveStatus = (action, transaction) => {
    if(action == 'reject') {
      if(transaction.type == 'Comp-Off') {
        if(transaction.status == 'Requested') return 'Request Rejected';
        else return 'Rejected';
      }
      else return 'Rejected';
    }
    else
      if(transaction.type == 'CL' || transaction.type == 'PL' || transaction.type == 'Unpaid-Leave' || transaction.type == 'OTT') {
        if(transaction.status == 'Applied') return 'Approved';
        else if(transaction.status == 'Withdraw Approval Pending') return 'Withdrawn';
      } else if(transaction.type == 'WFH' || transaction.type == 'Maternity-Leave' || transaction.type == 'Paternity-Leave') {
        if(transaction.status == 'Applied') return 'Acknowledged';
        else if(transaction.status == 'Acknowledged') return 'Approved';
        else if(transaction.status == 'Withdraw Approval Pending') return 'Withdrawn'
      } else if(transaction.type == 'Comp-Off') {
        if(transaction.status == 'Requested') return 'Acknowledged';
        else if(transaction.status == 'Acknowledged') return 'Availed';
        else if(transaction.status == 'Applied') return 'Approved';
        else if(transaction.status == 'Withdraw Approval Pending') return 'Approved';
      }
  }

  const disableSubmit = () => {
      if(remarks=='')return true;
      else return false;
    }

  const handleSubmitForm = (status) => {
    const transactionStatus = getLeaveStatus(status, selectedRow);
    submitApproveReject([{
      ...selectedRow,
      approve_reject_date: new Date().toISOString().split('T')[0],
      remarks: remarks,
      days: days,
      wfh_status: transactionStatus,
      comp_off_status: transactionStatus,
      leave_status: transactionStatus,
    }]);
    hideForm();
  }

  return (
    <div className={classes.root}>
      <div className="row">
        <div className="col-12">
          <div className="row">
            { viewForm ? (
              <div className="col-12">
                <Paper elevation={6}>
                  <div className="row">
                    <div className="col-12">
                      <Button variant="contained" color="primary" className={classes.goBackButton}onClick={() => hideForm()}>
                        Go Back
                      </Button>
                      <Button variant="outlined" className={classes.rejectButton} disabled={disableSubmit()} onClick={() => handleSubmitForm('reject')}>
                        Reject
                      </Button>
                      <Button variant="contained" color="primary" className={classes.applyButton} onClick={() => handleSubmitForm('approve')}>
                        Approve
                      </Button>
                    </div>
                    <div className="col-12">
                      <TextField
                        label="Approver Remarks"
                        //error={disableSubmit()}
                        helperText={disableSubmit()?"Please fill Remarks to Reject":''}
                        multiline
                        fullWidth
                        rows={3}
                        variant="outlined"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                      />
                    </div>
                    <div className="col-3">
                      <TextField
                        id="empID"
                        label="Employee ID"
                        value={selectedRow.emp_id}
                      />
                    </div>
                    <div className="col-3">
                      <TextField
                        id="From Date"
                        label="From Date"
                        value={new Date(selectedRow.from_date).toDateString()}
                      />
                    </div>
                    <div className="col-3">
                      <TextField
                        id="From Half"
                        label="From Half"
                        value={selectedRow.from_half}
                      />
                    </div>
                    <div className="col-3">
                      <TextField
                        id="Days"
                        label="Days"
                        type="number"
                        value={days}
                        onChange={(e) => setDays(selectedRow.type == 'Comp-Off' ? e.target.value : days)}
                        inputProps={{min: 0}}
                      />
                    </div>
                    <div className="col-3">
                      <TextField
                        id="empName"
                        label="Employee Name"
                        value={selectedRow.emp_name}
                      />
                    </div>
                    <div className="col-3">
                      <TextField
                        id="To Date"
                        label="To Date"
                        value={new Date(selectedRow.to_date).toDateString()}
                      />
                    </div>
                    <div className="col-3">
                      <TextField
                        id="To Half"
                        label="To Half"
                        value={selectedRow.to_half}
                      />
                    </div>
                    <div className="col-3"></div>
                    <div className={(selectedRow.type == 'WFH' || selectedRow.type == 'Comp-Off') ? "col-6" : "col-12"}>
                      <TextField
                        label="Reason"
                        multiline
                        fullWidth
                        rows={5}
                        variant="outlined"
                        value={selectedRow.reason}
                      />
                    </div>
                    {(selectedRow.type == 'WFH' || selectedRow.type == 'Comp-Off') && (
                      <div className="col-6">
                        <TextField
                          label="DSR"
                          multiline
                          fullWidth
                          rows={5}
                          variant="outlined"
                          value={selectedRow.dsr}
                        />
                      </div>
                    )}
                  </div>
                </Paper>
              </div>
              ):(
              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <MUIDataTable data={transactions} columns={columns} options={options}/>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Review.propTypes = {
  isHr: PropTypes.bool,
  getAllReviews: PropTypes.func,
  reviews: PropTypes.array,
  putWfh: PropTypes.func,
  putCompOff: PropTypes.func,
  putLeave: PropTypes.func
};

export default memo(Review);
