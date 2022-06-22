import { FC, useState, useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import { Card1 } from "../../components/Card1/Card1";
import { APY_KEY, BASE_URL } from "../../urls/urls";
import { useLoading } from "../../hooks/useLoading";
import { ICard } from "../../types/ICard";
import "./Main.css";

/**
 * Главная страница
 */
export const Main: FC = () => {
  const [img, setImg] = useState("");
  const [activeItem1, setActiveItem1] = useState<string>("movie");
  const [activeItem2, setActiveItem2] = useState<string>("day");

  const dataMovieTv = useLoading<ICard[]>(
    BASE_URL + `/discover/${activeItem1}?${APY_KEY}&language=ru`
  );
  const dataDayWeek = useLoading<ICard[]>(
    BASE_URL + `/trending/all/${activeItem2}?${APY_KEY}&language=ru`
  );
  useEffect(() => {
    if (dataMovieTv.data) {
      if (!img) {
        setImg(
          `url(https://image.tmdb.org/t/p/original${
            dataMovieTv.data[Math.floor(Math.random() * (19 - 0 + 1)) + 0]
              .backdrop_path
          })`
        );
      }
    }
  }, [dataMovieTv.data, img]);
  return (
    <MainLayout>
      <section
        className="main__section main__section_title"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(3,37,65, 0.8) 0%, rgba(3,37,65,0) 100%)," +
            img,
        }}
      >
        <div className="section__wrapper">
          <div className="main__title">
            <h2 className="main__title_h2">Добро пожаловать.</h2>
            <h3 className="main__title_h3">
              Миллионы фильмов, сериалов и людей. Исследуйте сейчас.
            </h3>
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
                  <div
                    id="movie"
                    className={
                      activeItem1 === "movie"
                        ? "selector__item selector__item_active"
                        : "selector__item"
                    }
                    onClick={() => {
                      setActiveItem1("movie");
                    }}
                  >
                    <h3 className="selector__item_h3">
                      <a className="selector__item_a">Фильмы</a>
                    </h3>
                  </div>
                  <div
                    id="tv"
                    className={
                      activeItem1 === "tv"
                        ? "selector__item selector__item_active"
                        : "selector__item"
                    }
                    onClick={() => {
                      setActiveItem1("tv");
                    }}
                  >
                    <h3 className="selector__item_h3">
                      <a className="selector__item_a">Сериалы</a>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="content__scroller">
                <div id="popularity" className="content__scroller_cards">
                  {dataMovieTv.error
                    ? "Ошибка"
                    : dataMovieTv.data?.map(
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
                        ) => (
                          <Card1
                            key={index} //Приходится использовать, так как на сайте есть фильмы с одинаковым id.
                            id={id}
                            title={title ? title : name}
                            poster_path={poster_path}
                            release_date={
                              release_date ? release_date : first_air_date
                            }
                          />
                        )
                      )}
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
                  <div
                    id="day"
                    className={
                      activeItem2 === "day"
                        ? "selector__item selector__item_active"
                        : "selector__item"
                    }
                    onClick={() => setActiveItem2("day")}
                  >
                    <h3 className="selector__item_h3">
                      <a className="selector__item_a">Сегодня</a>
                    </h3>
                  </div>
                  <div
                    id="week"
                    className={
                      activeItem2 === "week"
                        ? "selector__item selector__item_active"
                        : "selector__item"
                    }
                    onClick={() => setActiveItem2("week")}
                  >
                    <h3 className="selector__item_h3">
                      <a className="selector__item_a">На этой неделе</a>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="content__scroller">
                <div id="trending" className="content__scroller_cards">
                  {dataDayWeek.error
                    ? "Ошибка"
                    : dataDayWeek.data?.map(
                        ({
                          id,
                          title,
                          poster_path,
                          release_date,
                          name,
                          first_air_date,
                        }) => (
                          <Card1
                            key={id}
                            id={id}
                            title={title ? title : name}
                            poster_path={poster_path}
                            release_date={
                              release_date ? release_date : first_air_date
                            }
                          />
                        )
                      )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
