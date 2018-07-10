import { resources } from './resources.js';
export class ResourceLoader {
    constructor() {
        this.resourceMap = new Map(resources);
        this.loadResource();
    }

    // 加载资源
    loadResource() {
        for (let [resourceName, resourcePath] of this.resourceMap) {
            let image = wx.createImage();
            image.src = resourcePath;
            this.resourceMap.set(resourceName, image);
        }
    }
    
    // 所有资源加载完毕
    onResouceLoaded(callback) {
        let loadedCount = 0;
        for (let image of this.resourceMap.values()) {
            image.onload = () => {
                loadedCount++;
                if (loadedCount >= this.resourceMap.size) {
                    callback(this.resourceMap);
                }
            };
        }
    }

    static create() {
        return new ResourceLoader();
    }
}
