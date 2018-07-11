// 陆地类
import { Sprite } from '../base/Sprite.js';
import { Director } from '../Director.js';
const loopWidth = 137; // 陆地图片循环宽度
export class Land extends Sprite {
    constructor() {
        const image = Sprite.getImage('land');
        super({
            image,
            srcX: 0,
            srcY: 0,
            srcW: image.width,
            srcH: image.height,
            x: 0,
            y: wx.getSystemInfoSync().windowHeight - image.height,
            width: image.width,
            height: image.height
        });
        // 地板水平变化坐标
        this.landX = 0;
        // 地板移动速度
        this.landSpeed = 2;
    }
    draw() {
        this.landX += this.landSpeed;
        if (
            this.landX >
            this.image.width - wx.getSystemInfoSync().windowWidth
        ) {
            this.landX =
                loopWidth -
                (wx.getSystemInfoSync().windowWidth - Director.getInstance().moveSpeed * loopWidth) -
                10;
        }
        super.draw({
            image: this.image,
            srcX: this.srcX,
            srcY: this.srcY,
            srcW: this.srcW,
            srcH: this.srcH,
            x: -this.landX,
            y: this.y,
            width: this.width,
            height: this.height
        });
    }
}
