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
      items,
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
            <Filters/>
          </div>
          <div className="main__catalog">
            <Catalog
              items={items}
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
    padding: 40px 20px;
    padding-bottom: 80px;
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
      flex-basis: 280px;
    }
  }

  .main__catalog {
    @media (min-width: 1000px) {
      flex-basis: 940px;
    }
  }
`;


export default StyledMain;
