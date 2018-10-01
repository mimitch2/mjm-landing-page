import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import BasicInput from './BasicInput'
import MultiSelect from './MultiSelect'
// import { FormGroup, Checkbox } from "react-bootstrap";
import '../css/App.css'

const styles = {
  settings: {
    width: "100vw",
    padding: "0px 40px 0px 40px",
    // background: "pink",
    position: "absolute",
    top: 85,
    left: 0
  },
  settingsWrapper: {
    width: "100vw",
    display: "flex",
    justifyContent: "center"

  },
  icon: {
    marginBottom: "3px",
    fontSize: "24px",
    // color: "grey",
    cursor: "pointer"
  },
  controlsLeft: {
    width: "50%"
  },
  checkBoxes: {
    title: {
      marginTop: "20px",
      fontWeight: "700",
      fontSize: "14px"
    },
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "20px"
  }
}

class NewsSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourcesList: null,
      filteredList: null,
      categories: [],
      language: [],
      checkboxChecked: [],
    }
  }


  async componentDidMount () {
    const sourcesResp = await fetch("https://newsapi.org/v2/sources?apiKey=cac7992187f24fc493e8b132bee398bb")
    const sources = await sourcesResp.json()
    this.setState({
      sourcesList: sources.sources,
      filteredList: sources.sources
    })
    this.getLanguage()
    this.getCategories()
  }

  getLanguage = () => {
    const languageArr = []
    this.state.sourcesList.forEach(src => {
      if (languageArr.indexOf(src.language) === -1) {
        languageArr.push(src.language)
      }
    })
    this.setState({language: languageArr})

  }

  getCategories = () => {
    const categoryArr = []
    this.state.sourcesList.forEach(src => {
      if (categoryArr.indexOf(src.category) === -1) {
        categoryArr.push(src.category)
      }
    })
    this.setState({
      categories: categoryArr,
      checkboxChecked: categoryArr
    })

  }

  handleCheckBox = (event) => {
    console.log(event.target.id)
    const tempArr = [...this.state.checkboxChecked]
    const target = event.target
    const name = target.id
    // document.getElementById(name).classList.add("bounce")

    if (this.state.checkboxChecked.indexOf(name) === -1){
      this.setState({
        checkboxChecked: [...tempArr, name]
      })
    } else {
      const filtered = tempArr.filter(cat => name !== cat)
      this.setState({
        checkboxChecked: filtered
      })
    } 

    // const filteredSources = this.state.sourcesList.filter(src => {
    //   return src.category.toLowerCase() === name
    // })
    // if () {
    //   this.setState({filteredList: filteredSources})
    // } else {
    //   this.setState({filteredList: this.state.filteredList})
    // }
   
  }



  filterSources = (input) => {
    const filteredSources = this.state.sourcesList.filter(src => {
      return src.name.toLowerCase().includes(input.toLowerCase())
    })
    if (input) {
      this.setState({filteredList: filteredSources})
    } else {
      this.setState({filteredList: this.state.filteredList})
    }
  }

  render() {
    return (
      <div className="settings invisible" id="news-settings" style={styles.settings}>
        <div className="settings-name">{this.props.type}</div>
        <div className="control-left" style={styles.controlsLeft}>
          <BasicInput filterSources={this.filterSources}/>
          <div style={styles.checkBoxes.title}>Filter by category</div>
          <div className="checkboxes" style={styles.checkBoxes}>
            {this.state.categories.map(cat =>{
              return (
                <div key={cat}>
                  { this.state.checkboxChecked.indexOf(cat) > -1 &&
                   <i className="fas fa-check-circle checkbox" id={cat} 
                     onClick={this.handleCheckBox} style={styles.icon}></i>
                  || <i className="far fa-circle checkbox" id ={cat} 
                    onClick={this.handleCheckBox} style={styles.icon}></i> 
                  }
                  <div style={{textTransform: "capitalize"}}>
                    {cat}
                  </div>
                </div>
              )
            })}
          </div>
          <MultiSelect sources={this.state.filteredList} />
        </div>
        <div>

          {/* <div>
            { !this.state.all &&
                <i className="fas fa-check-circle" id={"all"} onClick={this.handleCheckBox}></i>
                ||  <i className="far fa-circle" id ={"all"} onClick={this.handleCheckBox}></i> 
            }
            All 
          </div>*/}

       
          
        </div>
        <i className="fas fa-cog" 
          onClick={ () => this.props.settingsClick(this.props.type) } 
          style={styles.icon}>
        </i>
        <i className="far fa-circle" style={{fontSize: "0px"}}/>
      </div> 
    )
  }
}

// NewsSettings.propTypes = {
//   prop: PropTypes.array,
// }

export default NewsSettings;