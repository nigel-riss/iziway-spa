import React from 'react';
import Search from '../search/search.jsx';
import styled from 'styled-components';
import { Colors } from '../../utils/const.js';


class Header extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {className} = this.props;

    return (
      <header className={className}>
        <div className="__top">
          <div className="__logo">
            <div className="logo">
              <img src="./assets/img/logo.svg" alt="Логотип IZIway"/>
            </div>
          </div>
          <div className="__search">
            <Search/>
          </div>
        </div>
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
    border-bottom: 1px solid ${Colors.mist};
  }

  .__top {
    @media (min-width: 1000px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
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

  .__search {
    position: relative;
    height: 2rem;

    @media (min-width: 1000px) {
      flex-basis: 500px;
    }
  }

  .logo img {
    width: 100%;
  }
`;


export default StyledHeader;
