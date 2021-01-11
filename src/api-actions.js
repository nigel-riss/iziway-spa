import { ActionCreator } from './reducer.js';


const fetchData = () => (dispatch, _getState, api) => {
  return api.get(`data.json`)
    .then(({ data }) => {
      dispatch(ActionCreator.setItems(data));
      dispatch(ActionCreator.clearFilters());
      dispatch(ActionCreator.applyFilters());
    })
    .catch((err) => {
      console.log(`Error while loading data: ${err}`);
    });
};


export {
  fetchData,
};
