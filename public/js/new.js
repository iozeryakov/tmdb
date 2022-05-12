//TMDB
const APY_KEY='api_key=df8ef6e41bdc22f50c14faf9a78a6da4';
const BASE_URL= 'https://api.themoviedb.org/3';
const IMG_URL='https://image.tmdb.org/t/p/w500';

const popul=document.getElementById('popularity');
const trend=document.getElementById('trending');


getMovies('movie')
getMovies('day')
setImg();
export function getMovies(type){ 
    if (type=='movie' || type=='tv'){
        const APY_URL=BASE_URL+`/discover/${type}?sort_by=popularity.desc&`+APY_KEY+`&language=ru`;  
        fetch(APY_URL).then(mave=>mave.json()).then(data=>{
            showMoviesOrTV(data.results);
        })
    }
    else if(type=='week' || type=='day'){
        const APY_URL=BASE_URL+`/trending/all/${type}?`+APY_KEY+`&language=ru`; 
        fetch(APY_URL).then(mave=>mave.json()).then(data=>{
            showDayOrWeek(data.results);
        })
    }
};
function showMoviesOrTV(data){
    popul.innerHTML='';

    data.forEach(movie => {
        const {poster_path,id,name,first_air_date}= movie;
        let {title,release_date}=movie;
        if (title==null){
            title=name;
        }
        if (release_date==null){
            release_date=first_air_date;
        }
        const movieEl=document.createElement('div');
        movieEl.classList.add('card1');
        movieEl.innerHTML=`
            <div id="${id}" class="card1__img">
                <a href="./film.html">
                    <img class="card1__img_img" src="${IMG_URL+poster_path}">
                </a> 
            </div>
            <div class="card1__title">
                <a class="card1__title_a"href="./film.html" title="${title}">${title}</a>
                <p class="card1__title_p">${release_date}</p>
            </div>`
        popul.appendChild(movieEl);    
    });
}
function showDayOrWeek(data){
    trend.innerHTML='';

    data.forEach(movie => {
        const {poster_path,id,name,first_air_date}= movie;
        let {title,release_date}=movie;
        if (title==null){
            title=name;
        }
        if (release_date==null){
            release_date=first_air_date;
        }
        const movieEl=document.createElement('div');
        movieEl.classList.add('card1');
        movieEl.innerHTML=`
            <div id="${id}" class="card1__img">
                <a href="./film.html">
                    <img class="card1__img_img" src="${IMG_URL+poster_path}">
                </a> 
            </div>
            <div class="card1__title">
                <a class="card1__title_a"href="./film.html" title="${title}">${title}</a>
                <p class="card1__title_p">${release_date}</p>
            </div>`
            trend.appendChild(movieEl);    
    });
}
function setImg(){
    const APY_URL=BASE_URL+`/trending/all/day?`+APY_KEY; 
    fetch(APY_URL).then(mave=>mave.json()).then(data=>{
        document.querySelector('.main__section_title').style.backgroundImage=`linear-gradient(to right, rgba(3,37,65, 0.8) 0%, rgba(3,37,65,0) 100%), url('https://image.tmdb.org/t/p/original${data.results[Math.floor(Math.random() *(19 -0 +1)) +0].backdrop_path}')`;
    })
}