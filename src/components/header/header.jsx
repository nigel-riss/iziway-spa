import React from 'react';
import Search from '../search/search.jsx';


class Header extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <header className="header">
        <div className="header__top">
          <div className="header__logo">
            <div className="logo"><img src="./assets/img/logo.svg" alt="Логотип IZIway"/></div>
          </div>
          <div className="header__search">
            <Search/>
          </div>
        </div>
      </header>
    );
  }
}


export default Header;
