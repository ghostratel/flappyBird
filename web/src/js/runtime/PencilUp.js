import { Pencil } from './Pencil.js'
import { Sprite } from '../base/Sprite.js'
// 上方铅笔

export class PencilUp extends Pencil {
  constructor (top) {
    const image = Sprite.getImage('pencil_up')
    super(image, top)
  }
  draw () {
    this.y = this.top - this.height
    super.draw()
  }
}
