
import CONSTANTS from './constants'

let canvas = document.createElement( 'canvas' )
canvas.width = CONSTANTS.CANVAS_WIDTH * window.devicePixelRatio
canvas.height = CONSTANTS.CANVAS_HEIGHT * window.devicePixelRatio
canvas.style.width = CONSTANTS.CANVAS_WIDTH + 'px'
canvas.style.height = CONSTANTS.CANVAS_HEIGHT - 4 + 'px'

document.body.appendChild( canvas )

let ctx = canvas.getContext( '2d' )
ctx.scale( window.devicePixelRatio, window.devicePixelRatio )

export default ctx
