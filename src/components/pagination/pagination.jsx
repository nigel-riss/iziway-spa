import React, {PureComponent} from 'react';


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
}


class Pagination extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      currentPage,
      pagesCount,
      onPageLinkClick,
    } = this.props;
  
    return (
      <div className="pagination">
        {(currentPage > 0) &&
        <a
          className="pagination__prev"
          href="#"
          onClick={() => {
            onPageLinkClick(currentPage - 1)
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
            onPageLinkClick(currentPage + 1)
          }}
        >
          Следующая страница
        </a>}
      </div>
    );
  }
};


export default Pagination;
