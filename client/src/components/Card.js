import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
  card: {
    background: "lightgrey",
    // padding: "10px",
    // borderRadius: "3px",
    boxShadow: "1px 1px 6px rgba(0, 0, 0, .3)",

  },
  heading: {
    fontSize: 26,
    fontWeight: 300,
    background: "black",
    color: "grey",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 8,
    
  },
  icon: {
    paddingRight: 8,
    cursor: "pointer",
    fontSize: "18px"
  },
  content: {
    // display: "flex",
    overflowY: "auto",
    padding: 10,
    marginTop: 10
  },

}

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
   
    }
    
  }

  componentDidMount = () => {
    const height = document.getElementById('card').getBoundingClientRect().height
    // console.log(height)
  }






  render() {
    const { component, gridColumn, gridRow, height, heading} = this.props
    return (
    
      <div className="card" id="card"  
        style={{...styles.card, gridColumn: gridColumn, gridRow: gridRow, height: height}}>
        <div className="card-heading" style={styles.heading}>
          { heading } 
          <i className="fal fa-user-cog" onClick={() => this.props.settingsClick(heading)} style={styles.icon}></i>
        </div>
        <div className="card-content" style={{...styles.content, height: height - 57, maxHeight: height - 57}}>
          { component }
        </div>
    
      </div>
    )
  }
}

Card.propTypes = {
  component: PropTypes.object,
}

export default Card;