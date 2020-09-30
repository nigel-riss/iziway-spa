import React from 'react';
import styled from 'styled-components';
import { getAllSizes } from '../../utils/data.js';


const ItemSpecs = (props) => {
  const {
    className,
    item,
  } = props;

  const {
    category,
    color,
    model,
    season,
  } = item;

  return (
    <div className={className}>
      <div className="item-popup__main-specs">
        {color && <div className="spec">
          <h3 className="spec__title">Цвет:</h3>
          <span className="spec__value">{color}</span>
        </div>}
        {season && <div className="spec">
          <h3 className="spec__title">Сезон:</h3>
          <span className="spec__value">{season}</span>
        </div>}
        {category && <div className="spec">
          <h3 className="spec__title">Категория:</h3>
          <span className="spec__value">{category}</span>
        </div>}
        {model && <div className="spec">
          <h3 className="spec__title">Модель:</h3>
          <span className="spec__value">{model}</span>
        </div>}
      </div>
      <div className="item-popup__sizes">
        <div className="spec">
          <h3 className="spec__title spec__title--block">Размеры в наличии</h3>
          {getAllSizes([item]).map((size, i) => {
            return (
              <span className="spec__value" key={i}>{size}</span>
            );
          })}
        </div>
      </div>
    </div>
  );
};


const StyledItemSpecs = styled(ItemSpecs)`
  margin-bottom: 2rem;

  @media (min-width: 1000px) {
    margin-bottom: 4rem;
  }

  .spec {
    margin-bottom: 0.75rem;
  }

  .spec__title {
    display: inline-block;
    margin-right: 0.75rem;
    font-size: 1rem;

    @media (min-width: 1000px) {
      font-size: 1.125rem;
    }

    &--block {
      display: block;
    }
  }

  .spec__value {
    margin-right: 1.5rem;
    font-size: 1rem;

    @media (min-width: 1000px) {
      font-size: 1.125rem;
    }
  }
`;


export default StyledItemSpecs;
