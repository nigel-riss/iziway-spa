import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';


class Buttons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onFiltersToggleClick,
    } = this.props;

    return (
      <button
        className="toggle-filters"
        onClick={(evt) => {
          evt.preventDefault();
          onFiltersToggleClick();
        }}
      >Фильтры</button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onFiltersToggleClick() {
    dispatch(ActionCreator.toggleFiltersPane(true));
  },
});


export {Buttons};
export default connect(null, mapDispatchToProps)(Buttons);
