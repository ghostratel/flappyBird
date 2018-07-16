import { Sprite } from '../base/Sprite.js'
import { DataStore } from '../base/DataStore.js'

export class StartButton extends Sprite {
  constructor () {
    const image = Sprite.getImage('start_button')
    super({
      image,
      srcX: 0,
      srcY: 0,
      srcW: image.width,
      srcH: image.height,
      x: (DataStore.getInstance().windowWidth - image.width) / 2,
      y: (DataStore.getInstance().windowHeight - image.width) / 2 - 40,
      width: image.width,
      height: image.height
    })
  }
}
