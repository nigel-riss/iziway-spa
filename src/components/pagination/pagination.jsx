import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from '../../utils/const.js';


const PAGE_PADDING = 2;


const _getPagesLinks = (currentPage, pagesCount, onPageLinkClick) => {
  const pagesLinks = [];

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > -1 && i < pagesCount) {
      pagesLinks.push(
        <a
          key={i}
          className={`pagination__link ${i === currentPage && `pagination__link--current`}`}
          href="#"
          onClick={() => {
            onPageLinkClick(i);
          }}
        >
          {i + 1}
        </a>
      );
    }
  }

  return pagesLinks;
};


class Pagination extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      currentPage,
      className,
      pagesCount,
      onPageLinkClick,
    } = this.props;

    return (
      <div className={className}>
        {(currentPage > 0) &&
        <a
          className="pagination__prev"
          href="#"
          onClick={() => {
            onPageLinkClick(currentPage - 1);
          }}
        >
          Предыдущая страница
        </a>}

        <div className="pagination__pages">
          {(currentPage > PAGE_PADDING) &&
          <span className="pagination__more">
            &hellip;
          </span>}

          {
            _getPagesLinks(currentPage, pagesCount, onPageLinkClick)
          }

          {(currentPage < pagesCount - PAGE_PADDING - 1) &&
          <span className="pagination__more">
            &hellip;
          </span>}
        </div>

        {(currentPage < pagesCount - 1) &&
        <a
          className="pagination__next"
          href="#"
          onClick={() => {
            onPageLinkClick(currentPage + 1);
          }}
        >
          Следующая страница
        </a>}
      </div>
    );
  }
}


const StyledPagination = styled(Pagination)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .pagination__next,
  .pagination__prev,
  .pagination__link,
  .pagination__more {
    display: inline-block;
    vertical-align: bottom;
    margin: 0.5rem 0.25rem;
    padding: 0.25rem 0.75rem;
    color: ${Colors.dark};
    text-align: center;
    text-decoration: none;
    border: 1px solid ${rgba(Colors.mist, 0.5)};
    border-radius: 1rem;
    transition: all 0.25s ease-out;

    &:hover {
      background-color: ${rgba(Colors.mist, 0.5)};
    }
  }

  .pagination__link--current {
    color: ${Colors.white};
    background-color: ${Colors.turquoise};
  }

  .pagination__more {
    border: none;
  }

  .pagination__more:hover {
    color: inherit;
    background-color: inherit;
  }

  .pagination__pages {
    display: none;

    @media (min-width: 1000px) {
      display: block;
    }
  }
`;


export default StyledPagination;
