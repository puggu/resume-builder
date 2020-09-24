/**
 *
 * Resume
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { TextareaAutosize, FormLabel, TextField } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStyles = makeStyles(theme=>({
  root: {
    minWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontSize: 14,
    fontWeight : "bold",
  },
  pos: {
    marginBottom: 10,
  },
  formControl: {
    marginBottom: 5,
    minWidth: 120,
    width: '25ch',
  },
  nameInput: {
    '& > *': {
      marginBottom: 12,
      marginRight: "5%",
      width: '25ch',
      float : 'left',
    },
  },
  row1: {
    marginBottom: 5,

  },
  saveButton: {
    float : 'right',
    marginLeft: '10px'
  },
  inputCards : {
    marginBottom: 5,
    marginTop: 10,
  },
  projectAddButton :{
    float : 'right',
    marginBottom : 20,
  },
  table: {
    minWidth: 650,
  },
  skillInput: {
    marginRight : 100,
    width: '40ch',
  },
  controls: {
    // display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    marginLeft: 50,
  }
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Resume() {
  const classes = useStyles();
  
  const initProjectData = {
    "description": "",
    "problemSolved": "",
    "keyRoleAndResponsibilities": "",
    "keyTools": "",
  }


  const [role, setRole] = React.useState('');
  const [valueAdded, setValueAdded] = React.useState('');
  const [profileSummary, setProfileSummary] = React.useState('');
  const [hobbies, setHobbies] = React.useState('');
  const [qualification, setQualification] = React.useState('');
  const [project, setProject] = React.useState(false);
  const [projectData, setProjectData] = useState(initProjectData);

  function createData(name) {
    return {name};
  }

  const rows = [
    createData('Leadership/Management Skills :'),
    createData('Programming/Scripting Language Used :'),
    createData('API Testing Tools Used :'),
    createData('Web Testing Automation Libraries :'),
    createData('Databases used :'),
    createData('Desktop Application Automation Tools/Software :'),
    createData('CI/CD Tools :'),
    createData('Cloud for Testing :'),
  ];

  const handleProjectOpen = () => {
    setProject(true);
  };

  const handleProjectClose = () => {
    setProject(false);
  };

  const handleRole = (event) => {
    setRole(event.target.value);
  };
  const handleValueAdded = (event) => {
    setValueAdded(event.target.value);
  };
  const handleProfileSummary = (event) => {
    setProfileSummary(event.target.value);
  };
  const handleHobbies = (event) => {
    setHobbies(event.target.value);
  };
  const handleQualification = (event) => {
    setQualification(event.target.value);
  };
  
  // things to add more :
  // add photo 
  return (
    <div>
      <div className={classes.row1}>
      <form className={classes.nameInput} noValidate autoComplete="off">
        <TextField 
        id="employee-name" 
        label="Name" 
        defaultValue="Shivam Bhalla" 
        disabled
        />
      </form>
      <FormControl className={classes.formControl} >
        <InputLabel id="role-select-label">Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-simple-select"
          value={role}
          onChange={handleRole}
        >
          <MenuItem value={1}>Dev. Engineer</MenuItem>
          <MenuItem value={2}>Auto. Engineer</MenuItem>
          <MenuItem value={3}>Other</MenuItem>
        </Select>
      </FormControl> 
      <Button>
        <AddAPhotoIcon className={classes.controls} fontSize="large"/>
        </Button>
      <Button className={classes.saveButton} variant="contained" color="primary">Preview</Button>
      <Button className={classes.saveButton} variant="contained" color="primary">Save</Button>
      </div>
      <div className={classes.inputCards}>
      <Card className={classes.root} variant="outlined" raised="true">
      <CardContent>
        <Typography className={classes.title} color="primary" gutterBottom>
          Problem Solved for the Customers/Value Addition
        </Typography>
        <TextField
          placeholder="Eg. Developed frontend and backend website architecture.."
          multiline
          fullWidth
          rows={5}
          variant="outlined"
          value={valueAdded}
          onChange={handleValueAdded}
        />
      </CardContent>
      </Card>
      </div>
      <div className={classes.inputCards}>
      <Card className={classes.root} variant="outlined" raised="true">
      <CardContent>
        <Typography className={classes.title} color="primary" gutterBottom>
          Skillset Summary
        </Typography>
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Categories</TableCell>
            <TableCell align="left">Skills</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">
              <TextField className={classes.skillInput}
                id="input-skills"
              />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </CardContent>
      </Card>
      </div>
      <div className={classes.inputCards}>
      <Card className={classes.root} variant="outlined" raised="true">
      <CardContent>
        <Typography className={classes.title} color="primary" gutterBottom>
          Qualification
        </Typography>
        <TextField
          placeholder="Eg. B.E./B.Tech - Electronics and Telecommunication , Unviversity of Pune."
          multiline
          fullWidth
          rows={5}
          variant="outlined"
          value={qualification}
          onChange={handleQualification}
        />
      </CardContent>
      </Card>
      </div>
      <div className={classes.inputCards}>
      <Card className={classes.root} variant="outlined" raised="true">
      <CardContent>
        <Typography className={classes.title} color="primary" gutterBottom>
          Profile Summary
        </Typography>
        <TextField
          placeholder="Eg. 2 Years of IT experience of Development.."
          multiline
          fullWidth
          rows={5}
          variant="outlined"
          value={profileSummary}
          onChange={handleProfileSummary}
        />
      </CardContent>
      </Card>
      </div>
      <div className={classes.inputCards}>
      <Card className={classes.root} variant="outlined" raised="true">
      <CardContent>
        <Typography className={classes.title} color="primary" gutterBottom>
          Projects
        </Typography>
        <div>
        <div className={classes.projectAddButton}>
        <Button variant="contained" color="primary" onClick={handleProjectOpen}>
          Add
        </Button>
        </div>
        <Dialog open={project} onClose={handleProjectClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Project</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              multiline
              rows={3}
              margin="dense"
              label="Project Description:"
              fullWidth
              value={projectData.description} 
              onChange={e => setProjectData({...projectData, description: e.target.value})}
            />
            <TextField
              autoFocus
              multiline
              rows={3}
              margin="dense"
              label="Problem Solved for the Customer:"
              fullWidth
              value={projectData.problemSolved} 
              onChange={e => setProjectData({...projectData, problemSolved: e.target.value})}
            />
            <TextField
              autoFocus
              multiline
              rows={3}
              margin="dense"
              label="My Role and Key Responsibilities:"
              fullWidth
              value={projectData.keyRoleAndResponsibilities} 
              onChange={e => setProjectData({...projectData, keyRoleAndResponsibilities: e.target.value})}
            />
            <TextField
              autoFocus
              multiline
              rows={3}
              margin="dense"
              label="Key Tools/Technologies Used (Upto 5 Tools/Technologies):"
              fullWidth
              value={projectData.keyTools} 
              onChange={e => setProjectData({...projectData, keyTools: e.target.value})}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleProjectClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleProjectClose} color="primary">
              Save
            </Button>
        </DialogActions>
        </Dialog>
      </div>
      </CardContent>
      </Card>
      </div>
      <div className={classes.inputCards}>
      <Card className={classes.root} variant="outlined" raised="true">
      <CardContent>
        <Typography className={classes.title} color="primary" gutterBottom>
          Personal Information & Areas of Interest/Hobbies
        </Typography>
        <form className={classes.nameInput} noValidate autoComplete="off">
        <TextField id="employee-email" label="Email" />
        <TextField id="employee-ph-no" label="Phone Number" required />
        <TextField id="employee-other-no" label="Optional Number" />
      </form>
        <TextField
          placeholder="Eg. Treking , Public Speaking..."
          multiline
          fullWidth
          rows={5}
          variant="outlined"
          value={hobbies}
          onChange={handleHobbies}
        />
      </CardContent>
      </Card>
      </div>
    </div>
  );
}

Resume.propTypes = {};

export default memo(Resume);
