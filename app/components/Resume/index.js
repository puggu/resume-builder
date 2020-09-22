/**
 *
 * Resume
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
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
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import Slide from '@material-ui/core/Slide';
import { TextareaAutosize, FormLabel, TextField } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
  },
  inputCards : {
    marginBottom: 5,
    marginTop: 10,
  },
  projectAddButton :{
    float : 'right',
    marginBottom : 20,
  }
});

function Resume() {
  const classes = useStyles();
  const [role, setRole] = React.useState('');
  const [valueAdded, setValueAdded] = React.useState('');
  const [profileSummary, setProfileSummary] = React.useState('');
  const [hobbies, setHobbies] = React.useState('');
  const [project, setProject] = React.useState(false);

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
            />
            <TextField
              autoFocus
              multiline
              rows={3}
              margin="dense"
              label="Problem Solved for the Customer:"
              fullWidth
            />
            <TextField
              autoFocus
              multiline
              rows={3}
              margin="dense"
              label="My Role and Key Responsibilities:"
              fullWidth
            />
            <TextField
              autoFocus
              multiline
              rows={3}
              margin="dense"
              label="Key Tools/Technologies Used (Upto 5 Tools/Technologies):"
              fullWidth
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
