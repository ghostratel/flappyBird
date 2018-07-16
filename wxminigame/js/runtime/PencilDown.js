import { Pencil } from './Pencil.js';
import { Sprite } from '../base/Sprite.js';
import { DataStore } from '../base/DataStore.js';

export class PencilDown extends Pencil {
    constructor(top) {
        const image = Sprite.getImage('pencil_down');
        super(image, top);
        this.gap = DataStore.getInstance().windowHeight / 5;
    }
    draw() {
        this.y = this.top + this.gap;
        super.draw();
    }
}
