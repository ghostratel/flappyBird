import { ResourceLoader } from './base/ResourceLoader.js';
import { Director } from './Director.js';
import { BackGround } from './runtime/BackGround.js';
import { DataStore } from './base/DataStore.js';
import { Land } from './runtime/Land.js';
export class Main {
    constructor() {
        this.canvas = wx.createCanvas();
        this.context = this.canvas.getContext('2d');

        this.dataStore = DataStore.getInstance();

        const resouceLoader = ResourceLoader.create();
        resouceLoader.onResouceLoaded(map => {
            this.handleResourceFirstLoaded(map);
        });
    }

    // 图片资源加载完毕处理函数（只加载一次）
    handleResourceFirstLoaded(resouceMap) {
        /* ES5 */
        this.dataStore.context = this.context;
        this.dataStore.resouceMap = resouceMap;

        /* ES6 */
        // this.dataStore = {...Object.assign(this.dataStore, {
        //     context: this.context,
        //     resouceMap
        // })}
        // Object.setPrototypeOf(this.dataStore, DataStore.prototype)
        this.init();
    }

    init() {
        this.dataStore
            .set('background', new BackGround())
            .set('land', new Land())
            .set('pencils', [])
            // 游戏开始前插入pencil
        this.director = Director.getInstance();
        this.director.createPencil()
        this.director.run();
    }
}
