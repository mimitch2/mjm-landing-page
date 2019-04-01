
import React, { Component } from 'react'
const myContext = React.createContext({});

class Provider extends Component {

    state = {
      count: 0,
      updateCount: this.update()

    }

    update = () => {
      this.setState({
        count: this.state.count + 1
      })
    }


    render() {
      return (
        <myContext.Provider value={this.state}>
          {children}
        </myContext.Provider>

      )
    }
}

export default Provider;
