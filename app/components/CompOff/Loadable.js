/**
 *
 * Asynchronously loads the component for CompOff
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
