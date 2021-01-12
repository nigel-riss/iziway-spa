import { ActionCreator } from './reducer.js';
import {
  DEFAULT_ITEM_GROUP,
  GroupToCategoryArray,
} from './utils/const.js';


const fetchData = () => (dispatch, _getState, api) => {
  return api.get(`data.json`)
    .then(({ data }) => {
      data.forEach((it) => {
        const id = it.product_url.split(`=`)[2];
        it.id = id;

        const nameStart = it.name.split(` `)[0];
        if (~GroupToCategoryArray.footwear.indexOf(nameStart)) {
          return;
        }
        it.itemType = nameStart;
      });
      console.log(data);

      dispatch(ActionCreator.setItems(data));
      dispatch(ActionCreator.clearFilters(DEFAULT_ITEM_GROUP));
      dispatch(ActionCreator.applyFilters(DEFAULT_ITEM_GROUP));
    })
    .catch((err) => {
      console.log(`Error while loading data: ${err}`);
    });
};


export {
  fetchData,
};
