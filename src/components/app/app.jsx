import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getItemById } from '../../reducer.js';
import Header from '../header/header.jsx';
import Main from '../main/main.jsx';
import Footer from '../footer/footer.jsx';
import ItemPopup from '../item-popup/item-popup.jsx';
import history from '../../history.js';


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
      items,
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
      history.push(`/footwear`);
      // return;
    }

    return (
      <div className={className}>
        <Header
          itemGroup={itemGroup}
        />
        <Main
          itemGroup={itemGroup}
          items={items}
        />
        <Footer/>

        {_renderItemPopup(itemId, itemGroup)}
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  items: state.items,
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
