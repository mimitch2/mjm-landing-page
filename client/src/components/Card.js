import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
  card: {
    background: "#8AB2C2",
    // padding: "10px",
    // borderRadius: "3px",
    // boxShadow: "1px 1px 1px rgba(0, 0, 0, .3)",
    borderRadius: "4px",
  },
  heading: {
    fontSize: 26,
    fontWeight: 300,
    background: "#444",
    color: "rgb(175, 175, 175)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 6px 0px 8px",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px"

    
  },
  icon: {
    // padding: "0px 8px 0px 8px",
    cursor: "pointer",
    fontSize: "18px",

  },
  content: {
    // display: "flex",
    fontSize: "16px",
    overflowY: "auto",
    padding: 10,
    marginTop: 10
  },
  dataDiv: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "3px"
    // background: "pink"
  },
  dataImg: {
    margin: "0px 8px 0px 8px",
    height: "24px"
  },
  options: {
    cursor: "pointer",
    zIndex: 100
  }

}

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
   
    }
    
  }

  componentDidMount = () => {
    // const height = document.getElementById('card').getBoundingClientRect().height
    // console.log(height)
  }

  returnImgSource = (type, urlInsert) => {
    if (type === "NEWS") {
      return `https://icon-locator.herokuapp.com/icon?url=${urlInsert}&size=70`
    }
  }

  handleOptionClick = (option) => {
    const opt = document.getElementById(option)
    opt.classList.toggle('clicked')
  }

  reload = ( e ) => {
    const id = e.target.id
    const el = document.getElementById(id)
    
    if (id === "reload-news") {
      this.reloadNews()
    }

    el.classList.toggle('spin-once')
    setTimeout(() => {
      el.classList.toggle('spin-once')
    }, 720);
  }

  reloadNews = () => {
    const newsSources = this.props.userData.news.sources.map(src =>{
      return src.id
    }).join()
    this.props.loadNewsArticles(newsSources)
  }

  

  render() {
    const { gridColumn, gridRow, height, heading } = this.props
    return (
    
      <div className="card" id="card"  
        style={{...styles.card, gridColumn: gridColumn, gridRow: gridRow, height: height}}>
        <div className="card-heading" style={styles.heading}>
          { heading } 
          {(this.props.options && 
            <div style={styles.dataDiv}>
              { this.props.options.map(src => 
                <div className="card-options-div" key={src.id} 
                  id={src.id}
                  style={styles.options} 
                  onClick={ () => this.handleOptionClick(src.id) }>
                  <img style={styles.dataImg} src={ this.returnImgSource(heading, src.url) } alt=""/> 
                </div>
              )}
            </div>)
            || null
          }
          <div style={{display: 'flex', alignItems: "center", justifyContent: "space-around", width: "55px"}}>
            <i className="fal fa-sync reload" id={`reload-${heading.toLowerCase()}`} style={{fontSize: "14px", cursor: "pointer"}}
              onClick={this.reload}></i>
            <i className="fal fa-user-cog" onClick={() => this.props.settingsClick(heading)} style={styles.icon}></i>
          </div>
        </div>
        <div className="card-content" style={{...styles.content, height: height - 57, maxHeight: height - 57}}>
          {this.props.children}
        </div>
    
      </div>
    )
  }
}

Card.propTypes = {
  component: PropTypes.object,
}

export default Card;