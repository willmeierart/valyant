import {
  CHECK_IF_MOBILE,
  SET_CURRENT_VIEW,
  SHOW_FOOTER,
  CAN_SCROLL,
  DO_ANIMATION,
  SET_FALLBACK_VIEW,
  SET_TRANS_DIR,
  GET_VP_DIMS,
  CHECK_IF_IE,
  LOCK_ORIENTATION
} from './types'

export const lockOrientation = () => async dispatch => {
  const lockScreen = () => {
    if (typeof window !== 'undefined') {
      const { screen } = window
      screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation
      if (typeof screen.lockOrientationUniversal !== 'undefined') {
        return screen.lockOrientationUniversal('portrait-primary')
      } else {
        console.log('"screen.lockOrientation" not supported on this device')
        return false
      }
    } else {
      setTimeout(() => { lockScreen() }, 500)
    }
  }
  dispatch({
    type: LOCK_ORIENTATION,
    payload: lockScreen()
  })
}

export const checkIfMobile = () => async dispatch => {
  const mobileCheck = async () => {
    if (typeof window !== 'undefined') {
      const orientation = await window.orientation !== undefined
      return orientation
    } else { setTimeout(() => { mobileCheck() }, 500) }
  }
  dispatch({
    type: CHECK_IF_MOBILE,
    payload: mobileCheck()
  })
}

export const checkIfIE = () => async dispatch => {
  const check = () => {
    if (typeof window !== 'undefined') {
      return window.navigator.userAgent.indexOf('indows') !== -1
    } else {
      setTimeout(() => { check() }, 200)
    }
  }
  dispatch({
    type: CHECK_IF_IE,
    payload: check()
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
      const ratio = window.devicePixelRatio || 1
      const scale = false
      const isMobile = typeof window.orientation !== 'undefined'
      const WH = {
        width: isMobile ? window.screen.availWidth : window.innerWidth,
        height: isMobile ? window.screen.availHeight : window.innerHeight
      }
      const realWH = scale ? { width: WH.width * ratio, height: WH.height * ratio } : WH
      return realWH
    } else {
      setTimeout(() => { getDims() }, 200)
    }
  }
  dispatch({
    type: GET_VP_DIMS,
    payload: getDims()
  })
}
