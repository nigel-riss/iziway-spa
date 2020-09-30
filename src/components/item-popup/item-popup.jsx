import React, { Component } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from '../../utils/const.js';
import ImageCarousel from '../image-carousel/image-carousel.jsx';
import ItemSpecs from '../item-specs/item-specs.jsx';


const ESC_KEY_CODE = 27;


class ItemPopup extends Component {
  constructor (props) {
    super(props);

    this._handleCopyClick = this._handleCopyClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  render () {
    const {
      className,
      item,
      onPopupCloseClick,
    } = this.props;

    const {
      brand,
      model,
      picture,
      description,
    } = item;

    const descriptionBlocks = description.split(`\n\n\n`);
    const descriptionLines = descriptionBlocks.length > 0 ? descriptionBlocks[0].split(`\n`) : [];
    const featuresLines = descriptionBlocks.length > 1 ? descriptionBlocks.slice(1) : [];

    return (
      <section className={className}>
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
                <ItemSpecs
                  item={item}
                />
                <button
                  className="item-popup__copy"
                  onClick={() => {
                    this._handleCopyClick();
                  }}
                >
                  Скопировать ссылку
                </button>
              </div>
            </div>
            <div className="item-popup__description">
              {descriptionLines.map((line, i) => {
                return (
                  <p key={i}>{line}</p>
                );
              })}
              <ul>
                {featuresLines.map((feature, i) => {
                  return feature !== `` ? <li key={i}>{feature}</li> : null;
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  _handleCopyClick () {
    const textarea = document.createElement(`textarea`);
    textarea.value = window.location.href;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand(`copy`);
    document.body.removeChild(textarea);
  }

  _handleEscKeyDown (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      this.props.onPopupCloseClick();
    }
  }

  componentDidMount () {
    document.addEventListener(`keydown`, this._handleEscKeyDown, false);
  }

  componentWillUnmount () {
    document.removeEventListener(`keydown`, this._handleEscKeyDown, false);
  }
}


const StyledItemPopup = styled(ItemPopup)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  padding: 2rem 1rem;
  background-color: ${rgba(Colors.dark, 0.25)};
  backdrop-filter: blur(10px);
  overflow-y: scroll;

  @media (min-width: 1000px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item-popup__background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .item-popup__close {
    position: absolute;
    top: -1.5rem;
    right: -0.5rem;
    height: 3rem;
    width: 3rem;
    font-size: 0;
    border: none;
    border-radius: 50%;
    background-color: ${rgba(Colors.mist, 1)};
    transition: all 0.25s ease-in-out;

    @media (min-width: 1000px) {
      right: 1rem;
      top: 1rem;
      height: 4rem;
      width: 4rem;
    }

    &:hover {
      transform: rotate(180deg);
      cursor: pointer;
      background-color: ${Colors.turquoise};

      &::before, &::after {
        background-color: ${Colors.white};
      }
    }

    &:active {
      background-color: ${Colors.mist};

      &::before, &::after {
        background-color: ${Colors.white};
      }
    }

    &:focus {
      outline: none;
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -0.5px) rotate(45deg);
      transform-origin: center;
      height: 1px;
      width: 1.5rem;
      background-color: ${Colors.dark};

      @media (min-width: 1000px) {
        width: 2rem;
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -0.5px) rotate(135deg);
      transform-origin: center;
      height: 1px;
      width: 1.5rem;
      background-color: ${Colors.dark};

      @media (min-width: 1000px) {
        width: 2rem;
      }
    }
  }

  .item-popup__wrapper {
    position: relative;
    padding: 2rem 1rem;
    background-color: ${Colors.white};
    box-shadow: 0 0 2rem ${rgba(Colors.dark, 0.25)};

    @media (min-width: 1000px) {
      max-width: 1060px;
      margin: auto;
      padding: 40px 100px;
      padding-bottom: 60px;
    }
  }

  .item-popup__header {
    @media (min-width: 1000px) {
      margin-bottom: 2rem;
    }
  }

  .item-popup__title {
    margin-bottom: 1rem;
    font-size: 1.25rem;

    @media (min-width: 1000px) {
      font-size: 3.5rem;
    }
  }

  .item-popup__caro-n-specs {
    margin-bottom: 2rem;

    @media (min-width: 1000px) {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3rem;
    }
  }

  .item-popup__specs {
    @media (min-width: 1000px) {
      flex-basis: calc(50% - 2rem);
      padding-left: 40px;
    }
  }

  .item-popup__images {
    margin-bottom: 2rem;

    @media (min-width: 1000px) {
      flex-basis: calc(50% - 2rem);
      margin-bottom: 0;
    }
  }

  .item-popup__main-specs {
    @media (min-width: 1000px) {
      margin-bottom: 4rem;
    }
  }

  .item-popup__description {
    p {
      margin-bottom: 1rem;
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    li {
      font-weight: 700;

      &::before {
        content: '— ';
      }
    }
  }

  .item-popup__copy {
    margin-left: -0.5rem;
    padding: 0.375rem 1rem;

    border: none;
    border-radius: 0.25rem;

    background-color: ${rgba(Colors.mist, 0.5)};
    cursor: pointer;

    &:hover {
      background-color: ${Colors.turquoise};
    }

    &:active {
      opacity: 0.5;
      outline: none;
    }

    &::before {
      content: '';

      display: inline-block;
      vertical-align: middle;
      margin-right: 0.25rem;
      height: 1.5rem;
      width: 1.5rem;

      background-image: url('/assets/img/copy.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;


export default StyledItemPopup;
