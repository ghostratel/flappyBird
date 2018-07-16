import { Sprite } from '../base/Sprite.js'
import { DataStore } from '../base/DataStore.js'

export class BackGround extends Sprite {
  constructor () {
    const image = BackGround.getImage('background')
    super({
      image: image,
      srcX: 0,
      srcY: 0,
      srcW: image.width,
      srcH: image.height,
      x: 0,
      y: 0,
      width: DataStore.getInstance().windowWidth,
      height: DataStore.getInstance().windowHeight
    })
  }
}
