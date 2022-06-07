import { FC } from 'react';
import { ICard } from '../../types/ICard';
import { IMG_URL } from '../../urls/urls'
import './Card1.css';


/**
 * Компонент для отображения карточки с фильмом для главной страницы
 */
export const Card1: FC<ICard> = ({id,title, poster_path, release_date,name,first_air_date})=> {
  return (
    <div className='card1'>
      <div className="card1__img">
        <a href={'/info'}>
          <img className="card1__img_img" src={poster_path?(IMG_URL+poster_path):('/img/1.jpg')}/>
        </a> 
      </div>
      <div className="card1__title">
        <a className="card1__title_a"href={'/info'} title={title?title:name}>{title?title:name}</a>
        <p className="card1__title_p">{release_date?release_date:first_air_date}</p>
      </div>
    </div>
  );
};