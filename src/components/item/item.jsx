import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from '../../utils/const.js';
import history from '../../history.js';


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
    id,
  } = item;

  const mainImageURL = picture.split(`,`)[0];
  const sizesArray = sizes.split(`, `);

  return (
    <article
      className={className}
      onClick={(e) => {
        e.preventDefault();
        history.push(`/${id}`);
        onCardClick(props.item);
      }}
    >
      <div className="item__image">
        <img
          src={mainImageURL}
          alt={name}
        />
      </div>
      <div className="item__body">
        <h3 className="item__title">{brand}<br/>{model}</h3>
        <p className="item__vendor-code">Артикул: {vendor}</p>
        <div className="item__sizes">
          <p className="item__size-title">Размеры в наличии</p>
          <ul className="item__size-list">
            {sizesArray.map((size, i) => {
              return (
                <li className="item__size-item" key={`${i}`}>
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
  background-color: ${Colors.white};

  @media (min-width: 1000px) {
    flex-direction: column;
    max-width: 220px;
    flex-basis: 220px;
    margin-right: 15px;
    background-color: ${rgba(Colors.white, 0.5)};
    /* backdrop-filter: blur(5px); */
    border: 1px solid ${rgba(Colors.mist, 0.5)};
  }

  &:hover {
    border-color: ${Colors.dark};
    cursor: pointer;
  }

  &:active {
    border-color: ${Colors.turquoise};
  }

  .item__image {
    position: relative;
    flex-basis: 40%;
    border-right: 1px solid ${rgba(Colors.dark, 0.125)};
    overflow: hidden;

    @media (min-width: 1000px) {
      padding-top: 80%;
      border-bottom: 1px solid ${rgba(Colors.dark, 0.125)};
    }
  }

  .item__image img {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .item__body {
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

  .item__title {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;

    @media (min-width: 1000px) {
      font-size: 1.125rem;
    }
  }

  .item__vendor-code {
    display: none;
  }

  .item__size-title {
    font-size: 0.75rem;
    line-height: 1.5;

    @media (min-width: 1000px) {
      font-size: 0.875rem;
      line-height: 2;
    }
  }

  .item__size-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .item__size-item {
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
