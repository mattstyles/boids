
import { Vector2, toRadians, lerp } from 'mathutil'

import ctx from './canvas'
import CONSTANTS from './constants'

const PI2 = Math.PI * 2

class Boid {
    constructor( opts ) {
        opts = Object.assign({
            x: CONSTANTS.CANVAS_WIDTH / 2,
            y: CONSTANTS.CANVAS_HEIGHT / 2,
            color: '#9b59b6',
            accelerationForce: lerp( Math.random(), 1.1, 1.35 ),
            angularForce: lerp( Math.random(), .9, 1.2 )
        }, opts )

        this.pos = new Vector2( opts.x, opts.y )
        this.dir = new Vector2( Math.random(), Math.random() ).unit()
        this.acceleration = 0
        this.angular = 0

        this.leader = null

        this.size = 4
        this.color = opts.color
        this.accelerationForce = opts.accelerationForce
        this.angularForce = opts.angularForce
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

    setLeader( lead ) {
        this.leader = lead
    }

    render() {
        ctx.fillStyle = this.color
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

    update() {
        // Without a leader the boids are useless!
        if ( !this.leader ) {
            return
        }

        // For now, just try to have them follow the leader
        // rotation matching
        let angle = this.leader.dir.cross( this.dir )

        if ( angle < -0.2 ) {
            this.right()
        }
        if ( angle > 0.2 ) {
            this.left()
        }

        // acceleration matching
        if ( this.leader.acceleration > 1 ) {
            this.forward()
        }

        // Now apply forces
        this.applyForces()
    }

    applyForces() {
        // Apply friction to slow us down
        this.acceleration *= .95

        // Apply shield to stop us if we're close to stopping
        if ( this.acceleration > -.25 && this.acceleration < .5 ) {
            this.acceleration = 0
        }

        if ( this.acceleration ) {
            this.pos = this.pos.add( this.dir.scalar( this.acceleration ) )
        }

        // Handle rotation
        this.angular *= .9
        if ( this.angular > -.75 && this.angular < .75 ) {
            this.angular = 0
        }

        if ( this.angular ) {
            this.dir = this.dir.rotate( toRadians( this.angular ) )
        }
    }

    forward = () => {
        if ( this.acceleration < .5 ) {
            this.acceleration = .5
        }

        if ( this.acceleration < 2.75 ) {
            this.acceleration *= this.accelerationForce
        }
    }

    backward = () => {
        this.acceleration *= .85

        if ( this.acceleration > .5 ) {
            this.acceleration *= this.accelerationForce / 2
            return
        }

        if ( this.acceleration === 0 ) {
            this.acceleration = -.5
        }

        if ( this.acceleration > -2 ) {
            this.acceleration *= this.accelerationForce * .75
        }
    }

    left = () => {
        if ( this.angular <= -4 ) {
            return
        }

        this.angular -= this.angularForce
    }

    right = () => {
        if ( this.angular >= 4 ) {
            return
        }
        this.angular += this.angularForce
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

    update() {
        this.applyForces()
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

        this.entities.forEach( boid => {
            boid.setLeader( entity )
        })
    }

    update( delta ) {
        this.entities.forEach( e => {
            e.update( delta )
        })
    }

    render() {
        this.entities.forEach( e => {
            e.render()
        })
    }
}


var leader = new Leader({
    color: '#F22613',
    acclerationForce: 1.5,
    angularForce: 1.2
})
var boids = new Boids()
let i = CONSTANTS.NUM_BOIDS
let length = Math.max( CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT ) * .1
while( i-- >= 0 ) {
    boids.entities.push( new Boid({
        x: ( CONSTANTS.CANVAS_WIDTH / 2 ) + lerp( Math.random(), -length, length ),
        y: ( CONSTANTS.CANVAS_HEIGHT / 2 ) + lerp( Math.random(), -length, length )
    }))
}
boids.registerLeader( leader )

export default {
    leader: leader,
    boids: boids
}
