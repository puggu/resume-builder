/**
 *
 * Asynchronously loads the component for EmpDashboard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
