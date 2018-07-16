import { DataStore } from '../base/DataStore';

export class Score {
    constructor() {
        this.context = DataStore.getInstance().context;
        this.score = 0;

        // canvas刷新很快，需要一个标志位控制加分只加一次
        this.canScore = true;
    }

    draw() {
        this.context.font = '25px Arial';
        this.context.fillStyle = '#ffffff';
        this.context.fillText(
            this.score,
            DataStore.getInstance().windowWidth / 2,
            DataStore.getInstance().windowHeight / 18,
            1000
        );
    }
}
