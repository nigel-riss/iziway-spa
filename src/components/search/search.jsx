import React, { Component } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from '../../utils/const.js';
import { connect } from 'react-redux';
import { ActionCreator } from '../../reducer.js';
import SearchResult from '../search-result/search-result.jsx';

const ESC_KEY_CODE = 27;
const ENTER_KEY_CODE = 13;
const ITEMS_TO_SHOW = 8;
const CHARS_TO_START_SEARCH = 2;


class Search extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: ``,
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleInputFocus = this._handleInputFocus.bind(this);
    this._handleInputBlur = this._handleInputBlur.bind(this);
    this._handleInputKeys = this._handleInputKeys.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  render () {
    const {
      className,
      foundItems,
      onSearchResultClick,
    } = this.props;

    const {
      value,
    } = this.state;

    const itemsToShow = foundItems.slice(0, ITEMS_TO_SHOW);

    return (
      <form
        className={`
          ${className} ${((value.length >= CHARS_TO_START_SEARCH) &&
            (itemsToShow.length > 0) &&
            `search--open`)}
        `}
        onSubmit={this._handleSubmit}
      >
        {value !== `` &&
          <div
            className="search__wrapper"
            onClick={(evt) => {
              evt.preventDefault();
              this.setState({
                value: ``,
              });
            }}
          ></div>
        }

        {value !== `` &&
          <button
            className="search__clear"
            onClick={(evt) => {
              evt.preventDefault();
              this.setState({
                value: ``,
              });
            }}
          />
        }

        <input
          className="search__input"
          type="text"
          placeholder="Я ищу ..."
          onChange={this._handleChange}
          onFocus={this._handleInputFocus}
          onBlur={this._handleInputBlur}
          value={value}
        />
        <div className="search__results">
          {itemsToShow.map((it, i) => {
            return (
              <SearchResult
                key={i}
                image={it.picture.split(`,`)[0]}
                title={`${it.brand} ${it.model}`}
                onSearchResultClick={() => {
                  onSearchResultClick(it);
                }}
              />
            );
          })}
          {foundItems.length > 8 &&
            <button
              className="search__more"
              onClick={this._handleSubmit}
            >
              Показать ещё
            </button>
          }
        </div>
      </form>
    );
  }

  _handleChange (evt) {
    const {
      onSearchInputChange,
    } = this.props;

    onSearchInputChange(evt.target.value);

    this.setState({
      value: evt.target.value,
    });
  }

  _handleSubmit (evt) {
    const {
      onSearchSubmit,
    } = this.props;

    evt.preventDefault();

    onSearchSubmit();

    this.setState({
      value: ``,
    });
  }

  _handleEscKeyDown (evt) {
    evt.preventDefault();

    this.setState({
      value: ``,
    });
  }

  _handleInputKeys (evt) {
    switch (evt.keyCode) {
      case ESC_KEY_CODE:
        this._handleEscKeyDown(evt);
        break;
      case ENTER_KEY_CODE:
        this._handleSubmit(evt);
        break;
      default:
        break;
    }
  }

  _handleInputFocus () {
    document.addEventListener(`keydown`, this._handleInputKeys);
  }

  _handleInputBlur () {
    document.removeEventListener(`keydown`, this._handleInputKeys);
  }
}


const mapStateToProps = (state) => ({
  foundItems: state.foundItems,
});

const mapDispatchToProps = (dispatch) => ({
  onSearchInputChange (query) {
    dispatch(ActionCreator.findItems(query));
  },

  onSearchSubmit () {
    dispatch(ActionCreator.clearFilters());
    dispatch(ActionCreator.applyFoundItems());
  },

  onSearchResultClick (item) {
    dispatch(ActionCreator.setActiveItem(item));
  },
});


const StyledSearch = styled(Search)`
  position: absolute;
  z-index: 9;
  left: 0;
  right: 0;
  margin-bottom: 1rem;
  border-radius: 1.25rem;

  @media (min-width: 1000px) {
    z-index: 11;
    margin-bottom: 0;
    margin-right: 1rem;
  }

  &.search--open {
    box-shadow: 0 0 0.5rem ${rgba(Colors.dark, 0.25)};

    .search__input {
      border-color: ${rgba(Colors.dark, 0.25)};
    }

    .search__results {
      display: block;
    }
  }

  .search__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${rgba(Colors.dark, 0.125)};
    backdrop-filter: blur(2px);
  }

  .search__clear {
    position: absolute;
    z-index: 3;
    right: 0.125rem;
    top: 0.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    width: 2rem;
    padding: 0.5rem 0.25rem;
    border: none;
    border-radius: 50%;
    background-color: ${Colors.turquoise};
    background-image: url('./assets/img/x.svg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 75%;

    &:hover {
      background-color: ${Colors.mist};
      cursor: pointer;
    }

    &:active,
    &:focus {
      opacity: 0.5;
    }
  }

  .search__input {
    position: relative;
    z-index: 2;
    padding: 0.325rem 1.25rem;
    padding-left: 6rem;
    width: 100%;
    border: 1px solid ${rgba(Colors.dark, 0.5)};
    border-radius: 1.25rem;
    background-image: url('./assets/img/search.svg');
    background-repeat: no-repeat;
    background-size: 1.5rem;
    background-position: center left 2rem;

    &:focus {
      border: 1px solid ${rgba(Colors.turquoise, 0.75)};
      outline: none;
    }
  }

  .search__results {
    position: relative;
    z-index: 1;
    top: -1rem;
    display: none;
    padding-top: 2rem;
    width: 100%;
    background-color: ${Colors.white};
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    overflow: hidden;
  }

  .search__more {
    position: relative;
    display: block;
    width: 100%;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 2rem;
    font-size: 1rem;
    font-weight: 700;
    border: none;
    background-color: ${rgba(Colors.mist, 0.25)};
    cursor: pointer;

    &:hover {
      background-color: ${Colors.turquoise};

      &::after {
        background-color: ${rgba(Colors.mist, 0.5)};
      }
    }

    &:active {
      outline: none;
      opacity: 0.75;
    }

    &:focus {
      outline: none;
    }

    &::after {
      content: '';
      position: absolute;
      top: 2.125rem;
      left: 50%;
      transform: translateX(-50%);
      height: 1px;
      width: 12rem;
      background-color: ${rgba(Colors.turquoise, 0.5)};
    }

    &::before {
      content: '';
      position: absolute;
      top: 2.25rem;
      left: 50%;
      transform: translateX(-50%) rotate(180deg);
      height: 1.5rem;
      width: 1.5rem;
      background-image: url('./assets/img/back.svg');
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
`;


export default connect(mapStateToProps, mapDispatchToProps)(StyledSearch);
