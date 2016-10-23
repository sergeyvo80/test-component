# test-component

import {TileLetters} from './tile-letters'; //подключение компаненты

document.addEventListener("DOMContentLoaded", function() {

    // инициализация компоненты my-el
    let myEl = document.querySelector('my-el');
    let tileLetters = new TileLetters(myEl);

    // тестирование компоненты my-el
    let layout = document.getElementsByClassName('layout')[0];
    let order = document.getElementsByClassName('order')[0];
    layout.addEventListener("change", function() {
        myEl.setAttribute('layout', this.value);
    });
    order.addEventListener("change", function() {
        myEl.setAttribute('order', this.value);
    });
});
