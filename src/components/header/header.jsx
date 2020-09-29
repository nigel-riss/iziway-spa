import React from 'react';
import Search from '../search/search.jsx';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from '../../utils/const.js';
import GroupNav from '../group-nav/group-nav.jsx';


class Header extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      className,
    } = this.props;

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
          <div className="header__franchise">
            <a href="https://iziway.ru/" className="header__franchise-link">
              Франшиза IZIway Shop
            </a>
          </div>
          <GroupNav/>
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
      align-items: flex-end;
      margin-bottom: 2rem;
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

  .header__nav {
    @media (min-width: 1000px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .header__franchise {
    display: block;
    text-align: center;
  }

  .header__franchise-link {
    position: relative;
    color: ${Colors.turquoise};
    font-size: 1.125rem;
    font-weight: 400;
    text-decoration: none;
    
    &:hover {
      color: ${Colors.red};
    }

    
    @media (min-width: 1000px) {
      color: ${Colors.dark};
      font-size: 1.25rem;

      &::after {
        content: '';
        position: absolute;
        right: -2rem;
        top: 0.125rem;
        transform: rotate(90deg);
        height: 1.5rem;
        width: 1.5rem;
        background-image: url('./assets/img/back.svg');
        background-repeat: no-repeat;
        background-position: center;
        /* border-radius: 50%; */
      }

      &::before {
        content: '';
        position: absolute;
        top: -1.25rem;
        height: 1px;
        width: 8rem;
        background-color: ${Colors.turquoise};
      }

      &:hover {
        color: ${Colors.turquoise};
      }

      &:hover::after {
        background-image: url('./assets/img/back--turquoise.svg');
      }
    }
  }
`;


export default StyledHeader;
