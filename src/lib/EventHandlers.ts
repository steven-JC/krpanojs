/**
 * @Created idler.zhu
 * @CreateDate 2018/9/17
 * @Description krpano event handler
 */
import EventEmitter from 'eventemitter3'

export enum EventNames {
    error = 'error',
    log = 'log',
    allShiftSceneImageLoaded = 'allShiftSceneImageLoaded',
    loadingShiftSceneImages = 'loadingShiftSceneImages',
    shiftSceneImageLoaded = 'shiftSceneImageLoaded',
    sceneLoaded = 'sceneLoaded',
    sceneChanging = 'sceneChanging',
    sceneChanged = 'sceneChanged',
    updateZoom = 'updateZoom',
    updateGyroStatus = 'updateGyroStatus',
    updateVRStatus = 'updateVRStatus',
    updateRotateStatus = 'updateRotateStatus',
    clickDesc = 'clickDesc',
    clickLink = 'clickLink',
    updateVRSupport = 'updateVRSupport',
    updateGyroSupport = 'updateGyroSupport',
    dropHotspot = 'dropHotspot'
}

export enum ViewerEvents {
    ready = 'ready',
    error = 'error',
    updateFullScreen = 'updateFullScreen',
    updateVRSupportState = 'updateVRSupportState'
}

type Events = keyof typeof EventNames

class EventHandlers<T extends string> extends EventEmitter<T | Events> {
    protected readonly eventHandlers: Record<
        string,
        (...args: any[]) => void
    > = {}

    private readonly events: Array<keyof typeof EventNames> = [
        EventNames.error,
        EventNames.log,
        EventNames.sceneLoaded,
        EventNames.sceneChanging,
        EventNames.sceneChanged,
        EventNames.updateZoom,
        EventNames.loadingShiftSceneImages,
        EventNames.shiftSceneImageLoaded,
        EventNames.allShiftSceneImageLoaded,
        EventNames.updateGyroStatus,
        EventNames.updateVRStatus,
        EventNames.updateRotateStatus,
        EventNames.updateVRSupport,
        EventNames.updateGyroSupport,
        EventNames.dropHotspot,
        EventNames.clickDesc,
        EventNames.clickLink
    ]

    constructor() {
        super()
        this.eventHandlers = this.getEvents()
    }

    public destroyHandlers() {
        this.events.forEach((name) => this.off(name))
    }

    /**
     * 获取事件列表
     * 导出krpanoOn{EventName}事件
     * @returns {any}
     */
    public getEvents() {
        return this.events.reduce<any>((prev: any, action: string) => {
            const eventHandle = (...args: any[]) => {
                ;(this as any).emit.apply(this, [action].concat(args) as any)
            }
            prev[action] = eventHandle
            return prev
        }, {})
    }
}

export default EventHandlers
