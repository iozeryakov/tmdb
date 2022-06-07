import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { MainLayout } from '../../layouts';
import { Card1 } from '../../components';
import { APY_KEY,BASE_URL} from '../../urls/urls'
import './Main.css';

/**
 * Главная страница
 */
export const Main: FC = () => {
  const [img, setImg] = useState('');
  const [activeItem1,setActiveItem1] = useState(true);
  const [activeItem2,setActiveItem2] = useState(true);
  const [movie,setMovie] = useState([]);
  const [tv,setTv] = useState([]);
  const [day,setDay] = useState([]);
  const [week,setWeek] = useState([]);
  
  useEffect(() => {
     axios.get(BASE_URL+`/discover/movie?sort_by=popularity.desc&${APY_KEY}&language=ru`)
    .then((movie)=>{setMovie(movie.data.results);}).catch((error)=>{console.log(error)});

    axios.get(BASE_URL+`/discover/tv?sort_by=popularity.desc&${APY_KEY}&language=ru`)
    .then((tv)=>{setTv(tv.data.results);}).catch((error)=>{console.log(error)});

    axios.get(BASE_URL+`/trending/all/day?${APY_KEY}&language=ru`)
    .then((day)=>{setDay(day.data.results);setImg(`url(https://image.tmdb.org/t/p/original${day.data.results[Math.floor(Math.random() *(19 -0 +1)) +0].backdrop_path})`);}).catch((error)=>{console.log(error)});

    axios.get(BASE_URL+`/trending/all/week?${APY_KEY}&language=ru`)
    .then((week)=>{setWeek(week.data.results);}).catch((error)=>{console.log(error)});
  }, []); 
  return (
      <MainLayout>
        <section className="main__section main__section_title" style={{
            backgroundImage:'linear-gradient(to right, rgba(3,37,65, 0.8) 0%, rgba(3,37,65,0) 100%),'+img
        }}>
            <div className="section__wrapper">
                <div className="main__title">
                <h2 className="main__title_h2">Добро пожаловать.</h2>
                <h3 className="main__title_h3">Миллионы фильмов, сериалов и людей. Исследуйте сейчас.</h3>
                </div>
            </div>
        </section>
        <section className="main__section">
          <div className="section__wrapper">
            <div className="section__content">
              <div className="section__content_wrapper">
                <div className="content__header">
                  <h2 className="content__header_h2">Что популярно</h2>
                  <div className="main-section__selector">
                    <div id = "movie" 
                          className={activeItem1?"selector__item selector__item_active":"selector__item"}
                          onClick={()=>setActiveItem1(true)}
                    >
                      <h3 className="selector__item_h3">
                        <a className="selector__item_a">
                          
                          Фильмы
                        </a>
                      </h3>
                    </div>
                    <div id ="tv" 
                          className={activeItem1?"selector__item":"selector__item selector__item_active"}
                          onClick={()=>setActiveItem1(false)}
                    >
                      <h3 className="selector__item_h3">
                        <a className="selector__item_a">
                          Сериалы
                        </a>
                      </h3>
                    </div>
                  </div>      
                </div>
                <div className="content__scroller">
                  <div id="popularity" className="content__scroller_cards">
                  {activeItem1?
                  (movie
                    .map(({ id,title, poster_path, release_date,name,first_air_date },index) => (
                      <Card1
                      key={index}
                      id={id}
                      title={title} 
                      poster_path={poster_path} 
                      release_date={release_date} 
                      name={name}
                      first_air_date={first_air_date}
                    />
                    ))
                    ):(tv
                      .map(({ id,title, poster_path, release_date,name,first_air_date },index) => (
                        <Card1
                        id={id}
                        key={index}
                        title={title} 
                        poster_path={poster_path} 
                        release_date={release_date} 
                        name={name}
                        first_air_date={first_air_date}
                      />
                      )))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="main__section">
          <div className="section__wrapper">
            <div className="section__content">
              <div className="section__content_wrapper">
                <div className="content__header">
                  <h2 className="content__header_h2">В тренде</h2>
                  <div className="main-section__selector">
                    <div id = "day" 
                          className={activeItem2?"selector__item selector__item_active":"selector__item"}
                          onClick={()=>setActiveItem2(true)}
                    >
                      <h3 className="selector__item_h3">
                        <a className="selector__item_a" >
                          Сегодня
                        </a>
                      </h3>
                    </div>
                    <div id = "week" 
                          className={activeItem2?"selector__item":"selector__item selector__item_active"}
                          onClick={()=>setActiveItem2(false)}
                    >
                      <h3 className="selector__item_h3">
                        <a className="selector__item_a" >
                          На этой неделе
                        </a>
                      </h3>
                    </div>
                  </div>      
                </div>
                <div className="content__scroller">
                  <div id="trending" className="content__scroller_cards">
                  {activeItem2?
                  (day
                    .map(({ id,title, poster_path, release_date,name,first_air_date },index) => (
                      <Card1
                      key={index}
                      id={id}
                      title={title} 
                      poster_path={poster_path} 
                      release_date={release_date} 
                      name={name}
                      first_air_date={first_air_date}
                    />
                    ))
                    ):(week
                      .map(({id,title, poster_path, release_date,name,first_air_date },index) => (
                        <Card1
                        key={index}
                        id={id}
                        title={title} 
                        poster_path={poster_path} 
                        release_date={release_date} 
                        name={name}
                        first_air_date={first_air_date}
                      />
                      )))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  };