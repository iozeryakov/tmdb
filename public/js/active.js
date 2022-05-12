/**
 * Выделение активнной кнопки и вызов загрузки фильмов по данногму критерию
 */
import { getMovies } from './new.js';
const items = document.querySelectorAll('.selector__item');
for( var i=0;i<items.length;i++){
    const link= items[i];
    link.addEventListener('click',function(){
        const a=link.parentNode.querySelectorAll('.selector__item');
        for (var j=0;j<a.length;j++){
            a[j].classList.remove('selector__item_active');
        }
        this.classList.add('selector__item_active');
        getMovies(this.id,'ru');
    })
};