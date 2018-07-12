import { Sprite } from '../base/Sprite.js';
import { Director } from '../Director.js';
import { DataStore } from '../base/DataStore.js';
/// 铅笔基类
export class Pencil extends Sprite {
    constructor(image, top) {
        super({
            image,
            srcX: 0,
            srcY: 0,
            srcW: image.width,
            srcH: image.height,
            x: DataStore.getInstance().windowWidth,
            y: 0,
            width: image.width,
            height: image.height
        });
        this.top = top
    }
    draw() {
        this.x -= Director.getInstance().moveSpeed
        super.draw({
            image: this.image,
            srcX: 0,
            srcY: 0,
            srcW: this.width,
            srcH: this.height,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        })
    }
}
