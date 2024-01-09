import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Hero } from '../../../assets/images/hero.svg';
import './_header.scss';


function Header(history: any) {
  return (
    <div className="header">
      <Hero />
      <div>
        <h1>Your favourite tunes</h1>
        <h2>All <FontAwesomeIcon icon={faSun} /> and all <FontAwesomeIcon icon={faMoon} /></h2>
      </div>
    </div>
  );
}

export default Header
