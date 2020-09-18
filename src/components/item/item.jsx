import React from 'react';
import styled from 'styled-components';


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
`;


export default ItemCard;
