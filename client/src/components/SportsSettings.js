import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import BasicInput from './BasicInput'

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
  list: {
    fontSize: "18px",
    fontWeight: 300,
    height: "300px",
    maxHeight: "300px",
    overflowY: "auto"
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3px 10px 3px 10px"
  },
  buttons: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  controlsLeft: {
    width: "45%"
  },
  rightList: {
    fontSize: "18px",
    fontWeight: 300,
    height: "300px",
    maxHeight: "300px",
    overflowY: "auto",
    marginTop: "103px",
    width: "45%"
  },
  rightListItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "3px 10px 3px 10px"
  },
  icon: {
    fontSize: "40px",
    color: "grey",
    cursor: "pointer"
  },
  bottomIcons: {
    margin: "0px 12px 0px 12px",
    fontSize: "40px",
    cursor: "pointer",
    height: "60px"
  },
}

const leagueIcons = [
  {icon: "https://www.thesportsdb.com/images/media/league/badge/vxwtqq1421413200.png", 
    league: "NHL"},
  {icon: "https://www.thesportsdb.com/images/media/league/badge/trppxv1421413032.png", 
    league: "NFL"},
  {icon: "https://www.thesportsdb.com/images/media/league/badge/frdjqy1536585083.png", 
    league: "NBA"},
  {icon: "https://www.thesportsdb.com/images/media/league/badge/c5r83j1521893739.png", 
    league: "MLB"}
]
 

class SporstSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourcesList: null,
      filteredList: null,
      userTeams: null,
      input: ''
    }
  }

  componentDidMount = () => {
    this.buildTeamArray()
 
  }

  sortAlpha = (array) => {
    array.sort((a, b) => {
      if(a.strTeam < b.strTeam) return -1;
      if(a.strTeam > b.strTeam) return 1;
      return 0;
    })
    return array
  }

  buildTeamArray = () => {
    const { nhl, nfl, nba, mlb } = this.props.teamsList
    const teamArr = [...nhl, ...nfl, ...nba, ...mlb]
    const { teams } = this.props.userData.sports 

    const filterTeamArr = teamArr.filter(team => {
      const usrArr = teams.map(usrTeam => usrTeam.idTeam)
      return  !usrArr.includes(team.idTeam)
    })
    this.setState({
      sourcesList: this.sortAlpha(teamArr),
      filteredList: this.sortAlpha(filterTeamArr),
      userTeams: teams
    })
  }

  componentDidUpdate (prevProps) {
    if (prevProps.userData !== this.props.userData) {
      this.setState({
        userTeams: this.props.userData.sports.teams
      })
    }
  }

  addTeam = (team) => {
    const userTeams = [...this.state.userTeams, team]
    const tempArr = this.state.filteredList.filter(item => {
      return item.idTeam !== team.idTeam
    })
    this.setState({
      userTeams: userTeams,
      filteredList: tempArr
    })
  }

  removeTeam = (team) => {
    const tempTeams = [...this.state.filteredList, team]
    const sortedList = this.sortAlpha(tempTeams)
    const userTeams = this.state.userTeams.filter(item => {
      return item.idTeam !== team.idTeam
    })
    this.setState({
      userTeams: userTeams,
      filteredList: sortedList
    })
  }


  handleSubmit = (type, button, e ) => {
    const closeDelay = 150
    const el = document.getElementById(e.target.id)
    this.buttonBounce(el, 40)

    if ( button === "submit") {
      const newData = this.props.userData
      newData.sports.teams = [...this.state.userTeams]
      this.props.updateUserData(newData, this.props.userName)
      setTimeout(() => {
        this.props.loadUserData(this.props.userName)
      }, closeDelay);

    }

    if (button === "cancel") {
      setTimeout(() => {
        this.setState({userTeams: this.props.userData.sports.teams})
      }, closeDelay);
      this.buildTeamArray()
    }
    
    setTimeout(() => {
      this.props.settingsClick(type)
    }, closeDelay);
  }

  filterSources = (input) => {
    this.setState({input: input})
    const filteredSources = this.state.sourcesList.filter(src => {
      return src.strTeam.toLowerCase().includes(input.toLowerCase())
    })
    
    if (input) {
      this.setState({filteredList: this.sortAlpha(filteredSources)})
    } else {
      this.setState({filteredList: this.sortAlpha(this.state.filteredList)})
    }
   
  }

  buttonBounce = (el, time) => {
    el.style.transition = ".06s"
    el.style.transform = "scale(.95)"
    setTimeout(() => {
      el.style.transition = ".1s"
      el.style.transform = "scale(1)"
    }, time);
  }

  render() {
    if (this.state.filteredList) {
      return (
        <div className="settings invisible" id="sports-settings" style={styles.settings}>

          <div className="settings-name">{this.props.type}</div>

          <div style={styles.settingsWrapper}>

            <div className="control-left" style={styles.controlsLeft}>

              <BasicInput sendInput={this.filterSources} 
                placeholder="Search teams..."/>

              <div className="league-div" style={{display: "flex"}}>
                {leagueIcons.map(ico => {
                  return (
                    <div style={{width: "40px"}} key={ico.league}>
                      <img src={ico.icon} width="40px" height="40px"alt=""/>
                    </div>
                  )
                })}
              </div>

              <div>Available Teams</div>
              <div className="select-scroll" style={styles.list}>
                {this.state.filteredList.map((team, i) => {
                  return (
                    <div style={styles.listItem} key={i}>
                      <div >
                        <img src={team.strTeamBadge} width="24px" height="24px" alt="" style={{margin:"0px 4px 0px 4px"}} />
                        {`${team.strTeam} - ${team.strLeague}`}
                      </div>
                      <i className="fas fa-plus-circle" style={{color: "green", cursor: "pointer"}}
                        onClick={() => this.addTeam(team)}>
                      </i>
                    </div>
                  )
                })}
              </div>
            </div> 
            
            <div style={styles.rightList}>
              {this.state.userTeams.map((team, i) => {
                return (
                  <div key={i} >
                    <div style={styles.rightListItem}>
                  
                      <i className="fas fa-minus-circle" style={{color: "red", marginRight:"4px", cursor: "pointer"}}
                        onClick={() => this.removeTeam(team)}></i>
                      <div>
                        <img src={team.strTeamBadge} width="24px" height="24px" alt="" style={{margin:"0px 4px 0px 4px"}} />
                        {`${team.strTeam} - ${team.strLeague}`}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="button-group" style={styles.buttons}>
            <i className="fas fa-times-circle"
              id="weather-cancel" 
              style={{...styles.bottomIcons, color: "red"}}
              onClick={(e) => this.handleSubmit(this.props.type, "cancel", e)}
            ></i>
            <i className="fas fa-check-circle" 
              id="weather-submit"
              style={{...styles.bottomIcons, color: "green"}}
              onClick={(e) => this.handleSubmit(this.props.type, "submit", e)}></i>
          </div>
        </div>      
        
      )
    } else {
      return null;
    }
   
  }
}

SporstSettings.propTypes = {
  // prop: PropTypes.array,
}

export default SporstSettings;