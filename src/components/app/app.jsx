import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import history from '../../history.js';
import { getItemById } from '../../reducer.js';
import { DEFAULT_ITEM_GROUP } from '../../utils/const.js';
import Header from '../header/header.jsx';
import Main from '../main/main.jsx';
import Footer from '../footer/footer.jsx';
import ItemPopup from '../item-popup/item-popup.jsx';


const _renderItemPopup = (id, itemGroup) => {
  const item = getItemById(id);
  return (
    item && <ItemPopup
      item={item}
      onPopupCloseClick={() => {
        history.push(`/${itemGroup}`);
      }}
    />
  );
};


class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      className,
      isFiltersPaneShown,
    } = this.props;

    const {
      itemGroup,
      itemId,
    } = this.props.match.params;

    (itemId || isFiltersPaneShown)
      ? document.body.classList.add(`overflow-hidden`)
      : document.body.classList.remove(`overflow-hidden`);

    console.log(this.props.match);
    console.log(itemGroup, itemId);

    if (!itemGroup) {
      history.push(`/${DEFAULT_ITEM_GROUP}`);
    }

    return (
      <div className={className}>
        <Header
          itemGroup={itemGroup}
        />
        <Main
          itemGroup={itemGroup}
        />
        <Footer/>

        {_renderItemPopup(itemId, itemGroup)}
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  isFiltersPaneShown: state.isFiltersPaneShown,
});


const StyledApp = styled(App)`
  background-image: url('./assets/img/app-bg.svg');
  background-repeat: no-repeat;
  background-size: contain;

  @media (min-width: 1000px) {
    background-size: inherit;
  }
`;


export default connect(mapStateToProps, null)(StyledApp);
