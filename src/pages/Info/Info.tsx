import { FC } from "react";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";

/**
 * Страница для фильмов/сериалов без информации
 */
export const Info: FC = () => {
  return (
    <MainLayout>
      <section className="main__section">
        <div className="section__wrapper">
          <div className="section__content">
            <div className="content__title">
              <h2 className="content__title_h2">
                Это учебный проект, выполненный в рамках курса для frontend
                разработчиков
              </h2>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
