import { DataStore } from './base/DataStore.js';
import { PencilUp } from './runtime/PencilUp.js';
import { PencilDown } from './runtime/PencilDown.js';
import { Audio } from './base/Audio.js'
// 单例模式  导演类 控制游戏逻辑
export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
        this.isGameOver = false;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Director();
        }
        return this.instance;
    }

    run() {
        this.check();
        if (!this.isGameOver) {
            // 绘制背景
            this.dataStore.get('background').draw();

            // 绘制铅笔
            const pencils = this.dataStore.get('pencils');
            pencils.forEach(pencil => {
                pencil.draw();
            });
            // 铅笔相关逻辑
            // 铅笔超出屏幕左侧时将铅笔从数组中移除
            if (pencils[0].x <= -pencils[0].image.width) {
                pencils.shift();
                pencils.shift();
                this.dataStore.get('score').canScore = true;
            }
            // 当铅笔超过屏幕左侧一半且只有两个铅笔时，创建一组新的铅笔
            if (
                pencils[0].x <=
                    this.dataStore.windowWidth / 2 - pencils[0].image.width &&
                pencils.length === 2
            ) {
                this.createPencil();
            }

            // 绘制地板
            this.dataStore.get('land').draw();

            // 绘制积分
            this.dataStore.get('score').draw();

            // 绘制小鸟
            this.dataStore.get('birds').draw();

            // canvas渲染
            let timer = requestAnimationFrame(() => {
                this.run();
            });
            this.dataStore.set('timer', timer);
        } else {
            // 死亡音效
            const gameOver = new Audio('audio/gameOver.mp3')
            gameOver.play()

            this.dataStore.get('start_button').draw();
            const timer = this.dataStore.get('timer');
            cancelAnimationFrame(timer);
            this.dataStore.destory();
            wx.triggerGC();
        }
    }

    createPencil() {
        const MAX_HEIGHT = this.dataStore.windowHeight / 2;
        const MIN_HEIGHT = this.dataStore.windowHeight / 8;
        const top = MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) * Math.random();
        this.dataStore.get('pencils').push(new PencilUp(top));
        this.dataStore.get('pencils').push(new PencilDown(top));
    }

    // 小鸟事件
    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('birds').y[i] = this.dataStore.get(
                'birds'
            ).birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    // 小鸟碰撞判断
    check() {
        // 小鸟碰撞地板
        const birdsSprite = this.dataStore.get('birds');
        const landSprite = this.dataStore.get('land');
        const score = this.dataStore.get('score');
        if (
            birdsSprite.birdsY[0] + birdsSprite.birdsHeight[0] >=
            landSprite.y
        ) {
            this.isGameOver = true;
            return;
        }
        // 小鸟边框
        const birdsBorder = {
            top: birdsSprite.birdsY[0],
            bottom: birdsSprite.birdsY[0] + birdsSprite.birdsHeight[0],
            left: birdsSprite.birdsX[0],
            right: birdsSprite.birdsX[0] + birdsSprite.birdsWidth[0]
        };

        // 铅笔

        const pencils = this.dataStore.get('pencils');
        for (let i = 0; i < pencils.length; i++) {
            const pencilBorder = {
                top: pencils[i].y,
                bottom: pencils[i].y + pencils[i].height,
                left: pencils[i].x,
                right: pencils[i].x + pencils[i].width
            };
            if (Director.isStroke(birdsBorder, pencilBorder)) {
                this.isGameOver = true;
                return;
            }
        }

        //加分逻辑
        if (
            birdsSprite.birdsX[0] > pencils[0].x + pencils[0].width && score.canScore) {
            score.canScore = false;
            score.score++;

            // 震动
            wx.vibrateShort();

            // 得分音效
            const getScore = new Audio('audio/score.mp3');
            getScore.play();

        }
    }

    static isStroke(bird, pencil) {
        let result = false;
        // 上铅笔 60 和 17 是为了适配铅笔尖三角形形状设置的常量参数，可以自行修改
        if (pencil.top <= 0) {
            if (
                bird.top < pencil.bottom - 60 &&
                bird.right > pencil.left &&
                bird.right < bird.right
            ) {
                result = true;
                console.log('case: 1', bird, pencil);
                return result;
            }
            if (
                bird.right > pencil.left + 17 &&
                bird.right < pencil.right &&
                bird.top < pencil.bottom
            ) {
                result = true;
                console.log('case: 2', bird, pencil);
                return result;
            }
        } else {
            // 下铅笔 60 和 17 是为了适配铅笔尖三角形形状设置的常量参数，可以自行修改
            if (
                bird.bottom > pencil.top + 60 &&
                bird.right > pencil.left &&
                bird.right < pencil.right
            ) {
                result = true;
                console.log('case: 3', bird, pencil);
                return result;
            }
            if (
                bird.right > pencil.left + 17 &&
                bird.right < pencil.right &&
                bird.bottom > pencil.top
            ) {
                result = true;
                console.log('case: 4', bird, pencil);
                return result;
            }
        }
    }
}
