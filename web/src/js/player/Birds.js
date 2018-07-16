import { Sprite } from '../base/Sprite.js'
import { DataStore } from '../base/DataStore.js'

// 小鸟类
export class Birds extends Sprite {
  constructor () {
    const image = Sprite.getImage('birds')
    super({
      image,
      srcX: 0,
      srcY: 0,
      srcW: image.width,
      srcH: image.height,
      x: 0,
      y: 0,
      width: image.width,
      height: image.height
    })
    // 小鸟三种状态用一个数组存储
    // 小鸟的宽34，上下边距10， 左右边距9
    this.clippingX = [9, 9 + 34 + 18, 9 + 34 + 18 + 34 + 18]
    this.clippingY = [10, 10, 10]
    this.clippingWidth = [34, 34, 34]
    this.clippingHeight = [24, 24, 24]
    const birdX = DataStore.getInstance().windowWidth / 5
    this.birdsX = [birdX, birdX, birdX]
    const birdY = DataStore.getInstance().windowHeight / 2
    this.birdsY = [birdY, birdY, birdY]
    const birdWidth = 34
    this.birdsWidth = [birdWidth, birdWidth, birdWidth]
    const birdHeight = 24
    this.birdsHeight = [birdHeight, birdHeight, birdHeight]
    this.y = [birdY, birdY, birdY]
    this.index = 0
    this.count = 0
    this.time = 0
    this.speed = 0.2
    this.gravity = 0.98 / 2.4
    this.offsetUp = 30
  }
  draw () {
    this.count += this.speed
    if (this.index >= 2) {
      this.count = 0
    }
    const offsetY = (this.gravity * this.time * (this.time - this.offsetUp)) / 2
    for (let i = 0; i <= 2; i++) {
      this.birdsY[i] = this.y[i] + offsetY
    }
    this.time++
    // 减速器
    this.index = Math.floor(this.count)
    super.draw({
      image: this.image,
      srcX: this.clippingX[this.index],
      srcY: this.clippingY[this.index],
      srcW: this.clippingWidth[this.index],
      srcH: this.clippingHeight[this.index],
      x: this.birdsX[this.index],
      y: this.birdsY[this.index],
      width: this.birdsWidth[this.index],
      height: this.birdsHeight[this.index]
    })
  }
}
