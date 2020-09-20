import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ActionCreator } from '../../reducer.js';
import ItemCard from '../item/item.jsx';
import Pagination from '../pagination/pagination.jsx';


const ITEMS_PER_PAGE = 16;


class Catalog extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      className,
      currentPage,
      filteredItems,
      onCardClick,
      onPageLinkClick,
    } = this.props;

    const itemsToShow = filteredItems
      .slice(currentPage * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

    return (
      <div className={className}>
        <div className="catalog__items">
          {itemsToShow.map((item, i) => {
            return (
              <ItemCard
                key={`${i}`}
                item={item}
                onCardClick={onCardClick}
              />
            );
          })}
        </div>
        <div className="catalog__pagination">
          <Pagination
            currentPage={currentPage}
            pagesCount={Math.ceil(filteredItems.length / ITEMS_PER_PAGE)}
            onPageLinkClick={onPageLinkClick}
          />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  filteredItems: state.filteredItems,
  currentPage: state.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick (item) {
    dispatch(ActionCreator.setActiveItem(item));
  },

  onPageLinkClick (pageNumber) {
    dispatch(ActionCreator.setCurrentPage(pageNumber));
  },
});


const StyledCatalog = styled(Catalog)`
  .catalog__items {
    @media (min-width: 1000px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin-bottom: 20px;
    }
  }
`;


export default connect(mapStateToProps, mapDispatchToProps)(StyledCatalog);
