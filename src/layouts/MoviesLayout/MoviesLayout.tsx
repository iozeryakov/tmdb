import React, { FC,useState,useEffect,ChangeEvent } from 'react';
import {MainLayout} from '../'
import { APY_KEY,BASE_URL} from '../../urls/urls'
import { ICard } from '../../types/ICard';
import { Card2 } from '../../components';
import axios from 'axios';
import './MoviesLayout.css';


interface IProp{
  type:string;
  name:string;
}
/**
 * Макет для второстепенных страниц
 */
export  const MoviesLayout: FC<IProp>= ({type,name}:IProp) => {
    const [loading, setLoading] = useState(true);
    const [movies,setMovies] = useState<ICard[]>([]);
    const [page,setPage] = useState(1);
    const [count,setCount]= useState(20);
    const [method,setMethod]= useState(`/discover/${type}`);
    const [value, setValue] = useState('');
    const [flag,setFlag]= useState(false);
    const [text,setText]=useState(name);
  
    useEffect(() => {
      document.addEventListener('scroll', scrollHandler);
      return function () {
        document.removeEventListener('scroll', scrollHandler);
      };
    }, []);

    const scrollHandler = () => {
      if (
        document.documentElement.scrollHeight -
          (document.documentElement.scrollTop + window.innerHeight) <
        100
      ) {
        setLoading(true);
      }
    };

    useEffect(() => {
      if(loading && page<501 && (count===20) ){
        axios.get(BASE_URL+method+`?query=${value}&${APY_KEY}&page=${page}&sort_by=popularity.desc&language=ru`)
          .then((movie)=>{
            setMovies([...movies,...movie.data.results]);
            setPage((prevState) => prevState + 1);
            setCount(movie.data.results.length);
            setLoading(false);
            if (movie.data.results.length===0){
              setText((prevState)=>prevState+` нет результатов соответствующих запросу: ${value}`);
            }
          }).catch((error)=>{console.log(error)});
      }else{
        setLoading(false);
      }
    }, [loading]);
    
    useEffect(()=>{
      setText(name);
      setCount(20);
      if(value){
        setPage(1);
        setMethod(`/search/${type}`);
        setMovies([]);
        setLoading(true);
        setFlag(true);
      }else{
        if(flag){
          setPage(1);
          setMethod(`/discover/${type}`);
          setMovies([]);
          setLoading(true);
          setFlag(false);
        }
      }
    },[value]);
    const onChangeValue=(event:ChangeEvent<HTMLInputElement>)=>{
      setValue(event.target.value);
    };
    return (
        <MainLayout onChangeValue={onChangeValue}>
          <section className="main__section">
              <div className="section__wrapper">
                  <div className="section__content">
                      <div className="content__title">
                          <h2 className="content__title_h2">{text}</h2>
                      </div>
                      <div className="content">
                          <div>
                              <div className="cards-wrapper">
                                  <div className="cards">
                                  {movies
                                      .map(({ id,title, poster_path, release_date,name,first_air_date },index) => {
                                          return (
                                      <Card2
                                      key={index}
                                      id={id}
                                      title={title} 
                                      poster_path={poster_path} 
                                      release_date={release_date} 
                                      name={name}
                                      first_air_date={first_air_date}
                                      />)
                                      })
                                  }
                                  </div>                        
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
        </MainLayout>
    )
};