import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  ITEM_GROUPS,
  Colors,
} from '../../utils/const.js';
import { ActionCreator } from '../../reducer.js';
import history from '../../history.js';


class GroupNav extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      itemGroup,
      className,
      onGroupLinkClick,
    } = this.props;

    return (
      <ul className={className}>
        {Object.entries(ITEM_GROUPS).map((it, i) => {
          const [key, value] = it;
          return (
            <li
              className={`header__nav-item ${itemGroup === key &&
                `header__nav-item--active`}`}
              key={i}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onGroupLinkClick(key);
                }}
              >
                {value}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}


const StyledGroupNav = styled(GroupNav)`
  @media (min-width: 1000px) {
    display: flex;
    justify-content: center;
  }

  .header__nav-item {
    margin: 1rem 0;
    font-size: 1.125rem;
    font-weight: 400;
    text-align: center;

    @media (min-width: 1000px) {
      margin: 1rem 1.5rem;
      margin-left: 2rem;
      font-size: 1.25rem;
    }
  }

  .header__nav-item--active a {
    position: relative;
    font-weight: 700;

    &::after {
      content: '';
      position: absolute;
      left: -2rem;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      background-color: ${Colors.turquoise}
    }

    @media (min-width: 1000px) {
      &::after {
        bottom: -2.875rem;
        top: auto;
        left: 50%;
        height: 1.5rem;
        width: 1.5rem;
        transform: translateX(-50%);
      }
    }
  }

  .header__nav-item a {
    color: ${Colors.dark};
    text-decoration: none;

    &:hover {
      color: ${Colors.turquoise};
    }
  }
`;


const mapDispatchToProps = (dispatch) => ({
  onGroupLinkClick (itemGroup) {
    history.push(`/${itemGroup}`);
    dispatch(ActionCreator.clearFilters(itemGroup));
    dispatch(ActionCreator.applyFilters(itemGroup));
  },
});

export default connect(null, mapDispatchToProps)(StyledGroupNav);
