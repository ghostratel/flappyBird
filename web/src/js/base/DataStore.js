// 单例模式 变量缓存器， 方便在不同类（实例中）访问修改变量

export class DataStore {
  static getInstance () {
    if (!this.instance) {
      this.instance = new DataStore()
    }
    return this.instance
  }

  constructor () {
    this.dataMap = new Map()
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
  }

  set (key, value) {
    this.dataMap.set(key, value)
    return this
  }

  get (key) {
    return this.dataMap.get(key)
  }

  destory () {
    // for (let value of this.dataMap.values()) {
    //     value = null;
    // }
    this.dataMap.clear()
  }
}
