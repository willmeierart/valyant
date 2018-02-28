import {
  CHECK_IF_MOBILE,
  SET_CURRENT_VIEW,
  SHOW_FOOTER,
  CAN_SCROLL,
  DO_ANIMATION,
  SET_FALLBACK_VIEW,
  SET_TRANS_DIR,
  GET_VP_DIMS
} from './types'

export const checkIfMobile = () => async dispatch => {
  const bool = window !== undefined && window.orientation !== undefined
  dispatch({
    type: CHECK_IF_MOBILE,
    payload: bool
  })
}

export const setCurrentView = newView => async dispatch => {
  dispatch({
    type: SET_CURRENT_VIEW,
    payload: newView
  })
}

export const setFallbackView = image => async dispatch => {
  dispatch({
    type: SET_FALLBACK_VIEW,
    payload: image
  })
}

export const showFooter = bool => async dispatch => {
  dispatch({
    type: SHOW_FOOTER,
    payload: bool
  })
}

export const canScroll = bool => async dispatch => {
  dispatch({
    type: CAN_SCROLL,
    payload: bool
  })
}

export const doAnimation = bool => async dispatch => {
  dispatch({
    type: DO_ANIMATION,
    payload: bool
  })
}

export const setTransDir = dir => async dispatch => {
  dispatch({
    type: SET_TRANS_DIR,
    payload: dir
  })
}

export const getVPDims = () => async dispatch => {
  const getDims = () => {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    } else {
      setTimeout(() => { getDims() }, 200)
    }
  }
  dispatch({
    type: GET_VP_DIMS,
    payload: getDims()
  })
}
