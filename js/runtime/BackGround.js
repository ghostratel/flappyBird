import { Sprite } from '../base/Sprite.js';

export class BackGround extends Sprite {
    constructor() {
        const image = BackGround.getImage('background');
        super({
            image: image,
            srcX: 0,
            srcY: 0,
            srcW: image.width,
            srcH: image.height,
            x: 0,
            y: 0,
            width: wx.getSystemInfoSync().windowWidth,
            height: wx.getSystemInfoSync().windowHeight
        });
    }
}
