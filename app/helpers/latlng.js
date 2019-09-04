import { helper } from '@ember/component/helper';
/* global L */
export const latLng = function(params) {
  return L.latLng(params[0], params[1]);
};

export default helper(latLng);
