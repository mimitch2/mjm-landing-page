import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firstSecond, removeLeadingZero } from "./Common"
import './SportsStats.scss'

class SportsStats extends Component {

  nhlStats = (stats) => {
    return (
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
    )
  }

  nflStats = (stats) => {
    return (
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
    )
  }

  nbaStats = (stats) => {
    return (
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
    )
  }

  mlbStats = (stats) => {
    return (
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
    )
  }

  render() {
    const { team, rank, divisionName, stats } = this.props
   
    return (
      <div className="sports-stats">
        <div className="name-and-rank">  
          <img src={team.info.strTeamBadge} width="42px" height ="42px" alt="Team Logo"/>
          <span className="team-name">
            {team.info.strTeam}
          </span>
          <span style={{marginLeft: "8px", fontSize: "14px", fontWeight: "300"}}>
            { `${rank}${firstSecond(rank)} - ${divisionName}` }
          </span>
        </div>
        <div className="stats-table">
          <table>
            {(team.info.strLeague === "NHL" &&
            this.nhlStats(stats)
            ) ||  (team.info.strLeague === "NFL" &&
            this.nflStats(stats)
            ) || (team.info.strLeague === "NBA" &&
            this.nbaStats(stats)
            ) || (team.info.strLeague === "MLB" &&
            this.mlbStats(stats)
            )}
          </table>
        </div>
      </div>
    )
  }
}

SportsStats.propTypes = {
  prop: PropTypes.array,
}

export default SportsStats;