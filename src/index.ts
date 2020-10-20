import EventEmitter, { ViewerEvents, EventNames } from './lib/eventHandlers'
import { IObject } from './lib/constant'
import BlendType from './lib/BlendType'
import { Viewer } from './lib/Krpano'

let uuid = Date.now()
export class Krpano extends EventEmitter<keyof typeof ViewerEvents> {
    public readonly panoramaId: string = `panorama-${uuid++}`
    public readonly BlendType = BlendType
    protected viewer: Viewer
    constructor(selector: string, skinXml: string) {
        super()
        ;(window as any).embedpano({
            xml: skinXml,
            target: selector,
            mobilescale: 1.0,
            id: this.panoramaId,
            webglsettings: {
                preserveDrawingBuffer: true,
                depth: true,
                stencil: true
            },
            // 全局变量
            vars: {
                eventHandlers: this.eventHandlers
            },
            consolelog: true,
            onready: (krpano: any) => {
                setTimeout(() => {
                    this.viewer = krpano
                    this.emit(ViewerEvents.ready)
                }, 10)
            },
            onerror: (message: string) => {
                this.emit(ViewerEvents.error, message)
                console.error(message)
            }
        })
    }

    /**
     *
     * @param xmlpath xml path
     * @param vars  key1=value1&key2=value2
     * @param flags Several flags can be combined by a | character : MERGE|KEEPMOVING...
     * @param blend Blend / fade to next panoroma - transition animation.
     */
    public loadPano(
        xmlPath: string,
        vars?: IObject,
        flags?: string,
        blend?: string
    ): Krpano {
        this.viewerCall(`loadpano('${xmlPath}', ${vars}, ${flags}, ${blend})`)
        return this
    }

    /**
     *
     * @param sceneName
     * @param vars  key1=value1&key2=value2
     * @param flags Several flags can be combined by a | character : MERGE|KEEPMOVING...
     * @param blend Blend / fade to next panoroma - transition animation.
     */
    public loadScene(
        sceneName: string,
        vars?: IObject,
        flags?: string,
        blend?: string
    ): Krpano {
        this.viewerCall(
            `loadscene('${sceneName}', ${vars}, ${flags}, ${blend})`
        )
        return this
    }

    /**
     *
     * @param xmlPath
     * @param sceneName
     * @param vars  key1=value1&key2=value2
     * @param flags Several flags can be combined by a | character : MERGE|KEEPMOVING...
     * @param blend Blend / fade to next panoroma - transition animation.
     */
    public loadPanoScene(
        xmlPath: string,
        sceneName: string,
        vars?: IObject,
        flags?: string,
        blend?: string
    ): Krpano {
        this.viewerCall(
            `loadpanoscene('${xmlPath}', '${sceneName}', ${vars}, ${flags}, ${blend})`
        )
        return this
    }

    /**
     *
     * @param xmlString
     * @param vars  key1=value1&key2=value2
     * @param flags Several flags can be combined by a | character : MERGE|KEEPMOVING...
     * @param blend Blend / fade to next panoroma - transition animation.
     */
    public loadXML(
        xmlString: string,
        vars?: IObject,
        flags?: string,
        blend?: string
    ): Krpano {
        this.viewerCall(`loadxml('${xmlString}', ${vars}, ${flags}, ${blend})`)
        return this
    }

    /**
     * krpano事件调用
     * @param content
     */
    public viewerCall(content: string): Promise<this> {
        return this.getViewer().then(() => {
            content
                .split(/\n/)
                .map((item) => item.trim())
                .filter((item) => !!item)
                .forEach((item) => {
                    this.viewer.call(item)
                })
            return this
        })
    }

    /**
     * 获取krpano
     */
    protected getViewer(): Promise<any> {
        if (this.viewer) {
            return Promise.resolve(this.viewer)
        }
        return new Promise((resolve, reject) => {
            this.once(ViewerEvents.ready, () => resolve(this.viewer))
            this.once(ViewerEvents.error, (err: Error) => reject(err))
        })
    }
}
