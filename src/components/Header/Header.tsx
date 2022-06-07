import { FC,ChangeEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

interface IProps {
  onChangeValue?:(event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 *Компонент для отображения Header
 */
export const Header: FC<IProps> = ({onChangeValue}:IProps) => {
  const { pathname } = useLocation();
  return (
    <header className="header">
        <div className="header-content">
          <nav className="content-navigation">
            <a 
                className="content-navigation__logo" 
                href="/">
                <img src="/img/logo.svg" alt="The Movie Database (TMDB)" width="154" height="20"/>
            </a>
            <ul className="content-navigation__menu">
              <li>
                <Link
                  className="menu__item"
                  to="/movie">
                  Фильмы
                </Link>
              </li>
              <li>
                <Link
                  className="menu__item"
                  to="/tv">
                  Сериалы
                </Link>
              </li>
            </ul>
          </nav>
          {pathname!='/'?(
          <div className="content-search">
            <div className="content-search__from">
                <input className="search__input" type="text" autoComplete="off" placeholder="Найти по данному разделу..." onChange={onChangeValue}/>
            </div>
          </div>):(<></>)}
        </div>
      </header>
  );
};