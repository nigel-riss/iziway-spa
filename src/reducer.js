import data from './mocks/fix-biz.json';
import {
  extend,
  getValuesCount,
  getAllSizes,
} from './utils/data.js';
import { GroupToCategoryArray } from './utils/const.js';


data.forEach((it) => {
  const id = it.product_url.split(`=`)[2];
  it.id = id;
});

const getItemById = (id) => data.find(it => +it.id === +id);


// //////////////
// Item groups //
// //////////////
const getItemsFromGroup = (data, groupName) => {
  const categories = GroupToCategoryArray[groupName];
  return data.filter((item) => {
    return categories.some((categoryName) => {
      return item.name.split(` `)[0] === categoryName;
    });
  });
};


// ////////////
// Filtering //
// ////////////
const FilterType = {
  SIMPLE: `SIMPLE`,
  MIN_MAX: `MIN_MAX`,
  COLOR: `COLOR`,
  SIZE: `SIZE`,
};

const FILTERS_CONFIG_BOILERPLATE = {
  type: {
    name: `Категория`,
    type: FilterType.SIMPLE,
    categoryKey: `type`,
    values: [],
  },
  sizes: {
    name: `Размер`,
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

const _getFilteredItems = (items, filtersConfig) => {
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
      itemsToFilter = _filterItems(
        itemsToFilter,
        category,
        settings.type,
        filteringValues
      );
    }
  });

  return itemsToFilter;
};


const _filterItems = (items, category, type, filteringValues) => {
  console.table(category, type, filteringValues);
  items = items.filter((item) => {
    return filteringValues.some((value) => {
      switch (type) {
        case FilterType.SIZE:
          return item.sizes.split(`,`)
            .some((it) => parseInt(it, 10) === parseInt((value[0]), 10));
        case FilterType.SIMPLE:
        case FilterType.COLOR:
          return value[0] === item[category];
      }
    });
  });

  return items;
};

const _setFiltersValues = (items, filtersConfigBoilerplate) => {
  const filtersConfig = JSON
    .parse(JSON.stringify(filtersConfigBoilerplate));

  for (const key in filtersConfig) {
    const config = filtersConfig[key];

    switch (config.type) {
      case FilterType.SIMPLE:
      case FilterType.COLOR:
        config.values = getValuesCount(items, config.categoryKey);
        for (const key in config.values) {
          config.values[key].isChecked = false;
        }
        break;
      case FilterType.SIZE:
        config.values = getAllSizes(items)
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
  }

  return filtersConfig;
};

const _toggleFilter = (state, { category, value }) => {
  const filtersConfigCopy = JSON.parse(JSON.stringify(state.filtersConfig));
  filtersConfigCopy[category].values[value].isChecked = !state.filtersConfig[category].values[value].isChecked;
  return filtersConfigCopy;
};

const _switchFilter = (state, { category, value }) => {
  const filtersConfigCopy = JSON.parse(JSON.stringify(state.filtersConfig));
  Object.keys(filtersConfigCopy[category].values)
    .forEach(key => {
      filtersConfigCopy[category].values[key].isChecked = false;
    });
  filtersConfigCopy[category].values[value].isChecked = !state.filtersConfig[category].values[value].isChecked;

  return filtersConfigCopy;
};


// ////////////
// Searching //
// ////////////
const getSearchedItems = (items, query) => {
  const itemsToSearch = items.slice();
  return itemsToSearch.filter(it => {
    const compareString = `${it.brand.toLowerCase()} ${it.model.toLowerCase()}`;
    return compareString.includes(query.toLowerCase());
  });
};


const initialState = {
  items: data.slice(),
  activeGroup: `footwear`,
  filteredItems: data.slice(),
  filtersConfig: _setFiltersValues(data.slice(), FILTERS_CONFIG_BOILERPLATE),
  currentPage: 0,
  isFiltersPaneShown: false,
  foundItems: [],
};

const ActionType = {
  SET_ACTIVE_GROUP: `SET_ACTIVE_GROUP`,
  SET_ACTIVE_ITEM: `SET_ACTIVE_ITEM`,
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
  setActiveGroup: (groupName) => ({
    type: ActionType.SET_ACTIVE_GROUP,
    payload: groupName,
  }),

  toggleFilter: (category, value) => ({
    type: ActionType.TOGGLE_FILTER,
    payload: { category, value },
  }),

  switchFilter: (category, value) => ({
    type: ActionType.SWITCH_FILTER,
    payload: { category, value },
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
    case ActionType.SET_ACTIVE_GROUP:
      return extend(state, {
        items: getItemsFromGroup(data, action.payload),
        activeGroup: action.payload,
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
        filtersConfig: _setFiltersValues(state.items, FILTERS_CONFIG_BOILERPLATE),
      });
    case ActionType.APPLY_FILTERS:
      return extend(state, {
        filteredItems: _getFilteredItems(state.items, state.filtersConfig),
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
  getItemById,
  getItemsFromGroup,
  reducer,
  ActionType,
  ActionCreator,
  FilterType,
};
