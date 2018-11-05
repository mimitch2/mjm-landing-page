import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firstSecond, removeLeadingZero } from "./Common"


class SportsStats extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {

  //   }
  // }

  render() {
    const { team, rank, divisionName, stats } = this.props
   
    return (
      <div className="sports-stats">
        <div className="logo-and-stats">
          <div className="team-logo">
            <img src={team.info.strTeamBadge} width="60px" height ="60px" alt="Team Logo"/>
          </div>
          <div>       
            <div className="name-and-rank">  
              {team.info.strTeam}
              <span style={{marginLeft: "8px", fontSize: "14px", fontWeight: "300"}}>
                { `${rank}${firstSecond(rank)} - ${divisionName}` }
              </span>
            </div>
            <table className="stats-table">
              {(team.info.strLeague === "NHL" &&
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
                  <td>{stats.gamesPlayed}</td> 
                  <td>{stats.standings.wins}</td>
                  <td>{stats.standings.losses}</td>
                  <td>{stats.standings.overtimeWins}</td>
                  <td>{stats.standings.overtimeLosses}</td>
                  <td>{stats.standings.points}</td> 
                </tr>
              </tbody>
              ) ||  (team.info.strLeague === "NFL" &&
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
                <td>{stats.gamesPlayed}</td> 
                <td>{stats.standings.wins}</td>
                <td>{stats.standings.losses}</td>
                <td>{stats.standings.ties}</td>
              </tr>
            </tbody>
              ) || (team.info.strLeague === "NBA" &&
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
                <td>{stats.gamesPlayed}</td> 
                <td>{stats.standings.wins}</td>
                <td>{stats.standings.losses}</td>
                <td>{stats.standings.gamesBack}</td>
              </tr>
            </tbody>
              ) || (team.info.strLeague === "MLB" &&
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
                <td>{stats.gamesPlayed}</td> 
                <td>{stats.standings.wins}</td>
                <td>{stats.standings.losses}</td>
                <td>{stats.standings.gamesBack}</td>
                <td>{removeLeadingZero(stats.standings.winPct)}</td>
              </tr>
            </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    )
  }
}

SportsStats.propTypes = {
  prop: PropTypes.array,
}

export default SportsStats;