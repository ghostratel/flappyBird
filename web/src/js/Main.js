import { ResourceLoader } from './base/ResourceLoader.js'
import { Director } from './Director.js'
import { BackGround } from './runtime/BackGround.js'
import { DataStore } from './base/DataStore.js'
import { Land } from './runtime/Land.js'
import { Birds } from './player/Birds.js'
import { StartButton } from './player/StartButton.js'
import { Score } from './player/Score.js'
import { Audio } from './base/Audio.js'
export class Main {
  constructor () {
    this.canvas = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')
    this.director = Director.getInstance()
    this.dataStore = DataStore.getInstance()

    this.canvas.width = this.dataStore.windowWidth
    this.canvas.height = this.dataStore.windowHeight

    const resouceLoader = ResourceLoader.create()
    resouceLoader.onResouceLoaded(map => {
      this.handleResourceFirstLoaded(map)
    })
  }

  // 图片资源加载完毕处理函数（只加载一次）
  handleResourceFirstLoaded (resouceMap) {
    /* ES5 */
    this.dataStore.context = this.context
    this.dataStore.resouceMap = resouceMap

    /* ES6 */
    // this.dataStore = {...Object.assign(this.dataStore, {
    //     context: this.context,
    //     resouceMap
    // })}
    // Object.setPrototypeOf(this.dataStore, DataStore.prototype)
    this.registerEvent()
    this.init()
    // 创建背景音乐
    const BGM = new Audio('BGM')
    BGM.loop = true
    BGM.autoplay = true
  }

  init () {
    this.director.isGameOver = false
    this.dataStore
      .set('background', new BackGround())
      .set('land', new Land())
      .set('pencils', [])
      .set('birds', new Birds())
      .set('start_button', new StartButton())
      .set('score', new Score())

    // 游戏开始前插入pencil

    this.director.createPencil()
    this.director.run()
  }

  registerEvent () {
    this.canvas.addEventListener('touchstart', event => {
      if (this.director.isGameOver) {
        this.init()
      } else {
        this.director.birdsEvent()
      }
    })
  }
}
