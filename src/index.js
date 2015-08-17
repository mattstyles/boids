
import 'core-js'
import raf from 'raf'

import debug from './debug'
import './input'
import ctx from './canvas'
import CONSTANTS from './constants'
import stats from './fps'

import { leader, boids } from './boids'

function render() {
    ctx.clearRect( 0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT )

    boids.render()
}

function onTick( delta ) {
    stats.begin()

    boids.update( delta )
    debug.render()
    render()

    stats.end()
    raf( onTick )
}


raf( onTick )


window.leader = leader
