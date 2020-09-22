/**
 *
 * HrAddLeaveBalance
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import { TextField, Button } from '@material-ui/core';

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
    marginBottom: '20px'
  },
  textArea: {
    width: '-webkit-fill-available'
  },
  primaryButton : {
    marginTop: '15px'
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
  w100: {
    marginRight: '10px',
    maxWidth: '100px'
  }
}));

function HrUpdateLeaveBalance({ getLeaveBalance, leaveBalance, putLeaveBalance }) {
  const classes = useStyles();

  useEffect(() => {
    getLeaveBalance(new Date().getFullYear());
  }, []);

  const [viewForm, setViewForm] = useState(false);
  const [selectedRow, setselectedRow] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
 
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
      name: "balanceCL",
      label: "Balance CL",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "balancePL",
      label: "Balance PL",
      options: {
        filter: false,
        sort: true,
      }
    },
  ];

  const options = {
    selectableRows: 'none',
    viewColumns: false,
    disableToolbarSelect: true,
    onRowClick: (rowData, rowMeta) => showForm(rowMeta.dataIndex)
  };

  const showForm = (index) => {
    setSelectedRowIndex(index);
    setselectedRow(leaveBalance[index]);
    setViewForm(true);
  }

  const hideForm = () => {
    setSelectedRowIndex(-1);
    setselectedRow({});
    setViewForm(false);
  }

  const handleSubmit = () => {
    const tempSelectedRow = [
      {
        "emp_id": selectedRow.emp_id,
        "emp_name": selectedRow.emp_name,
        "year": selectedRow.year,
        "leave_type": "PL",
        "carry_forward_leaves": selectedRow.carryForwardPL,
        "credit_leaves": selectedRow.creditPL,
        "applied_leaves": selectedRow.appliedPL,
        "approved_leaves": selectedRow.approvedPL,
      },
      {
        "emp_id": selectedRow.emp_id,
        "emp_name": selectedRow.emp_name,
        "year": selectedRow.year,
        "leave_type": "CL",
        "carry_forward_leaves": selectedRow.carryForwardCL,
        "credit_leaves": selectedRow.creditCL,
        "applied_leaves": selectedRow.appliedCL,
        "approved_leaves": selectedRow.approvedCL,
      },
    ];
    putLeaveBalance(tempSelectedRow)
    hideForm();
  }

  return (
    <div className={classes.root}>
      {/* <div className="row">
        <div className="col-12">
          <Typography variant="h6" gutterBottom className={classes.header}>
            Update Leave Balance
          </Typography>
        </div>
      </div> */}
      <div className="row">
        { viewForm ? (
            <div className="col-12">
              <Paper elevation={6}>
                <div className="row">
                  <div className="col-12">
                    <Button variant="contained" color="primary" onClick={() => hideForm()}>
                      Go Back
                    </Button>
                  </div>
                  <div className="col-6">
                    Employee Name: {selectedRow.emp_name}
                  </div>
                  <div className="col-6">
                    Employee ID: {selectedRow.emp_id}
                  </div>
                  <div className="col-6">
                    Balance PL: {selectedRow.balancePL}
                  </div>
                  <div className="col-6">
                    Balance CL: {selectedRow.balanceCL}
                  </div>
                  <div className="col-3">
                    <TextField 
                      type={"number"}
                      inputProps={{min: 0}}
                      label="Credited PL"
                      value={selectedRow.creditPL} 
                      onChange={e => setselectedRow({...selectedRow, creditPL: e.target.value})}
                    />
                  </div> 
                  <div className="col-3">
                    <TextField 
                      type={"number"}
                      inputProps={{min: 0}}
                      label="Carry Forward PL"
                      value={selectedRow.carryForwardPL} 
                      disabled={true}
                      onChange={e => setselectedRow({...selectedRow, carryForwardPL: e.target.value})}
                    />
                  </div>
                  <div className="col-3">
                    <TextField 
                      type={"number"}
                      inputProps={{min: 0}}
                      label="Applied PL"
                      value={selectedRow.appliedPL} 
                      disabled={true}
                      onChange={e => setselectedRow({...selectedRow, appliedPL: e.target.value})}
                    />
                  </div>
                  <div className="col-3">
                    <TextField 
                      type={"number"}
                      inputProps={{min: 0}}
                      label="Approved PL"
                      value={selectedRow.approvedPL} 
                      disabled={true}
                      onChange={e => setselectedRow({...selectedRow, approvedPL: e.target.value})}
                    />
                  </div>
                  <div className="col-3">
                    <TextField 
                      type={"number"}
                      inputProps={{min: 0}}
                      label="Credited CL"
                      value={selectedRow.creditCL} 
                      onChange={e => setselectedRow({...selectedRow, creditCL: e.target.value})}
                    />
                  </div> 
                  <div className="col-3">
                    <TextField 
                      type={"number"}
                      inputProps={{min: 0}}
                      label="Carry Forward CL"
                      value={selectedRow.carryForwardCL} 
                      disabled={true}
                      onChange={e => setselectedRow({...selectedRow, carryForwardCL: e.target.value})}
                    />
                  </div>
                  <div className="col-3">
                    <TextField 
                      type={"number"}
                      inputProps={{min: 0}}
                      label="Applied CL"
                      value={selectedRow.appliedCL} 
                      disabled={true}
                      onChange={e => setselectedRow({...selectedRow, appliedCL: e.target.value})}
                    />
                  </div>
                  <div className="col-3">
                    <TextField 
                      type={"number"}
                      inputProps={{min: 0}}
                      label="Approved CL"
                      value={selectedRow.approvedCL} 
                      disabled={true}
                      onChange={e => setselectedRow({...selectedRow, approvedCL: e.target.value})}
                    />
                  </div>
                  <div className="col-12">
                    <Button variant="outlined" className={classes.secButton} onClick={() => hideForm()}>
                      Cancel
                    </Button>
                  {/* <div>
                  <div className="col-2"> */}
                    <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
                      Submit
                    </Button>
                  </div>
                </div>
              </Paper>
            </div>
          ):(
          <div className="col-12">
            <MUIDataTable data={leaveBalance} columns={columns} options={options} title={'Employee List'}/>
          </div>
        )}
      </div>
    </div>
  );
}

HrUpdateLeaveBalance.propTypes = {
  getLeaveBalance: PropTypes.func,
  leaveBalance: PropTypes.array,
  putLeaveBalance: PropTypes.func,
};

export default memo(HrUpdateLeaveBalance);
