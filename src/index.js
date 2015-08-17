
import 'core-js'
import raf from 'raf'

import './input'
import ctx from './canvas'
import CONSTANTS from './constants'
import stats from './fps'

import { leader } from './boids'

function render() {
    ctx.clearRect( 0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT )

    leader.render()
}

function onTick() {
    stats.begin()
    render()

    stats.end()
    raf( onTick )
}


raf( onTick )


window.leader = leader
