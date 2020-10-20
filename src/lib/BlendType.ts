import { TweenType } from './constant'
export default new (class BlendType {
    public noBlend() {
        return 'NOBLEND'
    }
    public blend(time: number, tweenType: TweenType) {
        return `BLEND(${time}, ${tweenType})`
    }
})()
