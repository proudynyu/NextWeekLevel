import React from 'react';

import './styles.css'

import logoImg from '../../assets/logo.svg';
import landingImg from '../../assets/landing.svg';
import studyIcon from '../../assets/icons/study.svg';
import giveClassesIcon from '../../assets/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/icons/purple-heart.svg';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">

        <div className="logo-container">
          <img src={logoImg} alt="Logo Proffy"/>
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img 
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <a href="#" className="study">
            <img src={studyIcon} alt="Estudar"/>
            Estudar
          </a>
          <a href="#" className="give-classe">
            <img src={giveClassesIcon} alt="Dar aula"/>
            Dar aula
          </a>
        </div>

        <span className="total-connection">
          Total de 200 conexões já realizadas
          <img src={purpleHeartIcon} alt="Corção Roxo"/>
        </span>
      </div>
    </div>
  )
}

export default Landing;