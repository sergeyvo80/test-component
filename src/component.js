/**
 * Created by Sergey on 21.10.2016.
 *
 * Абстрактная компонента
 *
 * @class Component
 */
export class Component {

    /**
     * @constructor
     * @param {Object} domEl Дом элемент.
     * @param {Array} observeAttrs Массив названий атрибутов используемых для задания свойств компаненты.
     */
    constructor(domEl, observeAttrs) {
        this.domEl = domEl;
        let my = this;
        this.observer = new MutationObserver(function (mutations) {
            if (['characterData', 'attributes'].indexOf(mutations[0].type)!=-1) {
                my._render();
            }
        });
        this.observer.observe(this.domEl, {
            characterData: true,
            characterDataOldValue: true,
            subtree: true,
            attributes: true,
            childList: false,
            attributeFilter: observeAttrs
        });
        this._render();
    }

    /**
     * Рендеринг компоненты.
     *
     * @method _render
     */
    _render() {
        //render to dom
    }
}
