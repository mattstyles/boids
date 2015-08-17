
import Quay from 'quay'
import { leader } from './boids'

let quay = new Quay()

quay.on( '<up>', leader.forward )
quay.on( '<down>', leader.backward )
quay.on( '<left>', leader.left )
quay.on( '<right>', leader.right )
