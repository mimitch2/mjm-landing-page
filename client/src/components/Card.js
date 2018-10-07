import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const styles = {
  card: {
    background: "#8AB2C2",
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
    height: "30px",
    width: "30px",
    border: "2px white solid",
    borderRadius: "50%",
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
      newsSources: this.props.userData.news.sources.map(src =>{
        return src.id
      }).join(),
      tempNewsSources: this.props.userData.news.sources.map(src =>{
        return src.id
      }).join()
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

  reload = ( src, e ) => {
    const id = e.target.id
    const el = document.getElementById(id)
    
    if (id.includes('reload-news')) {
      if (id.includes('img')) {
        this.reloadNews(src)
      } else {
        this.props.loadNewsArticles(this.state.tempNewsSources) //********* FIX */
      }
    }

    if (!id.includes('img')) {
      el.classList.toggle('spin-once')
      setTimeout(() => {
        el.classList.toggle('spin-once')
      }, 720);
    }
   
  }

  reloadNews = ( src ) => {
    const {  tempNewsSources } = this.state
    // if (src) {
    const filteredSources = tempNewsSources.split(',').filter(fSrc => fSrc !== src).join() 
    if (tempNewsSources.includes(src)) {
      this.setState({tempNewsSources: filteredSources})
      this.props.loadNewsArticles(filteredSources)
    } else {
      if (tempNewsSources) {
        const updatedSources = [...filteredSources.split(','), src].join() //*********** FIX */
        this.setState({tempNewsSources: updatedSources})
        this.props.loadNewsArticles(updatedSources)
      } else {
        this.setState({tempNewsSources: src})
        setTimeout(() => {
          this.props.loadNewsArticles(src)
          console.log(src)
        }, 50);
          
      }
    }
    // } 
  }

  render() {
    // console.log(this.state.tempNewsSources)
    const { gridColumn, gridRow, height, heading } = this.props
    return (
      <div className="card" id="card"  
        style={{...styles.card, gridColumn: gridColumn, gridRow: gridRow, height: "auto", maxHeight: height}}>
        <div className="card-heading" style={styles.heading}>
          { heading } 
          {(this.props.options && 
            <div style={styles.dataDiv}>
              { this.props.options.map(src => 
                <div className="card-options-div" key={src.id} 
                  id={src.id}
                  style={styles.options} 
                  onClick={ () => this.handleOptionClick(src.id) }>
                  <OverlayTrigger placement="top" 
                    overlay={
                      <Tooltip id="tooltip">
                        {`${src.name}-click to not see`}
                      </Tooltip>
                    }>
                    <img style={styles.dataImg} 
                      src={ this.returnImgSource(heading, src.url) } 
                      onClick={ (e) => this.reload(src.id, e)}
                      id={ `reload-${heading.toLowerCase()}-img` }
                      alt=""/> 
                  </OverlayTrigger>
                </div>
              )}
            </div>)
            || null
          }
          <div style={{display: 'flex', alignItems: "center", justifyContent: "space-around", width: "55px"}}>
            <i className="fal fa-sync reload" 
              id={`reload-${heading.toLowerCase()}`} 
              style={{fontSize: "14px", cursor: "pointer"}}
              onClick={ (e) => this.reload(null, e)}></i>
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