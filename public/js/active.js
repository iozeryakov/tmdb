/**
 * Выделение активнной кнопки и вызов загрузки фильмов по данному критерию
 */
import { getMovies } from './index.js';
const items = document.querySelectorAll('.selector__item');
for( var i=0;i<items.length;i++){
    const link= items[i];
    link.addEventListener('click',function(){
        const parent=link.parentNode;
        for (var j=0;j<items.length;j++){
            if(items[j].parentNode===parent)
                items[j].classList.remove('selector__item_active');
        }
        this.classList.add('selector__item_active');
        getMovies(this.id,'ru');
    })
};