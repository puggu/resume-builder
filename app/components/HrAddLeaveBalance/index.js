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
import { TextField, Button, TableContainer } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

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
    marginTop: '15px',
  },
  roundBorder: {
    borderStyle: 'groove',
    border: '2px solid #ab9999',
    borderRadius: '15px',
  },
  w100: {
    marginRight: '10px',
    maxWidth: '100px'
  },
  w100per : {
    width: '120px'
  }
}));

function HrAddLeaveBalance({getYearlyEmployees, yearlyEmployees, postYearlyEmployees}) {
  const classes = useStyles();

  const [leave, setLeave] = useState({
    cl: 0,
    pl: 0
  });

  const [seleRows, setSeleRows] = useState([]);
  const [years, setYears] = useState([new Date().getFullYear(), new Date().getFullYear() + 1]);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchedText, setSearchedText] = useState('');

  useEffect(() => {
    getYearlyEmployees(selectedYear);
  }, [selectedYear]);

  const setRowsSel = (employees) => {
    setSeleRows(employees)
  };
   
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
      name: "first_name",
      label: "First Name",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "manager_name",
      label: "Manager",
      options: {
        filter: true,
        sort: true,
        filterList: filteredList[3],
      }
    },
    {
      name: "du_head_name",
      label: "DU Head",
      options: {
        filter: true,
        sort: true,
        filterList: filteredList[4],
      }
    },
  ];

  const options = {
    filterType: 'checkbox',
    rowsSelected: seleRows,
    onRowsSelect: (row, rows) => setSeleRows(rows.map(row => row.dataIndex)),
    viewColumns: false,
    disableToolbarSelect: true,
    searchText: searchedText,
    onSearchChange: (searchText) => setSearchedText(searchText),
    // responsive: 'scrollFullWidth',
    // fixedHeaderOptions: {xAxis: true, yAxis: false},
    // customToolbarSelect: (selectedRows, displayData, setSelectedRows) => console.log('cts', selectedRows, displayData, setSelectedRows),
    viewColumns: false,
    onFilterChange: (changedColumn, filterList, type) => setFilteredList(filterList)
  };

  const handleDisable = () => {
    if((seleRows.length == 0) || (leave.cl <= 0 && leave.pl <= 0))
      return true;
    else
      return false;
  }

  const handleSubmit = () => {
    var tempEmp = [];
    const tempLeave = {
      "emp_id": "",
      "emp_name": "",
      "year": selectedYear,
      "leave_type": "",
      "credit_leaves": 0,
    }
    seleRows.forEach((row, index) => {
      tempEmp.push({...tempLeave, emp_id: yearlyEmployees[row].emp_id, emp_name: yearlyEmployees[row].first_name + ' ' + yearlyEmployees[row].last_name, leave_type: 'CL', credit_leaves: leave.cl});
      tempEmp.push({...tempLeave, emp_id: yearlyEmployees[row].emp_id, emp_name: yearlyEmployees[row].first_name + ' ' + yearlyEmployees[row].last_name, leave_type: 'PL', credit_leaves: leave.pl});
      tempEmp.push({...tempLeave, emp_id: yearlyEmployees[row].emp_id, emp_name: yearlyEmployees[row].first_name + ' ' + yearlyEmployees[row].last_name, leave_type: 'Unpaid-Leave', credit_leaves: 0});
    });
    setSeleRows([]);
    setLeave({cl: 0, pl: 0});
    postYearlyEmployees(tempEmp);
  }

  return (
    <div className={classes.root}>
      {/* <div className="row">
        <div className="col-9">
          <Typography variant="h6" gutterBottom className={classes.header}>
            Add/Update Leave Balance
          </Typography>
        </div>
        <div className={classes.roundBorder + " col-3"}>
          <TextField className={classes.w100} type={"number"} inputProps={{min: 0}} label="Max PL limit" value={maxPL} onChange={e => setMaxPL(e.target.value)}/>
          <Button variant="contained" color="primary" className={classes.primaryButton} onClick={() => {}}>
            Submit
          </Button>
        </div>
      </div> */}
      <div className="row">
        <div className="col-6 col-s-6">
          <div className="row">
            <div className="col-12">
              <TextField
                id="select"
                label="Select Year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)} 
                select
                className={classes.w100per}
              >
                {years.map(year => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </div>
        <div className="col-6 col-s-6">
          <div className="row">
            <div className="col-3">
              <TextField type={"number"} inputProps={{min: 0}} label="Enter CL" value={leave.cl} onChange={e => setLeave({...leave, cl: e.target.value})}/>
            </div>
            <div className="col-3">
              <TextField type={"number"} inputProps={{min: 0}} label="Enter PL" value={leave.pl} onChange={e => setLeave({...leave, pl: e.target.value})}/>
            </div>
            <div className="col-6">
              <Button variant="outlined" className={classes.secButton} onClick={() => setLeave({cl: 0, pl: 0})}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" className={classes.primaryButton} onClick={() => handleSubmit()} disabled={handleDisable()}>
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="col-12">
          <MUIDataTable data={yearlyEmployees} columns={columns} options={options} title={'Employee List'}/>
        </div>
      </div>
    </div>
  );
}

HrAddLeaveBalance.propTypes = {
  getYearlyEmployees: PropTypes.func,
  yearlyEmployees: PropTypes.array,
  postYearlyEmployees: PropTypes.func,
};

export default memo(HrAddLeaveBalance);
