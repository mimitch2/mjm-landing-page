import React, { Component } from 'react'
// import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import '../css/App.css'

const styles = {

  leftList: {
    fontSize: "18px",
    fontWeight: 300,
    height: "300px",
    maxHeight: "300px",
    overflowY: "auto"
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "3px 10px 3px 10px"
  },
  RightListItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "3px 10px 3px 10px"
  }
}

class  MultiSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.sources !== this.props.sources) {
      this.render()
    }
  }

  render() {
    const {sources} = this.props
    // console.log(sources)
    if (sources) {
      return (
        <div className="select-main">
          <div  style={styles.leftList}>
            {sources.map((source, i) => {
              return (
                <div key={i} >
                  {this.props.type === "add" &&
                <div style={styles.listItem}>
                  <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <img src={`https://icon-locator.herokuapp.com/icon?url=${source.url}&size=70..120..200`} alt="" height="24px" style={{margin: "0px 4px 0px 4px"}}/>
                    <div>{source.name}</div>
                  </div>
                  <i className="fas fa-plus-circle" style={{color: "green", cursor: "pointer"}}
                    onClick={() => this.props.add(source)}
                  ></i>
                </div>
                 || 
                 <div style={styles.RightListItem}>
                 
                   <i className="fas fa-minus-circle" style={{color: "red", marginRight:"4px", cursor: "pointer"}}
                     onClick={() => this.props.remove(source)}
                   ></i>
                   <img src={`https://icon-locator.herokuapp.com/icon?url=${source.url}&size=70..120..200`} alt="" width="24px" style={{margin: "0px 4px 0px 4px"}}/>
                   <div>{source.name}</div>
                 </div>
                  }
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default MultiSelect ;