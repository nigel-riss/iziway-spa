import {
  extend,
  getValuesCount,
  getAllSizes,
} from './utils/data.js';
import { GroupToCategoryArray } from './utils/const.js';


const getItemById = (state) => (id) => state.items.find(it => +it.id === +id);
const searchBans = [
  // `Nike`,
];


// //////////////
// Item groups //
// //////////////
const _getItemsFromGroup = (data, groupName) => {
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
  itemType: {
    name: `Модель`,
    type: FilterType.SIMPLE,
    categoryKey: `itemType`,
    values: [],
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
    bans: [
      `Nike`,
    ],
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

const _setFiltersValues = (items, filtersConfigBoilerplate) => {
  const filtersConfig = JSON
    .parse(JSON.stringify(filtersConfigBoilerplate));

  for (const key in filtersConfig) {
    const config = filtersConfig[key];

    switch (config.type) {
      case FilterType.SIMPLE:
      case FilterType.COLOR:
        config.values = getValuesCount(items, config.categoryKey);

        // Удаляем фильтры из банов
        config?.bans?.forEach((ban) => {
          delete config.values[ban];
        });

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

const _getFilteredItems = (items, filtersConfig) => {
  let itemsToFilter = items.slice();
  const configs = Object.entries(filtersConfig);

  configs.forEach((config) => {
    const [
      category,
      settings,
    ] = config;

    // Filtering items accorgint to filters
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

    // Filtering banned items
    const bans = config[1].bans;
    if (bans && bans.length > 0) {
      itemsToFilter = itemsToFilter.filter((it) => {
        return !bans.some((value) => {
          return it[category].toLowerCase() === value.toLowerCase();
        });
      });
    }
  });

  return itemsToFilter;
};

const _filterItems = (items, category, type, filteringValues) => {
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
const getSearchedItems = (items, options, bans) => {
  const {
    itemGroup,
    query,
  } = options;
  let itemsToSearch = _getItemsFromGroup(items, itemGroup);
  itemsToSearch = itemsToSearch.filter(it => {
    const compareString = `${it.brand.toLowerCase()} ${it.model.toLowerCase()}`;
    const canShow = !bans.some(ban => {
      return compareString.includes(ban.toLowerCase());
    });

    return compareString.includes(query.toLowerCase()) && canShow;
  });

  return itemsToSearch;
};


const initialState = {
  items: [],
  filteredItems: [],
  filtersConfig: null,
  currentPage: 0,
  currentItemGroup: null,
  isFiltersPaneShown: false,
  foundItems: [],
};


const ActionType = {
  SET_ITEMS: `SET_ITEMS`,
  SET_ITEM_GROUP: `SET_ITEM_GROUP`,
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
  setItems: (items) => ({
    type: ActionType.SET_ITEMS,
    payload: items,
  }),

  setItemGroup: (itemGroup) => ({
    type: ActionType.SET_ITEM_GROUP,
    payload: itemGroup,
  }),

  toggleFilter: (category, value) => ({
    type: ActionType.TOGGLE_FILTER,
    payload: { category, value },
  }),

  switchFilter: (category, value) => ({
    type: ActionType.SWITCH_FILTER,
    payload: { category, value },
  }),

  clearFilters: (itemGroup) => ({
    type: ActionType.CLEAR_FILTERS,
    payload: itemGroup,
  }),

  applyFilters: (itemGroup) => ({
    type: ActionType.APPLY_FILTERS,
    payload: itemGroup,
  }),

  setCurrentPage: (pageNumber) => ({
    type: ActionType.SET_CURRENT_PAGE,
    payload: pageNumber,
  }),

  toggleFiltersPane: (isPaneShown) => ({
    type: ActionType.TOGGLE_FILTERS_PANE,
    payload: isPaneShown,
  }),

  findItems: (options) => ({
    type: ActionType.FIND_ITEMS,
    payload: options,
  }),

  applyFoundItems: () => ({
    type: ActionType.APPLY_FOUND_ITEMS,
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ITEMS:
      return extend(state, {
        items: action.payload,
      });
    case ActionType.SET_ITEM_GROUP:
      return extend(state, {
        currentItemGroup: action.payload,
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
        filtersConfig: _setFiltersValues(
          _getItemsFromGroup(state.items, action.payload),
          FILTERS_CONFIG_BOILERPLATE
        ),
      });
    case ActionType.APPLY_FILTERS:
      return extend(state, {
        filteredItems: _getFilteredItems(
          _getItemsFromGroup(state.items, action.payload),
          state.filtersConfig
        ),
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
        foundItems: getSearchedItems(state.items, action.payload, searchBans),
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
  reducer,
  ActionType,
  ActionCreator,
  FilterType,
};
