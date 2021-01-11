import { ActionCreator } from './reducer.js';
import { GroupToCategoryArray } from './utils/const.js';


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
      dispatch(ActionCreator.clearFilters(`footwear`));
      dispatch(ActionCreator.applyFilters(`footwear`));
    })
    .catch((err) => {
      console.log(`Error while loading data: ${err}`);
    });
};


export {
  fetchData,
};
