import React from 'react';
import styled from 'styled-components';
import {Colors} from '../../utils/const.js';


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
      <div className="__image">
        <img
          src={image}
          alt={title}
        />
      </div>
      <h3 className="__title">{title}</h3>
    </article>
  )
};


const StyledSearchResult = styled(SearchResult)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1rem;
  padding-right: 2rem;

  cursor: pointer;

  &:hover {
    background-color: ${Colors.turquoise};
  }

  .__image {
    height: 3rem;
    width: 4rem;
    min-width: 4rem;
    flex-basis: 4rem;
  }

  .__image img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .__title {
    flex-basis: calc(100% - 4rem);
    padding-left: 1rem;

    font-size: 1rem;
    white-space: nowrap;
  }
`;


export default StyledSearchResult;
