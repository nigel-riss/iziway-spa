import React, {Component} from 'react';
import Buttons from '../buttons/buttons.jsx';
import Filters from '../filters/filters.jsx';
import Catalog from '../catalog/catalog.jsx';


class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      items,
    } = this.props;

    return (
      <main className="main">
        {/* <div className="main__title">
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
};


export default Main;
