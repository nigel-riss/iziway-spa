import React from 'react';


const SimpleFilter = (props) => {
  const {
    name,
    category,
    isChecked,
    onRadioClick,
  } = props;

  return (
    <div className="filter__set">
      <input
        className="filter__checkbox"
        type="checkbox"
        id={name}
        name={category}
        checked={isChecked}
        onChange={() => {
          onRadioClick(category, name);
        }}
      />
      <label
        className="filter__label"
        htmlFor={name}
      >
        {name}
        {/* {`${name} (${count})`} */}
      </label>
    </div>
  );
};


export default SimpleFilter;
