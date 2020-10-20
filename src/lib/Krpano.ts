export interface Viewer extends HTMLCanvasElement {
    call(cmd: string): void
    set(variable: string, value: any): void
    get(variable: string): any
    spheretoscreen(h: number, v: number): { x: number; y: number }
    screentosphere(x: number, y: number): { h: number; v: number }
}
