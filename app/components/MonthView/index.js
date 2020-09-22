/**
 *
 * MonthView
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, TableContainer } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import MUIDataTable from "mui-datatables";

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
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  w100per: {
    width: '100px',
  },
  selectYearContainer: {
    marginRight : '5%',
  },
  selectTimeContainer: {
    display : 'flex',
  }
}));
// const StyledTableCell = withStyles(theme => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: 'black solid',
//     borderBottom: '1px solid',
//     fontSize: 13,
//   },
//   body: {
//     fontSize: 13,
//   },
// }))(TableCell);

function MonthView({employeeInfo,empTransactions,getAllEmpTransactions,isHr,employeeList}) {
  
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
  
  const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const[selectedMonth,setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    if(selectedYear)
    getAllEmpTransactions(isHr,selectedYear);
  },[selectedYear]);

  useEffect(() => {
    setYears(getListofYears());
    setSelectedMonth(new Date().getMonth());
  }, []);

  const emp_ids = employeeList.map(x=>x.emp_id); 
  function createData(
    emp_id,name,from,to,days,type,status
  ) {
    return { emp_id,name,from,to,days,type,status };
  } 
  const [rows,setRows] = useState([]);
  useEffect(()=> {
    var tempRows=[];
    empTransactions.forEach(transactions=> (
      transactions.map(transaction=>(
        ((new Date(transaction.from_date).getMonth()==selectedMonth||new Date(transaction.to_date).getMonth()==selectedMonth)&&emp_ids.includes(transaction.emp_id))&&(
          tempRows.push(createData(transaction.emp_id,transaction.emp_name,new Date(transaction.from_date).toDateString().slice(4),new Date(transaction.to_date).toDateString().slice(4),transaction.days,transaction.leave_type||(transaction.wfh_status)?'WFH':''||(transaction.comp_off_status)?'Comp-Off':'',transaction.leave_status||transaction.comp_off_status||transaction.wfh_status))
        )
      )
    ))); 
    setRows(tempRows);
  },[selectedMonth])

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
      name: "name",
      label: "Name",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "from",
      label: "From",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "to",
      label: "To",
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
  ];

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    disableToolbarSelect: true,
    viewColumns: false,
    filter: true,
    setTableProps: ()=>({
      size: "small",
    })
  };

  function returndate(dates) {
    return new Date(Date.parse(dates));
  }
  const rowsn = rows.sort((a, b) => returndate(a.from) - returndate(b.from));

  return (
    <div className={classes.root}>
      <div className="row">
        <div className="col-2">
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
      <div className="col-2">
      <TextField
          id="select"
          label="Select Month"
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          select
          className={classes.w100per}
          margin="dense"
        > 
          {months.map((month,index) => (
            <MenuItem value={index}>{month}</MenuItem>
          ))}
        </TextField>
        </div>
      </div>
      <div className="row ">
                <MUIDataTable data={rowsn} columns={columns} options={options}/>
        </div>
    </div>
  );
}

MonthView.propTypes = {
  employeeInfo: PropTypes.object,
  getAllEmpTransactions: PropTypes.func,
  empTransactions: PropTypes.array,
  isHr: PropTypes.bool,
};

export default memo(MonthView);
