import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../utils/const.js';


const Footer = (props) => {
  const { className } = props;
  return (
    <footer className={className}>
      <div className="footer__logo">
        <div className="logo"><img src="./assets/img/footer-logo.svg" alt="Логотип IZIway"/></div>
      </div>
      <div className="footer__copy">
        <p className="copyrights">IZIway Shop &copy; 2019 — {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};


const StyledFooter = styled(Footer)`
  background-color: ${Colors.dark};
`;


export default StyledFooter;
