
import Quay from 'quay'
import throttle from 'lodash.throttle'

import CONSTANTS from './constants'
import { leader } from './boids'

let quay = new Quay()

quay.on( '<up>', throttle( leader.forward, CONSTANTS.INPUT_THROTTLE ) )
quay.on( '<down>', throttle( leader.backward, CONSTANTS.INPUT_THROTTLE ) )
quay.on( '<left>', throttle( leader.left, CONSTANTS.INPUT_THROTTLE ) )
quay.on( '<right>', throttle( leader.right, CONSTANTS.INPUT_THROTTLE ) )
