import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from '../../utils/const.js';
import { connect } from 'react-redux';
import { ActionCreator } from '../../reducer.js';


class Buttons extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      className,
      onFiltersToggleClick,
    } = this.props;

    return (
      <button
        className={className}
        onClick={(evt) => {
          evt.preventDefault();
          onFiltersToggleClick();
        }}
      >
        Фильтры
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onFiltersToggleClick () {
    dispatch(ActionCreator.toggleFiltersPane(true));
  },
});


const StyledButtons = styled(Buttons)`
  padding: 0.5rem 1rem;
  padding-left: 2.5rem;
  margin-left: auto;
  margin-right: 0;

  font-size: 1rem;

  border: 1px solid ${rgba(Colors.mist, 0.5)};
  border-radius: 2rem;

  background-color: transparent;
  background-image: url('./assets/img/filter.svg');
  background-repeat: no-repeat;
  background-position: center left 1rem;
  background-size: 1rem;
  cursor: pointer;

  &:hover {
    border: 1px solid ${rgba(Colors.dark, 0.25)};
    background-color: ${rgba(Colors.mist, 0.25)};
  }

  &:active {
    border: 1px solid ${rgba(Colors.turquoise, 0.5)};
    background-color: ${rgba(Colors.mist, 0.5)};
    outline: none;
  }
`;


export default connect(null, mapDispatchToProps)(StyledButtons);
