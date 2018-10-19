import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import keys from "../config.js"
// require('dotenv').config()

const styles ={
  teamLine: {
    display: "flex",
    alignItems: "center"
  },
  item: {
    marginLeft: "2px",
    marginRight: "2px"
  }
}

class Sports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
  }

  componentDidMount = () => {
    this.props.parseTeamInfo(this.props.userData.sports.teams)
  }

  componentDidUpdate = prevProps => {
    if (prevProps.userData !== this.props.userData) {
      this.setState({
        loaded: false
      })
      this.props.parseTeamInfo(this.props.userData.sports.teams)
    }
    if (prevProps.sportsData !== this.props.sportsData) {
      this.setState({...this.props.sportsData, loaded: true})
    }
  }

  returnWinLoss (league, tm) {
    const lg = this.state[league]
    const standing = lg.standings.teams.filter(stand => {
      return  stand.team.abbreviation === tm 
    })
  
    const { divisionRank:rank } = standing[0]
    const { standings:stats } = standing[0].stats

    if (league === "NHL") {
      return {w: stats.wins, l: stats.losses, otw: stats.overtimeWins, otl: stats.overtimeLosses, points: stats.points, rank: rank.rank, div: rank.divisionName, gb: stats.gamesBack}
    } else if (league === "NFL") {
      return {w: stats.wins, l: stats.losses, otw: stats.otWins, t: stats.ties, rank: rank.rank, div: rank.divisionName, gb: stats.gamesBack}
    } else if (league === "NBA") {
      return {w: stats.wins, l: stats.losses, rank: rank.rank, div: rank.divisionName, gb: stats.gamesBack}
    } else if (league === "MLB") {
      return {w: stats.wins, l: stats.losses, pct: stats.winPct, rank: rank.rank, div: rank.divisionName, gb: stats.gamesBack}
    } 
    return {}
  }

  render() {
    const { loaded } = this.state
    const { teams } = this.props.userData.sports
    if (loaded && teams)  {
      return (
        <div className="sports">
          {teams.map((team, i) => {
            const teamData = this.returnWinLoss(team.strLeague, team.strTeamShort)
            return (
              <div style={styles.teamLine} key={i}>
                <img src={team.strTeamBadge} width="30px" height ="30px" alt=""/>
                <div className="team-name item" style={styles.item}>           
                  {team.strTeam}
                </div>
               
                <div key={i}> 
                  {(team.strLeague === "NHL" &&
                  <div>
                    {`${teamData.w} - ${teamData.l}`}
                  </div>)
                  || (team.strLeague === "NFL" &&
                  <div>
                    {`${teamData.w} - ${teamData.l}`}
                  </div>)
                  || (team.strLeague === "NBA" &&
                  <div>
                    {`${teamData.w} - ${teamData.l}`}
                  </div>)
                  || (team.strLeague === "MLB" &&
                  <div>
                    {`${teamData.w} - ${teamData.l}`}
                  </div>)
                  }
                </div>
              
              </div>
            )
          })}
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

// Sports.propTypes = {
//   prop: PropTypes.array,
// }

export default Sports;