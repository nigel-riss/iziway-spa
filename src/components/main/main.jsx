import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Buttons from '../buttons/buttons.jsx';
import Filters from '../filters/filters.jsx';
import Catalog from '../catalog/catalog.jsx';


class Main extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      className,
      itemGroup,
    } = this.props;

    return (
      <main className={className}>
        {/* <div className="__title">
          <h1 className="category-title">Мужские кроссовки</h1>
        </div> */}
        <div className="main__body">
          <div className="main__buttons">
            <Buttons/>
          </div>
          <div className="main__filters">
            <Filters
              itemGroup={itemGroup}
            />
          </div>
          <div className="main__catalog">
            <Catalog
              itemGroup={itemGroup}
            />
          </div>
        </div>
      </main>
    );
  }
}


const StyledMain = styled(Main)`
  padding: 2rem 1rem;
  padding-top: 1rem;

  @media (min-width: 1000px) {
    max-width: 1260px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    padding-bottom: 80px;
  }

  @media (min-width: 1300px) {
    max-width: inherit;
    padding: 3rem calc((100% - 1260px) / 2);
  }

  .main__title {}

  .main__buttons {
    margin-bottom: 1rem;

    @media (min-width: 1000px) {
      display: none;
    }
  }

  .main__body {
    @media (min-width: 1000px) {
      display: flex;
      justify-content: space-between;
    }
  }

  .main__filters {
    @media (min-width: 1000px) {
      padding-right: 20px;
      flex-basis: 300px;
    }
  }

  .main__catalog {
    @media (min-width: 1000px) {
      flex-basis: 980px;
    }
  }
`;


export default StyledMain;
