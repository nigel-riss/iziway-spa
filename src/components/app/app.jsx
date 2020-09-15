import React from 'react';
import Header from '../header/header.jsx';
import Main from '../main/main.jsx';
import Footer from '../footer/footer.jsx';


class App extends React.Component {
  // constructor (props) {
  //   super(props);
  // }

  render () {
    return (
      <React.Fragment>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}


export default App;
