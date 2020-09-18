import React from 'react';


const ItemCard = (props) => {
  const {
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
      className="item"
      onClick={() => {
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


export default ItemCard;
