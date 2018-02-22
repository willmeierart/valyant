import {
  CHECK_IF_MOBILE,
  SET_CURRENT_VIEW,
  SHOW_FOOTER,
  CAN_SCROLL,
  DO_ANIMATION
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
