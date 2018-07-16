export class Audio {
    constructor(path) {
        const audio =  wx.createInnerAudioContext();
        audio.src = path
        return audio
    }
}
