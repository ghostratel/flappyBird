// 精灵基类，负责初始化精灵加载的资源、大小、位置
/**
 * context canvas绘图上下文
 * image Image对象
 * srcX 要裁剪的起始X坐标
 * srcY 要裁剪的起始Y坐标
 * srcW 裁剪的宽度
 * srcH 裁剪的高度
 * x 放置的x坐标
 * Y 放置的y坐标
 * width 要使用的宽度
 * height 要使用的高度
 * @export
 * @class Sprite
 */
import { DataStore } from './DataStore.js';
export class Sprite {
    constructor({
        image = null,
        srcX = 0,
        srcY = 0,
        srcW = 0,
        srcH = 0,
        x = 0,
        y = 0,
        width = 0,
        height = 0
    }) {
        this.dataStore = DataStore.getInstance();
        this.context = this.dataStore.context;
        this.image = image;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
        this.srcH = srcH;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw({
        image = this.image,
        srcX = this.srcX,
        srcY = this.srcY,
        srcW = this.srcW,
        srcH = this.srcH,
        x = this.x,
        y = this.y,
        width = this.width,
        height = this.height
    } = {}) {
        this.context.drawImage(
            image,
            srcX,
            srcY,
            srcW,
            srcH,
            x,
            y,
            width,
            height
        );
    }
    static getImage(key) {
        return DataStore.getInstance().resouceMap.get(key);
    }
}
