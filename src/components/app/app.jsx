import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import {
  ActionCreator,
  getItemById,
} from '../../reducer.js';
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
    currentItemGroup,
    getCurrentItem,
    isFiltersPaneShown,
    updateItemGroup,
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
            document.body.classList.remove(`overflow-hidden`);
            history.push(`/${DEFAULT_ITEM_GROUP}`);
          }}
        />

        <Route
          exact
          path={`/:itemGroup`}
          render={({ match }) => {
            const { itemGroup } = match.params;

            document.body.classList.remove(`overflow-hidden`);

            if (currentItemGroup !== itemGroup) {
              updateItemGroup(itemGroup);
              return null;
            } else {
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
            }
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

            if (currentItemGroup !== itemGroup) {
              updateItemGroup(itemGroup);
              return null;
            } else {
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
            }
          }}
        />
      </Switch>
    </Router>
  );
};


const mapStateToProps = (state) => ({
  currentItemGroup: state.currentItemGroup,
  getCurrentItem: getItemById(state),
  isFiltersPaneShown: state.isFiltersPaneShown,
});

const mapDispatchToProps = (dispatch) => ({
  updateItemGroup (itemGroup) {
    dispatch(ActionCreator.setItemGroup(itemGroup));
    dispatch(ActionCreator.applyFilters(itemGroup));
  },
});

const StyledApp = styled(App)`
  background-image: url('/assets/img/app-bg.svg');
  background-repeat: no-repeat;
  background-size: contain;

  @media (min-width: 1000px) {
    background-size: inherit;
  }
`;


export default connect(mapStateToProps, mapDispatchToProps)(StyledApp);
