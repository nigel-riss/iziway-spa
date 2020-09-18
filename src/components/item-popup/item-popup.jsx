import React, {Component} from 'react';
import {getAllSizes} from '../../utils/data.js';
import ImageCarousel from '../image-carousel/image-carousel.jsx';


const ESC_KEY_CODE = 27;


class ItemPopup extends Component {
  constructor(props) {
    super(props);

    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  render() {
    const {
      item,
      onPopupCloseClick,
    } = this.props;
  
    const {
      brand,
      model,
      vendor,
      color,
      season,
      category,
      picture,
      description,
    } = item;

    const descriptionBlocks = description.split(`\n\n\n`);
    const descriptionLines = descriptionBlocks.length > 0 ? descriptionBlocks[0].split(`\n`) : [];
    const featuresLines = descriptionBlocks.length > 1 ? descriptionBlocks.slice(1) : [];

    return (
      <section className="item-popup">
        <div className="item-popup__background"
          onClick={onPopupCloseClick}
        ></div>
        <div className="item-popup__wrapper">
          <button
            className="item-popup__close"
            onClick={onPopupCloseClick}
          >x</button>
          <header className="item-popup__header">
            <h2 className="item-popup__title">{brand} {model}</h2>
          </header>
          <div className="item-popup__body">
            <div className="item-popup__caro-n-specs">
              <div className="item-popup__images">
                <ImageCarousel
                  images={picture.split(`,`)}
                />
              </div>
              <div className="item-popup__specs">
                <div className="vendor-code">
                  <h3 className="vendor-code__title">Артикул:</h3><span className="vendor-code__code">{vendor}</span>
                </div>
                <div className="item-popup__main-specs">
                  <div className="spec">
                    <h3 className="spec__title">Цвет:</h3><span className="spec__value">{color}</span>
                  </div>
                  <div className="spec">
                    <h3 className="spec__title">Сезон:</h3><span className="spec__value">{season}</span>
                  </div>
                  <div className="spec">
                    <h3 className="spec__title">Категория:</h3><span className="spec__value">{category}</span>
                  </div>
                  <div className="spec">
                    <h3 className="spec__title">Модель:</h3><span className="spec__value">{model}</span>
                  </div>
                </div>
                <div className="item-popup__sizes">
                  <div className="spec">
                    <h3 className="spec__title spec__title--block">Размеры в наличии</h3>
                    {getAllSizes([item]).map((size, i) => {
                      return (
                        <span className="spec__value" key={i}>{size}</span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="item-popup__description">
              {descriptionLines.map((line, i) => {
                return (
                  <p key={i}>{line}</p>
                )
              })}
              <ul>
                {featuresLines.map((feature, i) => {
                  return feature != `` ? <li key={i}>{feature}</li> : null;
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  _handleEscKeyDown(evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      this.props.onPopupCloseClick();
    }
  }

  componentDidMount() {
    document.addEventListener(`keydown`, this._handleEscKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener(`keydown`, this._handleEscKeyDown, false);
  }
};


export default ItemPopup;
