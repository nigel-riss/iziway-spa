import React from 'react';
import styled from 'styled-components';
import {rgba} from 'polished';
import {Colors} from '../../utils/const.js';


const ItemCard = (props) => {
  const {
    className,
    item,
    onCardClick,
  } = props;

  const {
    brand,
    model,
    picture,
    vendor,
    sizes,
  } = item;

  const mainImageURL = picture.split(`,`)[0];
  const sizesArray = sizes.split(`, `);

  return (
    <article
      className={className}
      onClick={() => {
        onCardClick(props.item);
      }}
    >
      <div className="__image">
        <img
          src={mainImageURL}
          alt={name}
        />
      </div>
      <div className="__body">
        <h3 className="__title">{brand}<br/>{model}</h3>
        <p className="__vendor-code">Артикул: {vendor}</p>
        <div className="__sizes">
          <p className="__size-title">Размеры в наличии</p>
          <ul className="__size-list">
            {sizesArray.map((size, i) => {
              return (
                <li className="__size-item" key={`${i}`}>
                  {size}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
};


const StyledItemCard = styled(ItemCard)`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;

  border: 1px solid ${rgba(Colors.dark, 0.25)};

  @media (min-width: 1000px) {
    flex-direction: column;
    max-width: 220px;
    flex-basis: 220px;
    margin-right: 15px;
  }

  &:hover {
    border-color: ${Colors.dark};
    cursor: pointer;
  }

  &:active {
    border-color: ${Colors.turquoise};
  }

  .__image {
    position: relative;

    flex-basis: 40%;

    border-right: 1px solid ${rgba(Colors.dark, 0.125)};

    overflow: hidden;
    
    @media (min-width: 1000px) {
      padding-top: 80%;

      border-bottom: 1px solid ${rgba(Colors.dark, 0.125)};
    }
  }

  .__image img {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;

    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .__body {
    flex-basis: 60%;
    padding: 1rem;

    text-align: center;

    @media (min-width: 1000px) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1.25rem;
    }
  }

  .__title {
    margin-bottom: 0.5rem;

    font-size: 1rem;
    line-height: 1.5;

    @media (min-width: 1000px) {
      font-size: 1.125rem;
    }
  }

  .__vendor-code {
    display: none;
  }

  .__size-title {
    font-size: 0.75rem;
    line-height: 1.5;

    @media (min-width: 1000px) {
      font-size: 0.875rem;
      line-height: 2;
    }
  }

  .__size-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .__size-item {
    margin: 0 0.25rem;

    font-size: 0.635rem;
    
    @media (min-width: 1000px) {
      padding: 0.25rem;
      margin: 0.125rem 0.25rem;
      
      font-size: 0.75rem;
      text-align: center;
      
      border-radius: 50%;
      background-color: ${rgba(Colors.mist, 0.25)};
    }
  }
`;


export default StyledItemCard;
