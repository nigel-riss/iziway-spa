import React from 'react';
import Search from '../search/search.jsx';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from '../../utils/const.js';


class Header extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { className } = this.props;

    return (
      <header className={className}>
        <div className="header__top">
          <div className="header__logo">
            <img src="./assets/img/logo.svg" alt="Логотип IZIway"/>
          </div>
          <div className="header__search">
            <Search/>
          </div>
        </div>
        <nav className="header__nav">
          <a href="https://iziway.ru/" className="header__franchise-link">Франшиза IZIway Shop</a>
          <ul className="header__nav-list">
            <li className="header__nav-item"><a href="#">Кроссовки</a></li>
            <li className="header__nav-item"><a href="#">Одежда</a></li>
            <li className="header__nav-item"><a href="#">Аксессуары</a></li>
          </ul>
        </nav>
      </header>
    );
  }
}


const StyledHeader = styled(Header)`
  padding: 2rem 1rem;

  @media (min-width: 1000px) {
    margin: 0 auto;
    padding: 3rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${rgba(Colors.mist, 0.25)};
  }
  
  @media (min-width: 1300px) {
    max-width: inherit;
    padding: 3rem calc((100% - 1260px + 2rem) / 2);
    padding-bottom: 1rem;

    background-color: ${rgba(Colors.white, 0.5)};
  }

  .header__top {
    @media (min-width: 1000px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
    }
  }

  .header__logo {
    margin: 0 auto;
    margin-bottom: 1.5rem;
    width: 6rem;

    @media (min-width: 1000px) {
      width: 8rem;
      margin: 0;
    }
  }

  .header__logo img {
    width: 100%;
  }

  .header__search {
    position: relative;
    height: 2rem;
    margin-bottom: 2rem;

    @media (min-width: 1000px) {
      flex-basis: 500px;
      margin-bottom: 0;
    }
  }

  .header__nav {}

  .header__nav-list {
    @media (min-width: 1000px) {
      display: flex;
      justify-content: center;
    }
  }

  .header__nav-item {
    margin: 1rem 0;
    font-size: 1.125rem;
    font-weight: 300;
    text-align: center;

    @media (min-width: 1000px) {
      margin: 1rem 2rem;
      font-size: 1.375rem;
    }
  }

  .header__nav-item a {
    color: ${Colors.dark};
    text-decoration: none;

    &:hover {
      color: ${Colors.turquoise};
    }
  }
`;


export default StyledHeader;
