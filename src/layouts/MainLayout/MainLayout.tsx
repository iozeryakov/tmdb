import { FC, ReactNode,ChangeEvent} from 'react';
import { Footer, Header} from '../../components';
import './MainLayout.css';


interface IProps {
  children: ReactNode;
  onChangeValue?:(event: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Макет для главной страницы
 */
export  const MainLayout: FC<IProps> = ({ children,onChangeValue }: IProps) => {
   return (
    <>
        <Header onChangeValue={onChangeValue}/>
        <main className="main">
        {children}
        </main>
        <Footer />
    </>
  );
};