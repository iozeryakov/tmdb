const APY_KEY='api_key=df8ef6e41bdc22f50c14faf9a78a6da4';//api
const BASE_URL= 'https://api.themoviedb.org/3';//начало ссылки для api запроса
const IMG_URL='https://image.tmdb.org/t/p/w500'; //начало ссылки для img запроса

const type = (new URL(document.location)).searchParams.get("type");
const hash = document.querySelector('.hedden');
hash.value=type;
const search=(new URL(document.location)).searchParams.get("search");
const button = document.querySelector('.button');


if (type=='movie'){
    if(search==null){
        document.querySelector('.content__title_h2').innerHTML='Фильмы';
        button.addEventListener('click',function(){
            get(type);
        })
        get(type);
    }else if (search!=''){
        document.querySelector('.content__title_h2').innerHTML='Фильмы по запросу: '+search;
        button.addEventListener('click',function(){
            getSearch(search,type);
        })
        getSearch(search,type);
    }else{
        document.querySelector('.content__title_h2').innerHTML='Нет фильмов соответствующих запросу.';
    }
}else if (type=='tv'){
    if(search==null){
        document.querySelector('.content__title_h2').innerHTML='Сериалы';
        button.addEventListener('click',function(){
            get(type);
        })
        get(type);
    }else if (search!=''){
        document.querySelector('.content__title_h2').innerHTML='Сериалы по запросу: '+search;
        button.addEventListener('click',function(){
            getSearch(search,type);
        })
        getSearch(search,type);
    }else{
        document.querySelector('.content__title_h2').innerHTML='Нет фильмов соответствующих запросу.';
    }
}else{
    document.querySelector('.content__title_h2').innerHTML='Нет фильмов соответствующих запросу.';
}

function getSearch(search,type){
    const page = button.id;
    button.style.visibility='hidden';
    const APY_URL=BASE_URL+`/search/${type}?`+APY_KEY+`&page=${page}&query=${search}&sort_by=popularity.desc&language=ru`; 
    fetch(APY_URL).then(mave=>mave.json()).then(data=>{
        if (data.results.length==0 & page==1){
            document.querySelector('.content__title_h2').innerHTML=`Нет фильмов соответствующих запросу: ${search}`;
        }else{
            show(data.results); 
        }
        
    })
}
function get(type){
    const page = button.id;
    button.style.visibility='hidden';
    const APY_URL=BASE_URL+`/discover/${type}?sort_by=popularity.desc&`+APY_KEY+`&language=ru&page=${page}`; 
    fetch(APY_URL).then(mave=>mave.json()).then(data=>{
        show(data.results); 
    })
}
function show(data){
    const popul=document.querySelector('.cards');
    data.forEach(movie => {
        const {poster_path,id,name}= movie;
        let {title,release_date,first_air_date}=movie;
        if (title==null){
            title=name;
        }
        if (release_date==null){
            release_date=first_air_date;
        }
        let IMG_Full=IMG_URL+poster_path;
        if(poster_path==null){
            IMG_Full='./img/1.jpg';
        }
        if(release_date==null){
            release_date='Неизвестно';
        }
        if(first_air_date==null){
            first_air_date='Неизвестно';
        }
        const movieEl=document.createElement('div');
        movieEl.classList.add('card2');
        movieEl.innerHTML=`
        <div id="${id}" class="card2__img">
        <a href="./film.html">
          <img class="card1__img_img" src="${IMG_Full}">
        </a> 
      </div>
      <div class="card2__content">
          <h2 class="card2__content_h2">
              <a class="card2__content_a"href="./film.html" title="${title}">${title}</a>   
          </h2>
        <p class="card2__content_p">${release_date}</p>
      </div>`
        popul.appendChild(movieEl);    
    });
    if(data.length==20 & button.id<500){
        button.id=Number(button.id)+1;
        button.style.visibility='visible';
    }
}
