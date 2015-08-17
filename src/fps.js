
import Stats from 'stats.js'

let stats = new Stats()

stats.setMode( 0 )

stats.domElement.style.position = 'absolute'
stats.domElement.style.right = '0px'
stats.domElement.style.top = '0px'

document.body.appendChild( stats.domElement )

let mem = new Stats()
mem.setMode( 2 )
mem.domElement.style.position = 'absolute'
mem.domElement.style.right = '0px'
mem.domElement.style.top = '48px'
document.body.appendChild( mem.domElement )

let tickers = [ mem, stats ]

export default {
    begin: function() {
        tickers.forEach( t => {
            t.begin()
        })
    },
    end: function() {
        tickers.forEach( t => {
            t.end()
        })
    }
}
