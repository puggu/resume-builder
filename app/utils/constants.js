import React from 'react';
import Dashboard from '@material-ui/icons/Dashboard';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const JWT_TOKEN_KEY = 'afourtechERP';
// export const API = 'https://stagingerp.afourtech.com:9010/v1';
export const API = process.env.API_URL;

export const NAVIGATION_HEADER = {
    '/dashboard': '',
  };
  
  export const NAVIGATION_BREADCRUMB = {
    '/dashboard': {
      name: ['Resume Builder'],
      links: ['/dashboard'],
    },
  };
  
  export const SIDE_DRAWER_LIST = [
    { name: 'Dashboard', link: '/dashboard', icon: <Dashboard /> },
  ];