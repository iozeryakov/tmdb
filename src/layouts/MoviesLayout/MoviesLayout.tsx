import { FC, useState, useEffect, ChangeEvent, useRef } from "react";
import { MainLayout } from "../MainLayout/MainLayout";
import { APY_KEY, BASE_URL } from "../../urls/urls";
import { ICard } from "../../types/ICard";
import { Card2 } from "../../components/Card2/Card2";
import { useLoading } from "../../hooks/useLoading";
import { useScroll } from "../../hooks/useScroll";
import "./MoviesLayout.css";

interface IProp {
  type: string;
  name: string;
}

/**
 * Макет для второстепенных страниц
 */
export const MoviesLayout: FC<IProp> = ({ type, name }: IProp) => {
  const [movies, setMovies] = useState<ICard[]>([]);
  const [page, setPage] = useState(1);
  const [method, setMethod] = useState(`/discover/${type}`);
  const [value, setValue] = useState("");
  const ref = useRef(null);
  const intersected = useScroll(ref, () => {
    setPage((prevState) => prevState + 1);
  });
  const { data, loading, error } = useLoading<ICard[]>(
    BASE_URL +
      method +
      `?query=${value}&${APY_KEY}&page=${page}&sort_by=popularity.desc&language=ru`
  );
  useEffect(() => {
    if (data) {
      setMovies((prevState) => [...prevState, ...data]);
    }
  }, [data]);
  useEffect(() => {
    if (value && value.trim()) {
      setMethod(`/search/${type}`);
    } else {
      setMethod(`/discover/${type}`);
    }
    setMovies([]);
    setPage(1);
  }, [value, type]);

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <MainLayout value={value} onChangeValue={onChangeValue}>
      <section className="main__section">
        <div className="section__wrapper">
          <div className="section__content">
            <div className="content__title">
              <h2 className="content__title_h2">
                {loading
                  ? "Загрузка..."
                  : movies.length === 0
                  ? name + " нет результатов по запросу:" + value
                  : name}
              </h2>
            </div>
            <div className="content">
              <div>
                <div className="cards-wrapper">
                  <div className="cards">
                    {error
                      ? "Ошибка"
                      : movies.map(
                          (
                            {
                              id,
                              title,
                              poster_path,
                              release_date,
                              name,
                              first_air_date,
                            },
                            index
                          ) => {
                            return (
                              <Card2
                                key={index} //Приходится использовать, так как на сайте есть фильмы с одинаковым id.
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
