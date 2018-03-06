import React from 'react'
import { Provider } from 'react-redux'
import Store from './Store'

const AppProvider = ({ children }) => (
  <Provider store={Store}>
    { children }
  </Provider>
)

export default AppProvider
