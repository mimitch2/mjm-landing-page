import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import keys from "../config.js"
// require('dotenv').config()
import { firstSecond, removeLeadingZero } from "./Common"

const styles ={
  teamLine: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid grey",
    padding: "6px 0px 6px 0px"
  },
  logoName: {
    display: "flex",
    flexDirection: "column"
  },
  item: {
    fontSize: "20px",
    fontWeight: "400",
    textAlign: "left" 
  },
  winLossWrapper: {
    marginLeft: "30px"
  },
  tableRows: {
    width: '250px',
  },

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
     
    const { divisionRank:rank, } = standing[0]
    const { standings, gamesPlayed } = standing[0].stats
    
    if (league === "NHL") {
      return {
        w: standings.wins, 
        l: standings.losses, 
        otw: standings.overtimeWins, 
        otl: standings.overtimeLosses, 
        points: standings.points, 
        gp: gamesPlayed, 
        rank: rank.rank, 
        div: rank.divisionName, 
        gb: standings.gamesBack
      }
    } else if (league === "NFL") {
      return {w: standings.wins, l: standings.losses, otw: standings.otWins, t: standings.ties, gp: gamesPlayed, rank: rank.rank, div: rank.divisionName, gb: standings.gamesBack}
    } else if (league === "NBA") {
      return {w: standings.wins, l: standings.losses, gp: gamesPlayed, rank: rank.rank, div: rank.divisionName, gb: standings.gamesBack}
    } else if (league === "MLB") {
      return {w: standings.wins, l: standings.losses, pct: standings.winPct, gp: gamesPlayed, rank: rank.rank, div: rank.divisionName, gb: standings.gamesBack}
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

            const nameRank = (
              <div style={styles.item}>  
                {team.strTeam}
                <span style={{marginLeft: "8px", fontSize: "14px", fontWeight: "300"}}>
                  { `${teamData.rank}${firstSecond(teamData.rank)} - ${teamData.div}` }
                </span>
              </div>
            )

            return (
              <div style={styles.teamLine} key={i}>
                <div style={styles.logoName}>
                  <img src={team.strTeamBadge} width="60px" height ="60px" alt=""/>
                </div>
                <div> 
                  {(team.strLeague === "NHL" &&
                  <div>
                    <div style={styles.winLossWrapper}>       
                      {nameRank}
                      <table style={styles.tableRows}>
                        <tbody>
                          <tr>
                            <th>GP</th>
                            <th>W</th>
                            <th>L</th>
                            <th>OTW</th>
                            <th>OTL</th>
                            <th>PTS</th>
                          </tr>
                          <tr>
                            <td>{teamData.gp}</td>
                            <td>{teamData.w}</td>
                            <td>{teamData.l}</td>
                            <td>{teamData.otw}</td>
                            <td>{teamData.otl}</td>
                            <td>{teamData.points}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div>GAMES</div>
                    </div>
                  </div>)
                  || (team.strLeague === "NFL" &&
                  <div>
                    <div style={styles.winLossWrapper}>
                      {nameRank}
                      <table style={styles.tableRows}>
                        <tbody>
                          <tr>
                            <th>GP</th>
                            <th>W</th>
                            <th>L</th>
                            <th>T</th>
                            <th>-</th>
                            <th>-</th>
                            <th>-</th>
                          </tr>
                          <tr>
                            <td>{teamData.gp}</td>
                            <td>{teamData.w}</td>
                            <td>{teamData.l}</td>
                            <td>{teamData.t}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>)
                  || (team.strLeague === "NBA" &&
                  <div>
                    <div style={styles.winLossWrapper}>
                      {nameRank}
                      <table style={styles.tableRows}>
                        <tbody>
                          <tr>
                            <th>GP</th>
                            <th>W</th>
                            <th>L</th>
                            <th>GB</th>
                            <th>-</th>
                            <th>-</th>
                            <th>-</th>
                          </tr>
                          <tr>
                            <td>{teamData.gp}</td>
                            <td>{teamData.w}</td>
                            <td>{teamData.l}</td>
                            <td>{teamData.gb}</td>
                      
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>)
                  || (team.strLeague === "MLB" &&
                  <div>
                    <div style={styles.winLossWrapper}>
                      {nameRank}
                      <table style={styles.tableRows}>
                        <tbody>
                          <tr>
                            <th>GP</th>
                            <th>W</th>
                            <th>L</th>
                            <th>GB</th>
                            <th>PCT</th>
                            <th>-</th>
                            <th>-</th>
                          </tr>
                          <tr>
                            <td>{teamData.gp}</td>
                            <td>{teamData.w}</td>
                            <td>{teamData.l}</td>
                            <td>{teamData.gb}</td>
                            <td>{removeLeadingZero(teamData.pct)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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