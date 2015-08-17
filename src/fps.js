
import Stats from 'stats.js'

let stats = new Stats()

stats.setMode( 0 )

stats.domElement.style.position = 'absolute'
stats.domElement.style.right = '0px'
stats.domElement.style.top = '0px'

document.body.appendChild( stats.domElement )

export default stats
