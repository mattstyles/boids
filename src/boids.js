
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
        this.angular = 0

        this.size = 4
    }
    // for debug
    get position() {
        return this.pos
            .position()
            .map( val => val.toFixed( 2 ) )
            .join( ' ' )
    }
    get direction() {
        return this.dir
            .position()
            .map( val => val.toFixed( 2 ) )
            .join( ' ' )
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
        this.acceleration *= .95

        // Apply shield to stop us if we're close to stopping
        if ( this.acceleration > -1 && this.acceleration < 1 ) {
            this.acceleration = 0
        }

        this.pos = this.pos.add( this.dir.scalar( this.acceleration ) )

        // Handle rotation
        this.angular *= .9
        if ( this.angular > -1 && this.angular < 1 ) {
            this.angular = 0
        }

        if ( this.angular ) {
            this.dir = this.dir.rotate( toRadians( this.angular ) )
        }
    }
}

class Leader extends Boid {
    constructor( opts ) {
        opts = Object.assign({
            x: CONSTANTS.CANVAS_WIDTH / 2,
            y: CONSTANTS.CANVAS_HEIGHT / 2
        }, opts )

        super( opts )
    }


    forward = () => {
        if ( this.acceleration < 1 ) {
            this.acceleration = 1
        }

        if ( this.acceleration < 2.75 ) {
            this.acceleration *= 1.5
        }
    }

    backward = () => {
        this.acceleration *= .85

        if ( this.acceleration < .5 ) {
            this.acceleration = -3
        }
    }

    left = () => {
        if ( this.angular <= -10 ) {
            return
        }

        this.angular -= 2
    }

    right = () => {
        if ( this.angular >= 10 ) {
            return
        }
        this.angular += 2
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


var leader = new Leader()
var boids = new Boids()
boids.registerLeader( leader )

export default {
    leader: leader,
    boids: boids
}
