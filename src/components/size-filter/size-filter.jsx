import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from '../../utils/const.js';

const SizeFilter = (props) => {
  const {
    className,
    size,
    category,
    isChecked,
    onCheckboxClick,
  } = props;

  return (
    <div className={className}>
      <input
        className="size__checkbox"
        type="checkbox"
        name={category}
        id={`size-${size}`}
        checked={isChecked}
        onChange={() => {
          onCheckboxClick(category, size);
        }}
      />
      <label
        className="size__label"
        htmlFor={`size-${size}`}
      >
        {size}
      </label>
    </div>
  );
};


const StyledSizeFilter = styled(SizeFilter)`
  position: relative;
  margin-right: 0.45rem;
  margin-bottom: 0.45rem;
  font-size: 0;
  width: 2.75rem;
  height: 2.75rem;

  @media (min-width: 1000px) {
    width: 2rem;
    height: 2rem;
  }

  .size__checkbox {
    position: absolute;
    height: 0;
    width: 0;
    font-size: 0;
    opacity: 0;
  }

  .size__label {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    text-align: center;
    border-radius: 50%;
    background-color: ${rgba(Colors.mist, 0.5)};
    cursor: pointer;

    @media (min-width: 1000px) {
      font-size: 0.925rem;
    }
  }

  .size__checkbox:hover + .size__label {
    @media (min-width: 1000px) {
      color: $white;
      background-color: ${Colors.mist};
    }
  }

  .size__checkbox:checked + .size__label {
    color: ${Colors.white};
    background-color: ${Colors.turquoise};
  }
`;


export default StyledSizeFilter;
