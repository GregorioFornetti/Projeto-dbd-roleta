export default class RouletteButton {
    constructor(container, HTMLParent, createIconWithTooltip, btnClass, placeHolderIconSrc) {
        this.container = container;
        this.createIconWithTooltip = createIconWithTooltip;
        this.btnClass = btnClass;
        this.placeHolderIconSrc = placeHolderIconSrc;
        this.button = this.createButton();
        HTMLParent.appendChild(this.button);
    }
    click() {
        this.button.click();
    }
    clearButton() {
        this.button.children[0].remove();
        let img = document.createElement('img');
        img.className = 'img-fluid';
        img.src = this.placeHolderIconSrc;
        this.button.appendChild(img);
        if (this.selectedObject) {
            this.container.deselect(this.selectedObject);
        }
        this.selectedObject = null;
    }
    createButton() {
        let button = document.createElement('button');
        button.className = `btn-selection-modal ${this.btnClass}-roulette`;
        button.addEventListener('click', () => {
            this.update();
        });
        let img = document.createElement('img');
        img.className = 'img-fluid';
        img.src = this.placeHolderIconSrc;
        button.appendChild(img);
        return button;
    }
    update() {
        let randomObject = this.container.selectRandom();
        if (randomObject) {
            const icon = this.createIconWithTooltip(randomObject);
            icon.classList.add('roulette-tooltip');
            this.button.appendChild(icon);
            this.button.children[0].remove();
            if (this.selectedObject) {
                this.container.deselect(this.selectedObject);
            }
            this.selectedObject = randomObject;
        }
    }
}
