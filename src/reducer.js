// import data from './mocks/bizoutmax.origin.js';
import data from './mocks/fix-biz.json';
import {
  extend,
  getValuesCount,
  getAllSizes,
} from './utils/data.js';


const sneakers = data.filter((it) => {
  const category = it.name.split(` `)[0];
  return category === `Кроссовки`;
});


///////////////
// Filtering //
///////////////

const getFilteredItems = (items, filtersConfig) => {
  let itemsToFilter = items.slice();
  const configs = Object.entries(filtersConfig);

  configs.forEach((config) => {
    const [
      category,
      settings,
    ] = config;

    const filteringValues = Object
      .entries(settings.values)
      .filter((it) => it[1].isChecked === true);

    const isFiltering = filteringValues.length > 0;

    if (isFiltering) {
      itemsToFilter = filterItems(
        itemsToFilter,
        category,
        settings.type,
        filteringValues
      );
    }
  });

  return itemsToFilter;
};


const filterItems = (items, category, type, filteringValues) => {
  items = items.filter((item) => {
    return filteringValues.some((value) => {
      switch (type) {
        case FilterType.SIZE:
          return item[category].includes(value[0]);
        case FilterType.SIMPLE:
        case FilterType.COLOR:
          return value[0] === item[category];
      }
    });
  });

  return items;
}


const FilterType = {
  SIMPLE: `SIMPLE`,
  MIN_MAX: `MIN_MAX`,
  COLOR: `COLOR`,
  SIZE: `SIZE`,
};

const FILTERS_CONFIG = {
  type: {
    name: `Категория`,
    type: FilterType.SIMPLE,
    categoryKey: `type`,
    values: [],
  },
  sizes: {
    name: `Размер обуви`,
    type: FilterType.SIZE,
    categoryKey: `sizes`,
    values: [],
    extraBodyClass: `filter__body--fx`,
  },
  // price: {
  //   name: `Цена`,
  //   type: FilterType.MIN_MAX,
  //   categoryKey: `price`,
  //   values: [],
  // },
  brand: {
    name: `Производители`,
    type: FilterType.SIMPLE,
    categoryKey: `brand`,
    values: [],
  },
  color: {
    name: `Цвет`,
    type: FilterType.COLOR,
    categoryKey: `color`,
    values: [],
    extraBodyClass: `filter__body--fx`,
  },
  season: {
    name: `Сезон`,
    type: FilterType.SIMPLE,
    categoryKey: `season`,
    values: [],
  },
  category: {
    name: `Стиль`,
    type: FilterType.SIMPLE,
    categoryKey: `category`,
    values: [],
  },
};


for (const key in FILTERS_CONFIG) {
  const config = FILTERS_CONFIG[key];

  switch(config.type) {
    case FilterType.SIMPLE:
    case FilterType.COLOR:
      config.values = getValuesCount(sneakers, config.categoryKey);
      for (const key in config.values) {
        config.values[key][`isChecked`] = false;
      }
      break;
    case FilterType.SIZE:
      config.values = getAllSizes(sneakers)
        .reduce((acc, size) => {
          acc[size] = {
            isChecked: false,
          };
          return acc;
        }, {});
      break;
    case FilterType.MIN_MAX:
      break;
  }
};


const _toggleFilter = (state, {category, value}) => {
  const filtersConfigCopy = JSON.parse(JSON.stringify(state.filtersConfig));
  filtersConfigCopy[category][`values`][value][`isChecked`] = !state.filtersConfig[category][`values`][value][`isChecked`];
  return filtersConfigCopy;
};

const _switchFilter = (state, {category, value}) => {
  const filtersConfigCopy = JSON.parse(JSON.stringify(state.filtersConfig));
  Object.keys(filtersConfigCopy[category][`values`])
    .forEach(key => {
      filtersConfigCopy[category][`values`][key][`isChecked`] = false;
    });
  // filtersConfigCopy[category][`values`][value][`isChecked`] = true;
  filtersConfigCopy[category][`values`][value][`isChecked`] = !state.filtersConfig[category][`values`][value][`isChecked`];

  return filtersConfigCopy;
};


