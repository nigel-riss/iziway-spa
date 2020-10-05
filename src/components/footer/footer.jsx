import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../utils/const.js';


const Footer = (props) => {
  const { className } = props;
  return (
    <footer className={className}>
      <div className="footer__logo">
        <img src="/assets/img/footer-logo.svg" alt="Логотип IZIway"/>
      </div>
      <p className="footer__copy">
          IZIway Shop &copy; 2019 — {new Date().getFullYear()}&nbsp;&nbsp;<small>🤍</small>
      </p>
    </footer>
  );
};


const StyledFooter = styled(Footer)`
  padding: 2.5rem;
  padding-top: 3rem;
  text-align: center;
  background-color: ${Colors.dark};

  .footer__logo {
    margin: 0 auto;
    margin-bottom: 1.5rem;
    width: 9rem;
  }

  .footer__copy {
    vertical-align: top;
    color: ${Colors.mist};
    font-size: 1rem;
  }
`;


export default StyledFooter;
