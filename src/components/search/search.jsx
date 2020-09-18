import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import SearchResult from '../search-result/search-result.jsx';

const ESC_KEY_CODE = 27;
const ENTER_KEY_CODE = 13;
const ITEMS_TO_SHOW = 8;
const CHARS_TO_START_SEARCH = 2;


class Search extends Component {
  constructor(props) {
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

  render() {
    const {
      foundItems,
      onSearchResultClick,
    } = this.props;

    const {
      value,
    } = this.state;

    const itemsToShow = foundItems.slice(0, ITEMS_TO_SHOW);

    return (
      <form
        className={
          `search ${value.length >= CHARS_TO_START_SEARCH &&
            itemsToShow.length > 0 && `search--open`}`
        }
        onSubmit={this._handleSubmit}
      >
        {value != `` &&
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
        
        {value != `` &&
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
            )
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

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _handleChange(evt) {
    const {
      onSearchInputChange,
    } = this.props;

    onSearchInputChange(evt.target.value);

    this.setState({
      value: event.target.value,
    });
  }

  _handleSubmit(evt) {
    const {
      onSearchSubmit,
    } = this.props;

    evt.preventDefault();

    onSearchSubmit();

    this.setState({
      value: ``,
    });
  }

  _handleEscKeyDown(evt) {
    evt.preventDefault();

    console.log(`esc pressed`);

    this.setState({
      value: ``,
    });
  }

  _handleInputKeys(evt) {
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

  _handleInputFocus() {
    document.addEventListener(`keydown`, this._handleInputKeys);
  }

  _handleInputBlur() {
    document.removeEventListener(`keydown`, this._handleInputKeys);
  }
}


const mapStateToProps = (state) => ({
  foundItems: state.foundItems,
});

const mapDispatchToProps = (dispatch) => ({
  onSearchInputChange(query) {
    dispatch(ActionCreator.findItems(query));
  },

  onSearchSubmit() {
    dispatch(ActionCreator.clearFilters());
    dispatch(ActionCreator.applyFoundItems());
  },

  onSearchResultClick(item) {
    dispatch(ActionCreator.setActiveItem(item));
  },
});


export {Search};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
