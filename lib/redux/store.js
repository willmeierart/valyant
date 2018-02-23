import { compose, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import reducers from './reducers'

import {
  CHECK_IF_MOBILE,
  CAN_SCROLL,
  SET_CURRENT_VIEW,
  SHOW_FOOTER,
  DO_ANIMATION
} from './actions/types'

const logger = createLogger({
  predicate: (getState, action) => {
    return action.type !== CHECK_IF_MOBILE &&
      action.type !== CAN_SCROLL &&
      action.type !== SET_CURRENT_VIEW &&
      action.type !== SHOW_FOOTER &&
      action.type !== DO_ANIMATION
  }
})

const middlewares = [thunk, promise]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const reduxDevTools = typeof window !== 'undefined'
  ? (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  : function (a) { return a }

const Store = compose(
  applyMiddleware(...middlewares))(createStore)(reducers, reduxDevTools)

export default Store
