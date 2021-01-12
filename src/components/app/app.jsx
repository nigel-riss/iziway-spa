import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getItemById } from '../../reducer.js';
import { DEFAULT_ITEM_GROUP } from '../../utils/const.js';
import Header from '../header/header.jsx';
import Main from '../main/main.jsx';
import Footer from '../footer/footer.jsx';
import ItemPopup from '../item-popup/item-popup.jsx';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import history from '../../history.js';


const _renderItemPopup = (item, itemGroup) => {
  return (
    item && <ItemPopup
      item={item}
      onPopupCloseClick={() => {
        history.push(`/${itemGroup}`);
      }}
    />
  );
};


const App = (props) => {
  const {
    className,
    getCurrentItem,
    isFiltersPaneShown,
  } = props;

  isFiltersPaneShown
    ? document.body.classList.add(`overflow-hidden`)
    : document.body.classList.remove(`overflow-hidden`);

  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path={`/`}
          render={() => {
            history.push(`/${DEFAULT_ITEM_GROUP}`);
          }}
        />

        <Route
          exact
          path={`/:itemGroup`}
          render={({ match }) => {
            const { itemGroup } = match.params;
            return (
              <div className={className}>
                <Header
                  itemGroup={itemGroup}
                />
                <Main
                  itemGroup={itemGroup}
                />
                <Footer/>
              </div>
            );
          }}
        />

        <Route
          exact
          path={`/:itemGroup/:itemId`}
          render={({ match }) => {
            document.body.classList.add(`overflow-hidden`);

            const {
              itemGroup,
              itemId,
            } = match.params;
            const currentItem = getCurrentItem(itemId);

            return (
              <div className={className}>
                <Header
                  itemGroup={itemGroup}
                />
                <Main
                  itemGroup={itemGroup}
                />
                <Footer/>

                {_renderItemPopup(currentItem, itemGroup)}
              </div>
            );
          }}
        />
      </Switch>
    </Router>
  );
};


const mapStateToProps = (state) => ({
  getCurrentItem: getItemById(state),
  isFiltersPaneShown: state.isFiltersPaneShown,
});


const StyledApp = styled(App)`
  background-image: url('/assets/img/app-bg.svg');
  background-repeat: no-repeat;
  background-size: contain;

  @media (min-width: 1000px) {
    background-size: inherit;
  }
`;


export default connect(mapStateToProps, null)(StyledApp);