///////////////
// Searching //
///////////////
const getSearchedItems = (items, query) => {
  let itemsToSearch = items.slice();
  return itemsToSearch.filter(it => {
    const compareString = `${it.brand.toLowerCase()} ${it.model.toLowerCase()}`;
    return compareString.includes(query.toLowerCase());
  });
};


const initialState = {
  items: sneakers.slice(),
  filteredItems: sneakers.slice(),
  filtersConfig: JSON.parse(JSON.stringify(FILTERS_CONFIG)),
  activeItem: null,
  currentPage: 0,
  isFiltersPaneShown: false,
  foundItems: [],
};


const ActionType = {
  SET_ACTIVE_ITEM: `SET_ACTIVE_ITEM`,
  CLEAR_ACTIVE_ITEM: `CLEAR_ACTIVE_ITEM`,
  TOGGLE_FILTER: `TOGGLE_FILTER`,
  SWITCH_FILTER: `SWITCH_FILTER`,
  CLEAR_FILTERS: `CLEAR_FILTERS`,
  APPLY_FILTERS: `APPLY_FILTERS`,
  SET_CURRENT_PAGE: `SET_CURRENT_PAGE`,
  TOGGLE_FILTERS_PANE: `TOGGLE_FILTERS_PANE`,
  FIND_ITEMS: `FIND_ITEMS`,
  APPLY_FOUND_ITEMS: `APPLY_FOUND_ITEMS`,
};


const ActionCreator = {
  setActiveItem: (item) => ({
    type: ActionType.SET_ACTIVE_ITEM,
    payload: item,
  }),

  clearActiveItem: () => ({
    type: ActionType.CLEAR_ACTIVE_ITEM,
  }),

  toggleFilter: (category, value) => ({
    type: ActionType.TOGGLE_FILTER,
    payload: {category, value},
  }),

  switchFilter: (category, value) => ({
    type: ActionType.SWITCH_FILTER,
    payload: {category, value},
  }),

  clearFilters: () => ({
    type: ActionType.CLEAR_FILTERS,
  }),

  applyFilters: (filtersConfig) => ({
    type: ActionType.APPLY_FILTERS,
    payload: filtersConfig,
  }),

  setCurrentPage: (pageNumber) => ({
    type: ActionType.SET_CURRENT_PAGE,
    payload: pageNumber,
  }),

  toggleFiltersPane: (isPaneShown) => ({
    type: ActionType.TOGGLE_FILTERS_PANE,
    payload: isPaneShown,
  }),

  findItems: (query) => ({
    type: ActionType.FIND_ITEMS,
    payload: query,
  }),

  applyFoundItems: () => ({
    type: ActionType.APPLY_FOUND_ITEMS,
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_ITEM:
      return extend(state, {
        activeItem: action.payload,
      });
    case ActionType.CLEAR_ACTIVE_ITEM:
      return extend(state, {
        activeItem: null,
      });
    case ActionType.TOGGLE_FILTER:
      return extend(state, {
        filtersConfig: _toggleFilter(state, action.payload),
      });
    case ActionType.SWITCH_FILTER:
      return extend(state, {
        filtersConfig: _switchFilter(state, action.payload),
      });
    case ActionType.CLEAR_FILTERS:
      return extend(state, {
        filtersConfig: JSON.parse(JSON.stringify(FILTERS_CONFIG)),
      });
    case ActionType.APPLY_FILTERS:
      const filteredItems = getFilteredItems(state.items, state.filtersConfig);
      return extend(state, {
        filteredItems,
      });
    case ActionType.SET_CURRENT_PAGE:
      return extend(state, {
        currentPage: action.payload,
      });
    case ActionType.TOGGLE_FILTERS_PANE:
      return extend(state, {
        isFiltersPaneShown: action.payload,
      });
    case ActionType.FIND_ITEMS:
      return extend(state, {
        foundItems: getSearchedItems(state.items, action.payload),
      });
    case ActionType.APPLY_FOUND_ITEMS:
      return extend(state, {
        filteredItems: state.foundItems.slice(),
      });
    default:
      return state;
  }
};


export {
  reducer,
  ActionType,
  ActionCreator,
  FilterType,
};
