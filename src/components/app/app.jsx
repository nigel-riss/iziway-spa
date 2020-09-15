import React from 'react';
import styled from 'styled-components';
import Header from '../header/header.jsx';
import Main from '../main/main.jsx';
import Footer from '../footer/footer.jsx';


class App extends React.Component {
  // constructor (props) {
  //   super(props);
  // }

  render () {
    const { className } = this.props;
    return (
      <div className={className}>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    );
  }
}


const StyledApp = styled(App)`
  background-image: url('./assets/img/app-bg.svg');
`;


export default StyledApp;
