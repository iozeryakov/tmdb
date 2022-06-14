import { FC, ReactNode, ChangeEvent } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import "./MainLayout.css";

interface IProps {
  children: ReactNode;
  onChangeValue?: (event: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Макет для главной страницы
 */
export const MainLayout: FC<IProps> = ({ children, onChangeValue }: IProps) => {
  return (
    <>
      <Header onChangeValue={onChangeValue} />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};
