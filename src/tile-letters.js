/**
 * Created by Sergey on 21.10.2016.
 */

import './tile-letters.less';

/**
 * Компонента которая делает плитку из букв водящей строки.
 *
 * @class TileLetters
 */
export class TileLetters extends HTMLElement {

    /**
     * @constructor
     * @param {Object} domEl Дом элемент.
     */
    constructor() {
        super();
    }

    /**
     * Наблюдаемые атрибуты.
     *
     * @getter observedAttributes
     * @return {Array} Наблюдаемые атрибуты.
     */
    get observedAttributes() { return ['layout', 'order']; }

    /**
     * Событие изменения атрибутов.
     *
     * @method attributeChangedCallback
     * @param {String} name Имя атрибуты.
     * @param {String} oldValue Старое значение.
     * @param {String} newValue Новое значение.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (this.observedAttributes.indexOf(name) != -1) {
            this._updateRendering();
        }
    }

    /**
     * Событие создание компоненты.
     *
     * @method createdCallback.
     */
    createdCallback() {
        this._observer = new MutationObserver(() => {
            this._updateRendering();
        });
    };

    /**
     * Событие добавления компоненты.
     *
     * @method createdCallback.
     */
    attachedCallback() {
        this._observer.observe(this, {
            childList: true,
            characterData: true,
            subtree: true
        });
        this._updateRendering();
    };

    /**
     * Рендеринг компоненты.
     *
     * @method _updateRendering
     */
    _updateRendering() {
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
        if (!this.shadowRoot) {
            this.createShadowRoot().innerHTML = `<letters></letters>`;
        }
        return this.shadowRoot.querySelector('letters');
    }

    /**
     * Создает содержимое для компаненты.
     *
     * @method _getContent
     * @return {String} Содержимое компоненты.ы
     */
    _createContent() {
        let resContent = '';
        for(let letter of this.innerHTML) {
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
        let layout = this.getAttribute('layout'),
            order = this.getAttribute('order'),
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
