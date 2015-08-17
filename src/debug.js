
import inline from 'inline-style'
import { leader } from './boids'

class Debug {
    constructor( data ) {
        this.el = document.createElement( 'div' )
        this.data = data

        this.el.setAttribute( 'style', inline({
            position: 'absolute',
            left: '0px',
            top: '0px',
            'font-family': 'Source Code Pro',
            'font-size': '11px',
            color: '#404040'
        }))

        document.body.appendChild( this.el )

        this.props = []
    }

    render() {
        this.props.forEach( prop => {
            this.el.querySelector( '#' + prop.name ).innerHTML = prop.name + ' : ' + this.data[ prop.dataname ]
        }, this )
    }

    addProp( prop ) {
        this.props.push( prop )
        let el = document.createElement( 'span' )
        el.style.display = 'block'
        el.setAttribute( 'id', prop.name )
        this.el.appendChild( el )
    }

}

let debug = new Debug( leader )
debug.addProp({
    name: 'Position',
    dataname: 'position'
})
debug.addProp({
    name: 'Direction',
    dataname: 'direction'
})
debug.addProp({
    name: 'Acceleration',
    dataname: 'acceleration'
})

export default debug
