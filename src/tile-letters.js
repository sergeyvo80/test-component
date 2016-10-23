/**
 * Created by Sergey on 21.10.2016.
 */

import {Component} from './component';
import './tile-letters.less';

/**
 * Компонента которая делает плитку из букв водящей строки.
 *
 * @class TileLetters
 */
export class TileLetters extends Component {

    /**
     * @constructor
     * @param {Object} domEl Дом элемент.
     */
    constructor(domEl) {
        super(domEl, ['layout', 'order']);
    }

    /**
     * Рендеринг компоненты.
     *
     * @method _render
     */
    _render() {
        let resContent = this._createContent(),
            resDiv = this._getContainer();
        this._setStyles(resDiv);
        if (resDiv.innerHTML != resContent) {
            resDiv.innerHTML = resContent;
        }
    }

    /**
     * Возвращает контейнер для отрисовки компаненты.
     *
     * @method _getContainer
     * @return {Object} DOM контейнер для отрисовки компоненты.
     */
    _getContainer() {
        let resDiv;
        if (this.domEl.nextSibling.tagName
            && this.domEl.nextSibling.tagName.toLowerCase() == 'my-el-result') {
            resDiv = this.domEl.nextSibling;
        } else {
            resDiv = document.createElement('my-el-result');
            this.domEl.parentNode.insertBefore(resDiv, this.domEl.nextSibling);
        }
        return resDiv;
    }

    /**
     * Создает содержимое для компаненты.
     *
     * @method _getContent
     * @return {String} Содержимое компоненты.ы
     */
    _createContent() {
        let resContent = '';
        for(let letter of this.domEl.innerText) {
            resContent+= '<tile style="background-color: #'+this._getLetterColor(letter)+';">'+letter+'</tile>';
        }
        return resContent;
    }

    /**
     * Устанавливает стили компаненты.
     *
     * @method _setStyles
     * @param {Object} resDiv Контейнер содержимого компоненты.
     */
    _setStyles(resDiv) {
        let layout = this.domEl.getAttribute('layout'),
            order = this.domEl.getAttribute('order'),
            flexDirection,
            flexDirectionType,
            reverse = '';

        flexDirection = resDiv.style.flexDirection;
        flexDirectionType = flexDirection.replace('-reverse', '');
        if (order == 'reversed') {
            reverse = '-reverse';
            resDiv.style.justifyContent = 'flex-end';
        } else {
            resDiv.style.justifyContent = 'flex-start';
        }
        if ((flexDirection.indexOf('reverse')!=-1 && order != 'reversed')
            || (flexDirection.indexOf('reverse') ==-1 && order == 'reversed')
        ) {
            resDiv.style.flexDirection = flexDirectionType + reverse;
        }
        if (layout == 'inline' && flexDirection.indexOf('row') == -1) {
            resDiv.style.flexDirection = 'row' + reverse;
        }
        if (layout == 'column' && flexDirection.indexOf('column') == -1) {
            resDiv.style.flexDirection = 'column' + reverse;
        }
    }

    /**
     * Возвращает цвет символа.
     *
     * @method _getLetterColor
     * @param {String} Символ.
     * @return {String} Цвет символа.
     */
    _getLetterColor(letter) {
        let letterColor = letter.charCodeAt(0);
        if (letterColor > 1000) {
            letterColor-=1000;
        }
        return letterColor*4+400;
    }
}
