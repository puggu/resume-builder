/**
 *
 * Asynchronously loads the component for Dashboardcomp
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
