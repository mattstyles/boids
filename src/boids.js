
import { Vector2, toRadians } from 'mathutil'

import ctx from './canvas'
import CONSTANTS from './constants'

const PI2 = Math.PI * 2

class Boid {
    constructor( opts ) {
        opts = Object.assign({
            x: CONSTANTS.CANVAS_WIDTH / 2,
            y: CONSTANTS.CANVAS_HEIGHT / 2
        }, opts )

        this.pos = new Vector2( opts.x, opts.y )
        this.dir = new Vector2( 0, 1 )
        this.acceleration = 0

        this.size = 4
    }

    render() {
        ctx.fillStyle = '#9b59b6'
        ctx.strokeStyle = '#404040'
        ctx.lineWidth = 2

        // Render facing vector
        ctx.beginPath()
        ctx.moveTo( ...this.pos.position() )
        ctx.lineTo( ...this.pos.add( this.dir.scalar( 10 ) ).position() )
        ctx.stroke()

        // Render shape
        ctx.beginPath()
        ctx.arc( ...this.pos.position(), this.size, 0, PI2, false )
        ctx.fill()
        ctx.stroke()
    }

    update( delta ) {
        // Apply friction to slow us down
        this.acceleration /= 1.2

        // Apply shield to stop us if we're close to stopping
        if ( this.acceleration < 1 ) {
            this.acceleration = 0
        }

        this.pos = this.pos.add( this.dir.scalar( this.acceleration ) )
    }

    forward = () => {
        if ( this.acceleration < 1 ) {
            this.acceleration = 1
        }

        if ( this.acceleration < 5 ) {
            this.acceleration *= 1.5
        }
    }

    backward = () => {

    }

    left = () => {
        this.dir = this.dir.rotate( toRadians( -10 ) )
    }

    right = () => {
        this.dir = this.dir.rotate( toRadians( 10 ) )
    }
}


class Boids {
    constructor() {
        this.leader = null
        this.entities = []
    }

    registerLeader( entity ) {
        this.leader = entity
        this.entities.push( entity )
    }

    update( delta ) {
        this.entities.forEach( e => {
            e.update( delta )
        })
    }
}


var leader = new Boid()
var boids = new Boids()
boids.registerLeader( leader )

export default {
    leader: leader,
    boids: boids
}
