import { Pencil } from './Pencil.js';
import { Sprite } from '../base/Sprite.js';

export class PencilDown extends Pencil {
    constructor(top) {
        const image = Sprite.getImage('pencil_down');
        super(image, top);
    }
    draw() {
        const gap = wx.getSystemInfoSync().windowHeight / 5;
        this.y = this.top + gap;
        super.draw();
    }
}
