import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import BasicInput from './BasicInput'
// import Button from './Button'
import MultiSelect from './MultiSelect'
import '../css/App.css'

const styles = {
  settings: {
    width: "100vw",
    padding: "0px 40px 0px 40px",
    position: "absolute",
    top: 85,
    left: 0
  },
  settingsWrapper: {
    display: "flex",
    justifyContent: "space-between",

  },
  checkIcons: {
    fontSize: "20px",
    cursor: "pointer",

  },
  buttons: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomIcons: {
    margin: "0px 12px 0px 12px",
    fontSize: "40px",
    cursor: "pointer",
    height: "60px"
  },
  controlsLeft: {
    width: "45%"
  },
  rightList: {
    marginTop: "165px",
    width: "45%"
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
    marginBottom: "20px",
    height: "60px"
  }
}

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
    this.setState({
      sourcesList: sourcesArr,
      filteredList: sourcesArr,
      userSources: this.props.userData.news.sources
    })
    this.getCategories()
    const tempArr = await sourcesArr.filter(src => { //refactor to own fucn
      const userIds = this.state.userSources.map(usrSrc => usrSrc.id)
      return !userIds.includes(src.id)
    })
    this.setState({filteredList: tempArr})
  }

  componentDidUpdate = (prevProps) => { 
    if (prevProps.userData!== this.props.userData) {
      this.setState({
        userSources: this.props.userData.news.sources,
      })
      // setTimeout(() => {
      //   const tempArr = this.state.sourcesList.filter(src => { //refactor to own fucn
      //     const userIds = this.state.userSources.map(usrSrc => usrSrc.id)
      //     return !userIds.includes(src.id)
      //   })
      //   this.setState({filteredList: tempArr})
      // }, 200);
   
    }
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
    const sortedUserSources = userSources.sort((a, b) => {
      if(a.id < b.id) return -1;
      if(a.id > b.id) return 1;
      return 0;
    })
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
    const sortedList = newsSources.sort((a, b) => {
      if(a.id < b.id) return -1;
      if(a.id > b.id) return 1;
      return 0;
    })
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

      // fetch(`api/data/${this.props.userName}`,{
      //   method: "PUT",
      //   headers: {"Content-Type": "application/json"},
      //   body: JSON.stringify(newData)
      // }).then(resp => {
      //   return resp.json()
      // })

      this.props.updateUserData(newData, this.props.userName)

      setTimeout(() => {
        this.props.loadUserData(this.props.userName)
        window.location="/"
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
    el.style.transform = "scale(.9)"
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
      const noUserSources = sourcesList.filter(src => { // refactor to own func along with one above
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
    // console.log(this.state.filteredList, this.state.checkboxChecked)
    return (
      <div className="settings invisible" id="news-settings" style={styles.settings}>
        <div className="settings-name">{this.props.type}</div>

        <div style={styles.settingsWrapper}>

          <div className="control-left" style={styles.controlsLeft}>
            <BasicInput sendInput={this.takeInput}/>
            <div style={styles.checkBoxes.title}>Filter by category</div>
            <div className="checkboxes" style={styles.checkBoxes}>
              {this.state.categories.map(cat =>{
                return (
                  <div key={cat}>
                    { this.state.checkboxChecked.indexOf(cat) > -1 &&
                   <i className="fas fa-check-circle checkbox" id={cat} 
                     onClick={this.handleCheckBox} style={{...styles.checkIcons, color: "green"}}></i>
                  || <i className="far fa-circle checkbox" id ={cat} 
                    onClick={this.handleCheckBox} style={styles.checkIcons}></i> 
                    }
                    <div style={{textTransform: "capitalize"}}>
                      {cat}
                    </div>
                  </div>
                )
              })}
            </div>
            <div>News Sources</div>
            <MultiSelect sources={this.state.filteredList} 
              add={this.handleAdd}
              type="add"/>
          </div>

          <div style={styles.rightList}>
            <div>Your Sources</div>
            <MultiSelect sources={this.state.userSources} 
              remove={this.hanndleRemove}
              type="remove"
            />
          </div>

        </div>
       
        <div>
          <div className="button-group" style={styles.buttons}>
            <i className="fas fa-times-circle"
              id="cancel" 
              style={{...styles.bottomIcons, color: "red"}}
              onClick={() => this.handleSubmit(this.props.type, "cancel")}
            ></i>
            {/* <i className="fas fa-question" style={{fontSize: "20px"}}></i> */}
            <i className="fas fa-check-circle" 
              id="submit"
              style={{...styles.bottomIcons, color: "green"}}
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