/**
 *
 * Dashboard
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import './styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import Resume from 'components/Resume/Loadable';


const useStyles = makeStyles(theme => ({
  root: {
    // offset: theme.mixins.toolbar,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'calc(100% - 100px) !important',
    minHeight: '-webkit-fill-available'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    maxWidth: '15vw',
    textTransform: 'none'
  },
  headerTab: {
    maxWidth: '15vw',
    // backgroundColor: '#d2e3e8',
    textAlign: 'left',
    fontWeight: '550'
  },
  tabPanel: {
    width: '95vw',
    marginLeft: '20px',
    marginTop: '20px'
  },
}));
const value=0;
export function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.tabPanel}>
        <Resume/>
      </div>  
    </div>
  );
}

Dashboard.propTypes = {
};

export default compose(
  memo,
)(Dashboard);
