import { APY_KEY,BASE_URL } from './urls.js';
import { show } from './show.js';
const popul=document.getElementById('popularity');
const trend=document.getElementById('trending');

getMovies('movie') //загрузка карточек в блок - Что популярно
getMovies('day') //загрузка карточек в блок - В тренде
setImg(); //загрузка титульной картинки

/**
 * получение данных и загрузка нужных карточек
 * @param {string} type - тип страницы 
 */
export function getMovies(type){ 
    if (type==='movie' || type==='tv'){//ветка для блока- Что в тренде
        try{
            const APY_URL=BASE_URL+`/discover/${type}?sort_by=popularity.desc&`+APY_KEY+`&language=ru`;  
            fetch(APY_URL).then(mave=>mave.json()).then(data=>{
                popul.innerHTML='';
                show(data.results,popul,1);
            })
        } catch (err) {
            console.error('Error', err);
        }
    }
    else if(type==='week' || type==='day'){//ветка для блока- в тренде
        try{
            const APY_URL=BASE_URL+`/trending/all/${type}?`+APY_KEY+`&language=ru`; 
            fetch(APY_URL).then(mave=>mave.json()).then(data=>{
                trend.innerHTML='';
                show(data.results,trend,1);
            })
        } catch (err) {
            console.error('Error', err);
        }
    }
};
/**
 * получение данных и добавление изображения
 */
function setImg(){
    const APY_URL=BASE_URL+`/trending/all/day?`+APY_KEY; 
    fetch(APY_URL).then(mave=>mave.json()).then(data=>{
        document.querySelector('.main__section_title').style.backgroundImage=`linear-gradient(to right, rgba(3,37,65, 0.8) 0%, rgba(3,37,65,0) 100%), url('https://image.tmdb.org/t/p/original${data.results[Math.floor(Math.random() *(19 -0 +1)) +0].backdrop_path}')`;
    })
}