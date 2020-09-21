import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from '../../utils/const.js';
import { connect } from 'react-redux';
import {
  ActionCreator,
  FilterType,
} from '../../reducer.js';
import FilterSet from '../filter-set/filter-set.jsx';
import SimpleFilter from '../simple-filter/simple-filter.jsx';
import ColorFilter from '../color-filter/color-filter.jsx';
import SizeFilter from '../size-filter/size-filter.jsx';


class Filters extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      className,
      filtersConfig,
      onResetButtonClick,
      isFiltersPaneShown,
      onCloseButtonClick,
    } = this.props;

    return (
      <form className={`${className} ${isFiltersPaneShown && `filters--shown`}`}>
        <h2 className="filters__title">Фильтры</h2>
        <button
          className="filters__close"
          onClick={(evt) => {
            evt.preventDefault();
            onCloseButtonClick();
          }}
        >x</button>

        {Object.entries(filtersConfig).map((entry) => {
          const [, config] = entry;
          return (
            <FilterSet
              key={config.name}
              title={config.name}
              extraBodyClass={config.extraBodyClass}
            >
              {this._getFilterSet(config)}
            </FilterSet>
          );
        })}

        <input
          className="filters__reset"
          type="reset"
          value="Сбросить"
          onClick={(evt) => {
            evt.preventDefault();
            onResetButtonClick();
          }}
        />

        <input
          className="filters__apply"
          type="button"
          value="Применить"
          onClick={(evt) => {
            evt.preventDefault();
            onCloseButtonClick();
          }}
        />
      </form>
    );
  }

  _getFilterSet (config) {
    const {
      onCheckboxClick,
      onRadioClick,
    } = this.props;

    switch (config.type) {
      case FilterType.SIMPLE:
        return (
          <React.Fragment>
            {Object.keys(config.values).map((value, i) => {
              if (!value) return;
              return (
                <SimpleFilter
                  key={`${i}=${value}`}
                  name={value}
                  category={config.categoryKey}
                  count={config.values[value].count}
                  isChecked={config.values[value].isChecked}
                  onRadioClick={onRadioClick}
                />
              );
            })}
          </React.Fragment>
        );

      case FilterType.COLOR:
        return (
          <React.Fragment>
            {Object.keys(config.values).map((value, i) => {
              if (!value) return;
              return (
                <ColorFilter
                  key={`${i}=${value}`}
                  color={value || `Белый`}
                  // TODO: Fix color filters issue
                  category={config.categoryKey}
                  isChecked={config.values[value].isChecked}
                  onCheckboxClick={onRadioClick}
                />
              );
            })}
          </React.Fragment>
        );

      case FilterType.SIZE:
        return (
          <React.Fragment>
            {Object.keys(config.values).map((value, i) => {
              if (!value) return;
              return (
                <SizeFilter
                  key={`${i}=${value}`}
                  size={value}
                  category={config.categoryKey}
                  isChecked={config.values[value].isChecked}
                  onCheckboxClick={onCheckboxClick}
                />
              );
            })}
          </React.Fragment>
        );
      default:
        return (null);
    }
  }
}


const mapStateToProps = (state) => ({
  filtersConfig: state.filtersConfig,
  isFiltersPaneShown: state.isFiltersPaneShown,
});

const mapDispatchToProps = (dispatch) => ({
  onRadioClick (category, value) {
    dispatch(ActionCreator.switchFilter(category, value));
    dispatch(ActionCreator.applyFilters());
    dispatch(ActionCreator.setCurrentPage(0));
  },

  onCheckboxClick (category, value) {
    dispatch(ActionCreator.toggleFilter(category, value));
    dispatch(ActionCreator.applyFilters());
    dispatch(ActionCreator.setCurrentPage(0));
  },

  onResetButtonClick () {
    dispatch(ActionCreator.clearFilters());
    dispatch(ActionCreator.applyFilters());
    dispatch(ActionCreator.setCurrentPage(0));
  },

  onCloseButtonClick () {
    dispatch(ActionCreator.toggleFiltersPane(false));
  },
});


const StyledFilters = styled(Filters)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: -110%;
  z-index: 11;
  padding: 2rem;
  width: 100%;
  background-color: ${Colors.white};
  backdrop-filter: blur(5px);
  overflow-y: scroll;
  transition: all 0.25s ease-out;

  @media (min-width: 1000px) {
    position: relative;
    left: 0;
    z-index: 9;
    padding: 2rem 1.5rem;
    padding-right: 1rem;
    overflow: auto;
    background-color: ${rgba(Colors.white, 0.5)};
    backdrop-filter: blur(5px);
  }

  &.filters--shown {
    left: 0;
  }

  .filters__title {
    display: inline-block;
    margin-bottom: 3rem;
    font-size: 1.25rem;
    border-bottom: 1px solid ${Colors.turquoise};

    @media (min-width: 1000px) {
      margin-left: 0;
      font-size: 1.5rem;
    }
  }

  .filters__close {
    position: absolute;
    right: 1rem;
    top: 1.5rem;
    height: 3rem;
    width: 3rem;
    font-size: 0;
    border: none;
    border-radius: 50%;
    background-color: ${rgba(Colors.mist, 0.5)};
    transition: all 0.25s ease-in-out;

    @media (min-width: 1000px) {
      display: none;
    }

    &:hover {
      transform: rotate(180deg);
      cursor: pointer;
      background-color: ${Colors.turquoise};

      &::before, &::after {
        background-color: ${Colors.white};
      }
    }

    &:active {
      background-color: ${Colors.turquoise};

      &::before, &::after {
        background-color: ${Colors.white};
      }
    }

    &:focus {
      outline: none;
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -0.5px) rotate(45deg);
      transform-origin: center;
      height: 1px;
      width: 1.5rem;
      background-color: ${Colors.dark};
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -0.5px) rotate(135deg);
      transform-origin: center;
      height: 1px;
      width: 1.5rem;
      background-color: ${Colors.dark};
    }
  }

  .filters__reset {
    display: block;
    margin-top: 1.5rem;
    padding: 0.5rem 1.5rem;
    width: 100%;
    color: ${Colors.turquoise};
    font-size: 1.125rem;
    border: 2px solid transparent;
    background-color: ${Colors.dark};
    border-radius: 2rem;
    cursor: pointer;
    transition: all 0.25s ease-out;

    &:hover {
      color: ${Colors.white};
      background-color: ${Colors.turquoise};
    }

    &:focus {
      outline: none;
    }
  }

  .filters__apply {
    display: block;
    margin-top: 1rem;
    padding: 0.5rem 1.5rem;
    width: 100%;
    color: ${Colors.dark};
    font-size: 1.125rem;
    border: 2px solid ${Colors.dark};
    background-color: ${Colors.white};
    border-radius: 2rem;

    &:hover {
      background-color: ${Colors.turquoise};
      border-color: ${Colors.turquoise};
      color: ${Colors.white};
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }

    @media (min-width: 1000px) {
      display: none;
    }
  }
`;


export default connect(mapStateToProps, mapDispatchToProps)(StyledFilters);
