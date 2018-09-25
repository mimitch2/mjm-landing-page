import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Foo extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div>CONTENT</div>
    )
  }
}

Foo.propTypes = {
  prop: PropTypes.array,
}

export default Foo;