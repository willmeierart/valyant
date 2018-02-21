import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import initApollo from './initApollo'
import store from './redux/store'

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName (Component) {
  return Component.displayName || Component.name || 'Component'
}

export default ComposedComponent => {
  return class WithData extends Component {
    static displayName = `WithData(${getComponentDisplayName(
      ComposedComponent
    )})`
    static propTypes = {
      serverState: PropTypes.object.isRequired
    }

    static async getInitialProps (ctx) {
      let serverState = {}

      // evaluate getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }

      // Running all queries in the tree extracting the data
      if (!process.browser) {
        const apollo = initApollo()
        const redux = store(apollo)
        // url prop if any of our queries needs it
        const url = { query: ctx.query, pathname: ctx.pathname }

        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ApolloProvider client={apollo} store={redux}>
              <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()

        // Extract query data from the store
        const state = redux.getState()

        // Extract query data from the Apollo store
        serverState = {
          apollo: {
            data: state.apollo.cache.extract()
          }
        }
      }

      return {
        serverState,
        ...composedInitialProps
      }
    }

    constructor (props) {
      super(props)
      this.apollo = initApollo(this.props.serverState)
      this.redux = store(this.apollo, this.props.serverState)
    }

    render () {
      return (
        <ApolloProvider client={this.apollo} store={this.redux}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
