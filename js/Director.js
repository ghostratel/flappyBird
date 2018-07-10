
import { DataStore } from './base/DataStore.js';
// 单例模式  导演类 控制游戏逻辑
export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Director();
        }
        return this.instance;
    }

    run() {
        const backGroundSprite = this.dataStore.get('background')
        backGroundSprite.draw()
    }
}
