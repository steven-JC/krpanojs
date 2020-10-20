import { Viewer } from './Krpano'

export default class View {
    constructor(protected viewer: Viewer) {}
    public lookat(h, v, fov?, distortion?, architectural?, pannini?) {
        this.viewer.call(
            `lookat(${h}, ${v}, ${fov}, ${distortion}, ${architectural}, ${pannini})`
        )
    }
    public lookto(
        toH,
        toV,
        fov?,
        motiontype?,
        shortestway?,
        nonblocking?,
        donecall?: string
    ) {
        this.viewer.call(
            `lookto(${toH}, ${toV},${fov},${motiontype},${shortestway},${nonblocking},${donecall})`
        )
    }
    public looktohotspot(hotspotname?, fov?, motiontype?, shortestway?) {}
    public moveto(toH, toV, motiontype?) {}
    public zoomto(fov, motiontype?) {}
    public adjusthlookat(desthlookat) {}
    public adjust360(source_ath, target_ath) {}
    public getlooktodistance(result, toH, toV, fromH?, fromV?) {}
    public stoplookto() {}
    public stopmovements() {}
    public wait(parameter) {}
    public oninterrupt(actions) {}
}
