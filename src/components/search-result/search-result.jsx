import React from 'react';


const SearchResult = (props) => {
  const {
    image,
    title,
    onSearchResultClick,
  } = props;

  return (
    <article
      className="search-result"
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
  )
}


export default SearchResult;
