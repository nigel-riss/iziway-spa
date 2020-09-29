import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from '../../utils/const.js';
import {
  ColorNameToHexMap,
  getGradientFromArray,
} from '../../utils/style.js';


const ColorFilter = (props) => {
  const {
    className,
    color,
    category,
    isChecked,
    onCheckboxClick,
  } = props;

  const colorHexArray = ColorNameToHexMap[color.toLowerCase()] || [`#ffffff`];

  return (
    <div className={className}>
      <input
        className="color__checkbox"
        type="checkbox"
        name={category}
        id={`color-${color}`}
        checked={isChecked}
        onChange={() => {
          onCheckboxClick();
        }}
      />
      <label
        className="color__label"
        htmlFor={`color-${color}`}
        style={{
          backgroundImage: `${getGradientFromArray(colorHexArray)}`,
        }}
      ></label>
    </div>
  );
};


const StyledColorFilter = styled(ColorFilter)`
  position: relative;
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0;

  @media (min-width: 1000px) {
    margin: 0.25rem;
  }

  .color__checkbox {
    position: absolute;
    height: 1rem;
    width: 1rem;
    opacity: 0;
  }

  .color__label {
    display: inline-block;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 5px ${rgba(Colors.mist, 1)};

    @media (min-width: 1000px) {
      height: 1.75rem;
      width: 1.75rem;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  .color__checkbox:checked + .color__label {
    &::before {
      content: '';
      position: absolute;
      top: -0.25rem;
      left: -0.25rem;
      height: 2.5rem;
      width: 2.5rem;
      border: 0.25rem solid ${Colors.turquoise};
      border-radius: 50%;

      @media (min-width: 1000px) {
        height: 2.25rem;
        width: 2.25rem;
      }
    }
  }
`;


export default StyledColorFilter;
