import { FC } from "react";
import { Link } from "react-router-dom";
import { ICard } from "../../types/ICard";
import { IMG_URL } from "../../urls/urls";
import "./Card2.css";

/**
 * Компонент для отображения карточки с фильмом для второстепенных страниц
 */
export const Card2: FC<ICard> = ({ id, title, poster_path, release_date }) => {
  return (
    <div className="card2">
      <div className="card2__img">
        <Link to="/info">
          <img
            className="card1__img_img"
            alt={title}
            src={poster_path ? IMG_URL + poster_path : "/img/1.jpg"}
          />
        </Link>
      </div>
      <div className="card2__content">
        <h2 className="card2__content_h2">
          <Link className="card2__content_a" to="/info" title={title}>
            {title}
          </Link>
        </h2>
        <p className="card2__content_p">{release_date}</p>
      </div>
    </div>
  );
};
