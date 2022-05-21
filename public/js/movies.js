import { APY_KEY,BASE_URL } from './urls.js';
import { show } from './show.js';

const local= new URLSearchParams(document.location.search);
const type =local.get("type");
const search=local.get("search");
const hash = document.querySelector('.hedden');

hash.value=type;

const popul=document.querySelector('.cards');
const button = document.querySelector('.button');

button.addEventListener('click',function(){
    get(search,type);
})
get(search,type);//загрузка дынных на страницу

/**
 * получение данных и загрузка нужных карточек
 * @param {object} search - строка поиска
 * @param {string} type - тип страницы 
 */
function get(search,type){
    const page = button.id;
    button.style.visibility='hidden';
    document.querySelector('.content__title_h2').innerHTML=translate(type)[0];
    let method=`/discover/${type}?`;
    if (search!==null){
        if (search){
            document.querySelector('.content__title_h2').innerHTML=translate(type)[0]+` по запросу: ${search}`;
            method=`/search/${type}?`;
        }        
    }
    try{
        const APY_URL=BASE_URL+method+APY_KEY+`&page=${page}&query=${search}&sort_by=popularity.desc&language=ru`; 
        fetch(APY_URL).then(mave=>mave.json()).then(data=>{
            if (data.results.length==0 & page==1){
                document.querySelector('.content__title_h2').innerHTML=`Нет ${translate(type)[1]} соответствующих запросу: ${search}`;
            }else{
                show(data.results,popul,2);
                if(data.results.length===20 & button.id<500){//нумерацию страниц сохраняю в кнопке
                    button.id=Number(button.id)+1;
                    button.style.visibility='visible';
                } 
            }
            
        })
    } catch (err) {
        console.error('Error', err);
    }
}
/** 
* получение нужных слов по типу обращения 
*  @param {string} type - тип страницы  */
function translate(type){
    if(type==='movie'){
        return new Array("Фильмы","фильмов");
    }else if(type==='tv'){
        return new Array("Сериалы","сериалов");
    }
}