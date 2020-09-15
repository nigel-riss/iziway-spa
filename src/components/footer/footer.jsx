import React from 'react';


const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <div className="logo"><img src="./assets/img/footer-logo.svg" alt="Логотип IZIway"/></div>
      </div>
      <div className="footer__copy">
        <p className="copyrights">IZIway Shop &copy; 2019 — {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};


export default Footer;
