import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import BasicInput from './BasicInput'
import {sortAlpha} from './Common'

import './NewsSettings.scss'


class NewsSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourcesList: null,
      filteredList: null,
      categories: [],
      // language: [],
      checkboxChecked: [],
      userSources: [],
      searchInput: ""
    }
  }


  async componentDidMount () {
    const sourcesResp = await fetch("https://newsapi.org/v2/sources?apiKey=cac7992187f24fc493e8b132bee398bb")
    const sources = await sourcesResp.json()
    const sourcesArr = await sources.sources
    
    if (sourcesArr) { //********* FIX need to set state for when  */
      this.setState({
        sourcesList: sourcesArr,
        filteredList: sourcesArr,
        userSources: this.props.userData.news.sources
      })
      this.getCategories()
      const tempArr = await sourcesArr.filter(src => { 
        const userIds = this.state.userSources.map(usrSrc => usrSrc.id)
        return !userIds.includes(src.id)
      })
      this.setState({filteredList: tempArr})
    }
    
  }

  loadDefaults = () => {
    this.setState({
      sourcesList: this.props.defaultData.news.sources,
      filteredList: this.props.defaultData.news.sources,
      userSources: this.props.userData.news.sources
    })
  }

  componentDidUpdate = (prevProps) => { 
    if (prevProps.userData!== this.props.userData) {
      this.setState({
        userSources: this.props.userData.news.sources,
      })
    }

    // if (prevProps.defaultData !== this.props.defaultData) {
    //   this.loadDefaults()
    // }
  }

  // getLanguage = () => {
  //   const languageArr = []
  //   this.state.sourcesList.forEach(src => {
  //     if (languageArr.indexOf(src.language) === -1) {
  //       languageArr.push(src.language)
  //     }
  //   })
  //   this.setState({language: languageArr})
  // }

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

  handleAdd = (item) => {
    const userSources = [...this.state.userSources, item]
    const sortedUserSources = sortAlpha(userSources)
    const tempArr = this.state.filteredList.filter(itm => {
      return itm.name !== item.name
    })
    this.setState({
      userSources: sortedUserSources,
      filteredList: tempArr
    })
  }

  hanndleRemove = (item) => {
    const newsSources = [...this.state.filteredList, item]
    const sortedList = sortAlpha(newsSources)
    const userSources = this.state.userSources.filter(itm => {
      return itm.name !== item.name
    })
    this.setState({
      userSources: userSources,
      filteredList: sortedList
    })
  }

  handleSubmit = (type, button) => { //need to set condition by which we have choices, but they have not changed
    const closeDelay = 150

    const el = document.getElementById(button)

    this.buttonBounce(el, 40)

    if (this.state.userSources.length > 0 && button === "submit") {

      const newData = this.props.userData
      newData.news.sources = this.state.userSources

      this.props.updateUserData(newData, this.props.userName)

      setTimeout(() => {
        this.props.loadUserData(this.props.userName)
      }, closeDelay);

    }

    if (button === "cancel") {
      setTimeout(() => {
        this.setState({userSources: this.props.userData.news.sources})
      }, closeDelay);
     
    }
    
    setTimeout(() => {
      this.props.settingsClick(type)
    }, closeDelay);

  }

  buttonBounce = (el, time) => {
    el.style.transition = ".06s"
    el.style.transform = "scale(.95)"
    setTimeout(() => {
      el.style.transition = ".1s"
      el.style.transform = "scale(1)"
    }, time);
  }

  takeInput = (input) => {
    this.setState({searchInput: input})
    this.filterSources()
  }

  filterSources = () => {
    const { searchInput, sourcesList, checkboxChecked, userSources, categories } =  this.state
    if (searchInput || checkboxChecked.length < categories.length) {
      const filteredSources = sourcesList.filter(src => {
        const userIds = userSources.map(usrSrc => usrSrc.id)
        return src.name.toLowerCase().includes(searchInput.toLowerCase()) && checkboxChecked.indexOf(src.category) !== -1 && !userIds.includes(src.id)
      })
      this.setState({filteredList: filteredSources})
    } else {
      const noUserSources = sourcesList.filter(src => { 
        const userIds = userSources.map(usrSrc => usrSrc.id)
        return !userIds.includes(src.id)
      })
      this.setState({filteredList: noUserSources})
    }
  }

  handleCheckBox = (event) => {
    const target = event.target
    const name = target.id
    const el = document.getElementById(name)

    this.buttonBounce(el, 40)

    setTimeout(() => {
      const tempArr = [...this.state.checkboxChecked]
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
      this.filterSources()
    }, 50);

  }

  render() {
    return (
      <div className="settings invisible" id="news-settings">
        <div className="settings-name">{this.props.type}</div>

        <div className="settings-wrapper">

          <div className="left-list">
            <BasicInput 
              sendInput={this.takeInput}
              placeholder="Search news sources..."
            />
            <div className="checkboxes-titles">
            Filter by category
            </div>
            <div className="checkboxes">
              {this.state.categories.map(cat =>{
                return (
                  <div key={cat}>
                    { (this.state.checkboxChecked.indexOf(cat) > -1 &&
                   <i className="fas fa-check-circle checkbox" 
                     id={cat} 
                     onClick={this.handleCheckBox} 
                     style={{color: "green"}}>
                   </i>)
                  || 
                  <i className="far fa-circle checkbox" 
                    id ={cat} 
                    onClick={this.handleCheckBox}>
                  </i> 
                    }
                    <div style={{textTransform: "capitalize"}}>
                      {cat}
                    </div>
                  </div>
                )
              })}
             
            </div>

            <div>News Sources</div>

            <div className ="settings-list-container">
              { this.state.filteredList &&
                this.state.filteredList.map((source, i) => {
                  return (
                    <div className="list-item" key={i}>
                      <div style={{display: "flex"}}>
                        <img src={`https://icon-locator.herokuapp.com/icon?url=${source.url}&size=70..120..200`} alt="" height="24px" 
                          style={{margin: "0px 4px 0px 4px", borderRadius: "50%"}}/>
                        <div className="list-item-name">{source.name}</div>
                        <div style={{marginLeft: "3px", textTransform: "capitalize", fontStyle: "italic", color: "grey"}}>{`  - ${source.category}`}</div>
                      </div>
                      <i className="fas fa-plus-circle" style={{color: "green", cursor: "pointer"}}
                        onClick={() => this.handleAdd(source)}></i>
                    </div>
                  )
                })
              } 
            </div>
          </div>

          
          <div className="right-list-wrapper">
            
            <div className="right-list-heading">Your Sources</div>

            <div className="right-list">
              {this.state.userSources &&
                 this.state.userSources.map((source, i) => {
                   return ( 
                     <div className="right-list-item" key={source.name}>
                       <i className="fas fa-minus-circle" style={{color: "red", marginRight:"4px", cursor: "pointer"}}
                         onClick={() => this.hanndleRemove(source)}
                       ></i>
                       <img src={`https://icon-locator.herokuapp.com/icon?url=${source.url}&size=70..120..200`} alt="" width="24px" style={{margin: "0px 4px 0px 4px", borderRadius: "50%"}}/>
                       <div>{source.name}</div>
                     </div>
                   )
                 })
              } 
            </div>
          </div>
        </div>
       
        <div>
          <div className="button-group">
            <i className="fas fa-times-circle bottom-icons"
              id="cancel" 
              style={{color: "red"}}
              onClick={() => this.handleSubmit(this.props.type, "cancel")}
            ></i>
            {/* <i className="fas fa-question" style={{fontSize: "20px"}}></i> */}
            <i className="fas fa-check-circle bottom-icons" 
              id="submit"
              style={{color: "green"}}
              onClick={() => this.handleSubmit(this.props.type, "submit")}></i>
            {/* <Button label="Cancel"
              height="auto"
              width="60px"
              background="red"
              color="white"
              click={this.handleSubmit}
              clickInfo={this.props.type}
              button="cancel"
            />
            <Button label="Submit"
              height="auto"
              width="60px"
              background="grey"
              color="white"
              click={this.handleSubmit}
              clickInfo={this.props.type}
              button="submit"
            /> */}
          </div>
          <i className="far fa-circle" style={{fontSize: "0px"}}/>
        </div>
      </div> 
    )
  }
}

// NewsSettings.propTypes = {
//   prop: PropTypes.array,
// }

export default NewsSettings;