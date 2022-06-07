import { FC } from 'react';
import { ICard } from '../../types/ICard';
import { IMG_URL } from '../../urls/urls'
import './Card2.css';

/**
 * Компонент для отображения карточки с фильмом для второстепенных страниц
 */
export const Card2: FC<ICard> = ({id,title, poster_path, release_date,name,first_air_date})=> {
  return (
    <div className='card2'>
       <div className="card2__img">
            <a href={'/info'}>
                <img className="card1__img_img" src={poster_path?(IMG_URL+poster_path):('/img/1.jpg')}/>
            </a> 
        </div>
        <div className="card2__content">
            <h2 className="card2__content_h2">
                <a className="card2__content_a"href={'/info'} title={title?title:name}>{title?title:name}</a>   
            </h2>
            <p className="card2__content_p">{release_date?release_date:first_air_date}</p>
        </div>
    </div>
  );
};