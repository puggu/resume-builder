/**
 *
 * Asynchronously loads the component for DuDashBoard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
