import React from 'react';
import PropTypes from 'prop-types'
import Header from '../src/client/components/header/Header';

class ContextProvider extends React.Component {
    static childContextTypes = {
      insertCss: PropTypes.func,
    }

    getChildContext() {
      return { ...this.props.context }
    }

    render () {
      return <Header { ...this.props } />
    }
  }

  export default ContextProvider