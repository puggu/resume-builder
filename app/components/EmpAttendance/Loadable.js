/**
 *
 * Asynchronously loads the component for EmpAttendance
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
