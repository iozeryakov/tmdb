import { FC } from 'react';

import './Footer.css';

/**
 * Компонент для отображения footer
 */
export const Footer: FC = () => {
  return (
    <footer className="footer">
    <a className="footer__logo" href="/">
        <img 
            src="/img/logo-full.svg" 
            alt="The Movie Database (TMDB)" 
            width="130" 
            height="94"/>
    </a>
    <nav className="footer__info">
        <a className="footer__a">Data from</a>
        <a 
            className="footer__a" 
            href="https://developers.themoviedb.org/3/getting-started/introduction" >
            TMDB API
        </a>
    </nav>
  </footer>
  );
};