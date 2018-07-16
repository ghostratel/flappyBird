import BGM from '../../assets/audio/bgm.mp3'
import getScore from '../../assets/audio/score.mp3'
import gameOver from '../../assets/audio/gameOver.mp3'
import fly from '../../assets/audio/fly.mp3'

const audioMap = new Map([
  ['BGM', BGM],
  ['getScore', getScore],
  ['gameOver', gameOver],
  ['fly', fly]
])

export class Audio {
  constructor (music) {
    const audio = document.createElement('audio')
    audio.src = audioMap.get(music)
    return audio
  }
}
