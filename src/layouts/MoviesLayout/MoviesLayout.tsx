import React, {
  FC,
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  useReducer,
} from "react";
import { MainLayout } from "../MainLayout/MainLayout";
import { APY_KEY, BASE_URL } from "../../urls/urls";
import { ICard } from "../../types/ICard";
import { Card2 } from "../../components/Card2/Card2";
import axios from "axios";
import "./MoviesLayout.css";

interface IProp {
  type: string;
  name: string;
}

/**
 * Макет для второстепенных страниц
 */
export const MoviesLayout: FC<IProp> = ({ type, name }: IProp) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<ICard[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(20);
  const [method, setMethod] = useState(`/discover/${type}`);
  const [value, setValue] = useState("");
  const [flag, setFlag] = useState(false);
  const [text, setText] = useState(name);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoading(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref]);

  useEffect(() => {
    if (loading && page < 501 && count === 20) {
      axios
        .get(
          BASE_URL +
            method +
            `?query=${value}&${APY_KEY}&page=${page}&sort_by=popularity.desc&language=ru`
        )
        .then((movie) => {
          setMovies([...movies, ...movie.data.results]);
          setPage((prevState) => prevState + 1);
          setCount(movie.data.results.length);
          setLoading(false);
          if (movie.data.results.length === 0) {
            setText(
              (prevState) =>
                prevState + ` нет результатов соответствующих запросу: ${value}`
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    setText(name);
    setCount(20);
    if (value && value.trim()) {
      setPage(1);
      setMethod(`/search/${type}`);
      setMovies([]);
      setLoading(true);
      // setFlag(true);
    } else {
      //if(flag){
      setPage(1);
      setMethod(`/discover/${type}`);
      setMovies([]);
      setLoading(true);
      //setFlag(false);
      //}
    }
  }, [value]);

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
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
                    {movies.map(
                      ({
                        id,
                        title,
                        poster_path,
                        release_date,
                        name,
                        first_air_date,
                      }) => {
                        return (
                          <Card2
                            key={id}
                            id={id}
                            title={title ? title : name}
                            poster_path={poster_path}
                            release_date={
                              release_date ? release_date : first_air_date
                            }
                          />
                        );
                      }
                    )}
                  </div>
                  <div className="button" ref={ref}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
