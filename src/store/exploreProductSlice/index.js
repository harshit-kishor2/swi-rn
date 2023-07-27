export * from './exploreProduct.action';

import {exploreProductReducer, resetSliceState} from './exploreProduct.slice';
import {
  addToCompareReducer,
  resetAddToProductSliceState,
  onAddToProductCompare,
} from './addToCompare.slice';
export {
  resetSliceState,
  addToCompareReducer,
  resetAddToProductSliceState,
  onAddToProductCompare,
};

export default exploreProductReducer;
