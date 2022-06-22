import { FC, ChangeEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

interface IProps {
  onChangeValue?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

/**
 *Компонент для отображения Header
 */
export const Header: FC<IProps> = ({ onChangeValue, value }: IProps) => {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <div className="header-content">
        <nav className="content-navigation">
          <Link className="content-navigation__logo" to="/">
            <img
              src="/img/logo.svg"
              alt="The Movie Database (TMDB)"
              width="154"
              height="20"
            />
          </Link>
          <ul className="content-navigation__menu">
            <li>
              <Link className="menu__item" to="/movie">
                Фильмы
              </Link>
            </li>
            <li>
              <Link className="menu__item" to="/tv">
                Сериалы
              </Link>
            </li>
          </ul>
        </nav>
        {pathname !== "/" ? (
          <div className="content-search">
            <div className="content-search__from">
              <input
                className="search__input"
                type="text"
                autoComplete="off"
                placeholder="Найти по данному разделу..."
                value={value}
                onChange={onChangeValue}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};
