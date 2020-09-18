import React from 'react';
import Search from '../search/search.jsx';
import styled from 'styled-components';


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

  .__top {

  }

  .__logo {
    margin: 0 auto;
    margin-bottom: 1.5rem;
    width: 6rem;
  }

  .__search {
    position: relative;
    height: 2rem;
  }

  .logo img {
    width: 100%;
  }
`;


export default StyledHeader;
