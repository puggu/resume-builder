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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
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
      marginBottom: 5,
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
});

function Resume() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div>
      <div className={classes.row1}>
      <form className={classes.nameInput} noValidate autoComplete="off">
        <TextField id="employee-name" label="Name" variant="outlined" />
      </form>
      <FormControl className={classes.formControl} variant="outlined" >
        <InputLabel id="role-select-label">Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-simple-select"
          value={role}
          onChange={handleChange}
        >
          <MenuItem value={1}>Dev. Engineer</MenuItem>
          <MenuItem value={2}>Auto. Engineer</MenuItem>
          <MenuItem value={3}>Other</MenuItem>
        </Select>
      </FormControl>
      <Button className={classes.saveButton} variant="contained" color="primary">Save</Button>
      </div>
      <div>
      <Card className={classes.root} variant="outlined" raised="true">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
      </Card>
      </div>
    </div>
  );
}

Resume.propTypes = {};

export default memo(Resume);
