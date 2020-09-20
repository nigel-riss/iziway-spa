import React from 'react';
import {
  ColorNameToHexMap,
  getGradientFromArray,
} from '../../utils/style.js';


const ColorFilter = (props) => {
  const {
    color,
    category,
    isChecked,
    onCheckboxClick,
  } = props;

  return (
    <div className="color">
      <input
        className="color__checkbox"
        type="checkbox"
        name={category}
        id={`color-${color}`}
        checked={isChecked}
        onChange={() => {
          onCheckboxClick(category, color);
        }}
      />
      <label
        className="color__label"
        htmlFor={`color-${color}`}
        style={{
          backgroundImage: `${getGradientFromArray(ColorNameToHexMap[color])}`,
        }}
      ></label>
    </div>
  );
};


export default ColorFilter;
