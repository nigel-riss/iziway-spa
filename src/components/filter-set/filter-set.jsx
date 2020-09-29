import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from '../../utils/const.js';

class FilterSet extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      isOpen: true,
    };
  }

  componentDidMount () {
    if (window.innerWidth < 1000) {
      this.setState({
        isOpen: false,
      });
    }
  }

  render () {
    const {
      className,
      title,
      children,
      extraBodyClass,
    } = this.props;

    const {
      isOpen,
    } = this.state;

    return (
      <fieldset className={className}>
        <h3
          className={`filter__title ${isOpen && `filter__title--open`}`}
          onClick={() => {
            this.setState((state) => ({
              isOpen: !state.isOpen,
            }));
          }}
        >
          {title}
        </h3>
        <div
          className={`
            filter__body ${isOpen && `filter__body--open`} ${extraBodyClass}
          `}
        >
          {children}
        </div>
      </fieldset>
    );
  }
}


const StyledFilterSet = styled(FilterSet)`
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
  border: none;

  &:hover .filter__body{
    ::-webkit-scrollbar-thumb {
      background-color: ${Colors.mist};
    }
  }

  .filter__title {
    position: relative;
    margin-bottom: 1rem;
    font-size: 1.125rem;
    cursor: pointer;
    transition: all 0.25s ease-out;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      transform-origin: center center;
      transform: rotate(90deg);
      height: 1.5rem;
      width: 1.5rem;
      margin-left: 0.5rem;
      background-image: url('/assets/img/back.svg');
      background-repeat: no-repeat;
      background-size: 50%;
      background-position: center center;
      border-radius: 50%;
      opacity: 0.375;
      transition: all 0.25s ease-out;
    }

    &:active {
      color: ${Colors.turquoise};

      &::after {
        background-color: ${Colors.turquoise};
      }
    }

    @media (min-width: 1000px) {
      &:hover {
        color: ${Colors.red};
    
        &::after {
          background-color: ${Colors.mist};
        }
      }
    }
  }

  .filter__title--open {
    &::after {
      transform: rotate(180deg);
    }
  }

  .filter__body {
    padding: 0;
    max-height: 0;
    overflow-y: auto;
    transition: all 0.125s linear;

    @media (min-width: 1000px) {
      transition: all 0.125s ease-in-out;
    }
  }

  .filter__body--open {
    padding: 0.25rem 0;
    max-height: 9999px;

    @media (min-width: 1000px) {
      max-height: 280px;
    }
  }

  .filter__body--fx.filter__body--open {
    overflow: visible;
  }

  .filter__body--fx {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .filter__set {
    margin-bottom: 1rem;
  }

  .filter__checkbox {
    width: 0;
    height: 0;
    display: none;
  }

  .filter__label {
    cursor: pointer;

    &:hover {
      color: ${Colors.turquoise};
    }

    @media (min-width: 1000px) {
      font-size: 0.9rem;
    }
  }

  .filter__checkbox + .filter__label {
    position: relative;
    margin-left: 1.5rem;

    &::before {
      content: '';
      position: absolute;
      left: -1.5rem;
      top: 0.125rem;
      display: inline-block;
      vertical-align: bottom;
      height: 1rem;
      width: 1rem;
      background-color: ${Colors.mist};
      border-radius: 50%;
    }

    &:hover::before {
      background-color: ${Colors.dark};
    }
  }

  .filter__checkbox:checked + .filter__label {
    font-weight: 700;

    &::before {
      background-color: ${Colors.turquoise};
    }
  }


  .filter__input {
    &:focus {
      border: 1px solid ${rgba(Colors.dark, 0.75)};
      outline: none;
    }
  }

  .filter__input--price {
    margin-left: 5px;
    margin-right: 20px;
    width: 80px;
    text-align: center;
    border: 1px solid transparent;
    border-bottom: 1px solid ${rgba(Colors.dark, 0.25)};
  }

  .filter__input--search {
    width: 100%;
    margin-bottom: 20px;
    padding: 5px 20px;
    border: 1px solid ${rgba(Colors.dark, 0.25)};
  }
`;


export default StyledFilterSet;
