import { combineReducers } from 'redux'
import splashReducer from './splashReducer'

const rootReducer = combineReducers({
  splash: splashReducer
})

export default rootReducer
