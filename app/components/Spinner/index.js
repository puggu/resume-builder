/**
*
* Spinner
*
*/

import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Spinner() {
return (<div className="spinner-wrapper">
    <div className="spinner">
        <CircularProgress color="primary" />
    </div>
</div>
);
}

Spinner.propTypes = {};

export default Spinner;