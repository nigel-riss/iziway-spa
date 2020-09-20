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
        <div className="__top">
          <div className="__logo">
            <img src="./assets/img/logo.svg" alt="Логотип IZIway"/>
          </div>
          <div className="__search">
            <Search/>
          </div>
        </div>
        <nav className="__nav">
          <ul className="__nav-list">
            <li className="__nav-item"><a href="#">Кроссовки</a></li>
            <li className="__nav-item"><a href="#">Одежда</a></li>
            <li className="__nav-item"><a href="#">Аксессуары</a></li>
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
    max-width: 1260px;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${rgba(Colors.mist, 0.25)};
  }
  
  @media (min-width: 1300px) {
    max-width: inherit;
    padding: 4rem calc((100% - 1260px) / 2);
    padding-bottom: 1rem;

    background-color: ${rgba(Colors.white, 0.5)};
    /* backdrop-filter: blur(5px); */
  }

  .__top {
    @media (min-width: 1000px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
    }
  }

  .__logo {
    margin: 0 auto;
    margin-bottom: 1.5rem;
    width: 6rem;

    @media (min-width: 1000px) {
      width: 160px;
      margin: 0;
    }
  }

  .__logo img {
    width: 100%;
  }

  .__search {
    position: relative;
    height: 2rem;
    margin-bottom: 2rem;

    @media (min-width: 1000px) {
      flex-basis: 500px;
    }
  }

  .__nav {}

  .__nav-list {
    @media (min-width: 1000px) {
      display: flex;
      justify-content: center;
    }
  }

  .__nav-item {
    margin: 1rem 0;

    font-size: 1.125rem;
    font-weight: 300;
    text-align: center;

    @media (min-width: 1000px) {
      margin: 1rem 2rem;
      font-size: 1.375rem;
    }
  }

  .__nav-item a {
    color: ${Colors.dark};
    text-decoration: none;

    &:hover {
      color: ${Colors.turquoise};
    }
  }
`;


export default StyledHeader;
