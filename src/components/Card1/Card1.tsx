import { FC } from "react";
import { Link } from "react-router-dom";
import { ICard } from "../../types/ICard";
import { IMG_URL } from "../../urls/urls";
import "./Card1.css";

/**
 * Компонент для отображения карточки с фильмом для главной страницы
 */
export const Card1: FC<ICard> = ({ id, title, poster_path, release_date }) => {
  return (
    <div className="card1">
      <div className="card1__img">
        <Link to="/info">
          <img
            className="card1__img_img"
            alt={title}
            src={poster_path ? IMG_URL + poster_path : "/img/1.jpg"}
          />
        </Link>
      </div>
      <div className="card1__title">
        <Link className="card1__title_a" to="/info" title={title}>
          {title}
        </Link>
        <p className="card1__title_p">{release_date}</p>
      </div>
    </div>
  );
};
