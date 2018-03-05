import viewState from '../../data/viewState'
import {
  CHECK_IF_MOBILE,
  SET_CURRENT_VIEW,
  SHOW_FOOTER,
  CAN_SCROLL,
  DO_ANIMATION,
  SET_FALLBACK_VIEW,
  SET_TRANS_DIR,
  GET_VP_DIMS,
  CHECK_IF_IE
} from '../actions/types'

const initialState = {
  isMobile: null,
  currentView: viewState[0],
  fallbackView: '',
  footerShown: false,
  canScroll: true,
  animateIn: false,
  transDir: '>>',
  dims: {
    width: null,
    height: null
  },
  isIE: null
}

const splashReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_IF_MOBILE: {
      const newState = { ...state }
      newState.isMobile = action.payload
      return newState
    }
    case CHECK_IF_IE : {
      const newState = { ...state }
      newState.isIE = action.payload
      return newState
    }
    case SET_CURRENT_VIEW: {
      // const newViewState = { ...state.currentView }
      // for (let prop in action.payload) {
      //   newViewState[prop] = action.payload[prop]
      // }
      const newState = { ...state }
      newState.currentView = action.payload
      return newState
    }
    case SET_FALLBACK_VIEW: {
      const newState = { ...state }
      newState.fallbackView = action.payload
      return newState
    }
    case SHOW_FOOTER: {
      const newState = { ...state }
      newState.footerShown = action.payload
      return newState
    }
    case CAN_SCROLL: {
      const newState = { ...state }
      newState.canScroll = action.payload
      return newState
    }
    case DO_ANIMATION: {
      const newState = { ...state }
      newState.animateIn = action.payload
      return newState
    }
    case SET_TRANS_DIR: {
      const newState = { ...state }
      newState.transDir = action.payload
      return newState
    }
    case GET_VP_DIMS: {
      const newDims = { ...state.dims }
      const { width, height } = action.payload
      newDims.width = width
      newDims.height = height
      const newState = { ...state }
      newState.dims = newDims
      return newState
    }
    default:
      return state
  }
}

export default splashReducer
