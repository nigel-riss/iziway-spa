import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import Header from '../header/header.jsx';
import Main from '../main/main.jsx';
import Footer from '../footer/footer.jsx';
import ItemPopup from '../item-popup/item-popup.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      items,
      activeItem,
      isFiltersPaneShown,
      onPopupCloseClick,
    } = this.props;

    (activeItem || isFiltersPaneShown)
      ? document.body.classList.add(`overflow-hidden`)
      : document.body.classList.remove(`overflow-hidden`);

    return (
      <React.Fragment>
        <Header/>
        <Main
          items={items}
        />
        <Footer/>

      {activeItem && <ItemPopup
        item={activeItem}
        onPopupCloseClick={onPopupCloseClick}
      />}
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => ({
  items: state.items,
  activeItem: state.activeItem,
  isFiltersPaneShown: state.isFiltersPaneShown,
});

const mapDispatchToProps = (dispatch) => ({
  onPopupCloseClick() {
    dispatch(ActionCreator.clearActiveItem());
  },
});


const StyledApp = styled(App)`
  background-image: url('./assets/img/app-bg.svg');
`;


export default connect(mapStateToProps, mapDispatchToProps)(StyledApp);
