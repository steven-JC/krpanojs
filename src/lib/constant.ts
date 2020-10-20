export enum Flag {
    MERGE = 'MERGE',
    PRELOAD = 'PRELOAD',
    KEEPIMAGE = 'KEEPIMAGE',
    KEEPMOVING = 'KEEPMOVING',
    KEEPSCENES = 'KEEPSCENES',
    KEEPPLUGINS = 'KEEPPLUGINS',
    KEEPHOTSPOTS = 'KEEPHOTSPOTS',
    NOPREVIEW = 'NOPREVIEW',
    REMOVESCENES = 'REMOVESCENES',
    IGNOREKEEP = 'IGNOREKEEP',
    IMAGEONLY = 'IMAGEONLY'
}
export enum TweenType {
    linear = 'linear',
    easeinquad = 'easeinquad',
    easeoutquad = 'easeoutquad',
    easeinoutquad = 'easeinoutquad',
    easeinback = 'easeinback',
    easeoutback = 'easeoutback',
    easeinoutback = 'easeinoutback',
    easeincubic = 'easeincubic',
    easeoutcubic = 'easeoutcubic',
    easeinquart = 'easeinquart',
    easeoutquart = 'easeoutquart',
    easeinquint = 'easeinquint',
    easeoutquint = 'easeoutquint',
    easeinsine = 'easeinsine',
    easeoutsine = 'easeoutsine',
    easeinexpo = 'easeinexpo',
    easeoutexpo = 'easeoutexpo',
    easeincirc = 'easeincirc',
    easeoutcirc = 'easeoutcirc',
    easeinbounce = 'easeinbounce',
    easeoutbounce = 'easeoutbounce',
    easeoutinquad = 'easeoutinquad',
    easeinoutcubic = 'easeinoutcubic',
    easeoutincubic = 'easeoutincubic',
    easeinoutquart = 'easeinoutquart',
    easeoutinquart = 'easeoutinquart',
    easeinoutquint = 'easeinoutquint',
    easeoutinquint = 'easeoutinquint',
    easeinoutsine = 'easeinoutsine',
    easeoutinsine = 'easeoutinsine',
    easeoutinexpo = 'easeoutinexpo',
    easeinoutexpo = 'easeinoutexpo',
    easeinoutcirc = 'easeinoutcirc',
    easeoutincirc = 'easeoutincirc',
    easeinoutbounce = 'easeinoutbounce',
    easeoutinbounce = 'easeoutinbounce'
}

export interface IObject {
    [key: string]: any
}