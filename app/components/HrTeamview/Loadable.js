/**
 *
 * Asynchronously loads the component for HrTeamview
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
