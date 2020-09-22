import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../utils/const.js';


const SearchResult = (props) => {
  const {
    className,
    image,
    title,
    onSearchResultClick,
  } = props;

  return (
    <article
      className={className}
      onClick={onSearchResultClick}
    >
      <div className="search-result__image">
        <img
          src={image}
          alt={title}
        />
      </div>
      <h3 className="search-result__title">{title}</h3>
    </article>
  );
};


const StyledSearchResult = styled(SearchResult)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1rem;
  padding-right: 2rem;
  cursor: pointer;

  &:hover {
    color: ${Colors.white};
    background-color: ${Colors.turquoise};
  }

  .search-result__image {
    height: 3rem;
    width: 4rem;
    min-width: 4rem;
    flex-basis: 4rem;
  }

  .search-result__image img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .search-result__title {
    flex-basis: calc(100% - 4rem);
    padding-left: 1rem;
    font-size: 1rem;
    white-space: nowrap;
  }
`;


export default StyledSearchResult;
