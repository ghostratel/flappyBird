import { DataStore } from './base/DataStore.js';
import { PencilUp } from './runtime/PencilUp.js';
import { PencilDown } from './runtime/PencilDown.js';
// 单例模式  导演类 控制游戏逻辑
export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();

        this.backGroundSprite = this.dataStore.get('background');
        this.landSprite = this.dataStore.get('land');
        this.moveSpeed = 2;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Director();
        }
        return this.instance;
    }

    run() {
        // 绘制背景
        this.backGroundSprite.draw();

        // 绘制铅笔
        const pencils = this.dataStore.get('pencils')
        pencils.forEach(pencil => {
            pencil.draw();
        });
        // 铅笔相关逻辑
        // 铅笔超出屏幕左侧时将铅笔从数组中移除
        if(pencils[0].x <= -pencils[0].image.width) {
            pencils.shift()
            pencils.shift()
        }
        // 当铅笔超过屏幕左侧一半且只有两个铅笔时，创建一组新的铅笔
        if(pencils[0].x <= wx.getSystemInfoSync().windowWidth / 2 - pencils[0].image.width && pencils.length === 2) {
            this.createPencil()
        }

        // 绘制地板
        this.landSprite.draw();

        // canvas渲染
        let timer = requestAnimationFrame(() => {
            this.run();
        });
        this.dataStore.set('timer', timer);
        // cancelAnimationFrame(this.dataStore.get('timer'))
    }

    createPencil() {
        const MAX_HEIGHT = wx.getSystemInfoSync().windowHeight / 2;
        const MIN_HEIGHT = wx.getSystemInfoSync().windowHeight / 8;
        const top = MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) * Math.random();
        this.dataStore.get('pencils').push(new PencilUp(top));
        this.dataStore.get('pencils').push(new PencilDown(top));
    }
}
