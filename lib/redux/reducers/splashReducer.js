import viewState from '../../data/viewState'
import {
  CHECK_IF_MOBILE,
  SET_CURRENT_VIEW,
  SHOW_FOOTER,
  CAN_SCROLL,
  DO_ANIMATION
} from '../actions/types'

const initialState = {
  isMobile: null,
  currentView: viewState[0],
  footerShown: false,
  canScroll: true,
  animateIn: false
}

const splashReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_IF_MOBILE : {
      const newState = { ...state }
      newState.isMobile = action.payload
      return newState
    }
    case SET_CURRENT_VIEW : {
      const newState = { ...state }
      newState.currentView = action.payload
      return newState
    }
    case SHOW_FOOTER : {
      const newState = { ...state }
      newState.footerShown = action.payload
      return newState
    }
    case CAN_SCROLL : {
      const newState = { ...state }
      newState.canScroll = action.payload
      return newState
    }
    case DO_ANIMATION : {
      const newState = { ...state }
      newState.animateIn = action.payload
      return newState
    }
    default :
      return state
  }
}

export default splashReducer
