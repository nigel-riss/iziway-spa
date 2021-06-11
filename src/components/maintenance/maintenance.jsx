import React from 'react';
import styled from 'styled-components';


const Maintenance = (props) => {
  const { className } = props;

  return (
    <div className={className}>
      <img src="/assets/img/logo.svg" alt="Логотип IZIway"/>
      <h1>Каталог находится на&nbsp;техническом обслуживании и&nbsp;будет доступен через несколько дней</h1>
    </div>
  );
};


const StyledMaintenance = styled(Maintenance)`
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 15%;
  padding: 2rem;
  text-align: center;

  img {
    display: block;
    margin: 0 auto;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 1rem;
  }
`;


export default StyledMaintenance;
