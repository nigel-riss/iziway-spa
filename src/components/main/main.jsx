import React from 'react';


class Main extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <main className="main">
        <div className="main__body">
          <div className="main__buttons">
            {/* <Buttons/> */}
          </div>
          <div className="main__filters">
            {/* <Filters/> */}
          </div>
          <div className="main__catalog">
            {/* <Catalog
              items={items}
            /> */}
          </div>
        </div>
      </main>
    );
  }
}


export default Main;
