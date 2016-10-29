// подключение компаненты
import {TileLetters} from './tile-letters';

document.addEventListener("DOMContentLoaded", function() {

    // регистрация компоненты tile-letters
    document.registerElement("tile-letters", TileLetters);

    //тестирование компоненты my-el
    let myEl = document.querySelector('tile-letters');
    document.querySelector('.test-text').addEventListener("keyup", function() {
        myEl.innerHTML = this.value;
    });
    document.querySelector('.layout').addEventListener("change", function() {
        myEl.setAttribute('layout', this.value);
    });
    document.querySelector('.order').addEventListener("change", function() {
        myEl.setAttribute('order', this.value);
    });

});
