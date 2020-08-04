import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import backIcon from '../../assets/icons/back.svg';
import './styles.css';

const TeacherList: React.FC = () => {
  return (
  <div id="page-teacher-list" className="container">
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <img src={logoImg} alt="Logo Proffy"/>
      </div>

      <div className="header-content">
        <strong>Estes são os proffys disponiveis.</strong>
      </div>
    </header>
  </div>
  )
}

export default TeacherList;