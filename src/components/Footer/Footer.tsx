import { FC } from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

/**
 * Компонент для отображения footer
 */
export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Link className="footer__logo" to="/">
        <img
          src="/img/logo-full.svg"
          alt="The Movie Database (TMDB)"
          width="130"
          height="94"
        />
      </Link>
      <nav className="footer__info">
        <a className="footer__a">Data from</a>
        <a
          className="footer__a"
          href="https://developers.themoviedb.org/3/getting-started/introduction"
        >
          TMDB API
        </a>
      </nav>
    </footer>
  );
};
