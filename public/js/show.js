import { IMG_URL } from './urls.js';

/**
 * Вставление готовых карточек
 * @param {object} data - результат get запроса
 * @param {object} elm - элемент куда вставлять карточки
 * @param {number} card - тип карточки
 */

export function show(data,elm,card){
    data.forEach(movie => {
        const {poster_path,id,name}= movie;
        let {title,release_date,first_air_date}=movie;
        /**
         * Если результат get запроса передает фильмы то название его лежит в title
         * А если там сериалы то название будут в name, а title будет - null
         * тоже самое и с датами.
         * Поэтому сделал обработку снизу.
         */
        if (!title){
            title=name;
        }
        if (!release_date){
            if(!first_air_date){//но даты может не быть вообще, поэтому вот такое исключение
                first_air_date='Неизвестно';
            }
            release_date=first_air_date;
        }
        let IMG_Full=IMG_URL+poster_path;
        if(!poster_path){
            IMG_Full='./img/1.jpg';
        }
        const movieEl=getCard(id,IMG_Full,title,release_date,card);
        elm.appendChild(movieEl);    
    });
}

/**
 * Создание карточки
 * @param {number} id - результат get запроса
 * @param {string} img - изображение фильма/сериала
 * @param {string} title - название фильма/сериала
 * @param {string} date - дата выхода фильма/сериала
 * @param {number} type - тип карточки
 * @returns {object} - готовая карточка
 */

function getCard(id,img,title,date,type){
    const movieEl=document.createElement('div');
    if(type===1){
        movieEl.classList.add('card1');
        movieEl.innerHTML=`
        <div id="${id}" class="card1__img">
            <a href="./film.html">
                <img class="card1__img_img" src="${img}">
            </a> 
        </div>
        <div class="card1__title">
            <a class="card1__title_a"href="./film.html" title="${title}">${title}</a>
            <p class="card1__title_p">${date}</p>
        </div>`
    }else if(type===2){
        movieEl.classList.add('card2');
        movieEl.innerHTML=`
            <div id="${id}" class="card2__img">
                <a href="./film.html">
                    <img class="card1__img_img" src="${img}">
                </a> 
            </div>
            <div class="card2__content">
                <h2 class="card2__content_h2">
                    <a class="card2__content_a"href="./film.html" title="${title}">${title}</a>   
                </h2>
                <p class="card2__content_p">${date}</p>
            </div>`
    }
    return movieEl    
}
