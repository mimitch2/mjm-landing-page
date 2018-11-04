import React, { Component } from 'react'
import Moment from 'react-moment';
import * as moment from 'moment'
// import SportsGames from './SportsGames'
// import PropTypes from 'prop-types'
// import keys from "../config.js"
// require('dotenv').config()
import { firstSecond, removeLeadingZero } from "./Common"

import './Sports.scss'


const styles ={
  teamLine: {
    display: "flex",
    // alignItems: "center",
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
    // marginBottom: "10px"
  },
  statsAndGames: {
    marginLeft: "30px",
    // display: "flex",
    // justifyContent: "flex-start"
  },
  // tableRows: {
  //   width: '250px',
  //   marginBottom: "12px"
  // },
  nextGameWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  nextGame: {
    display: "flex",
    flexDirection: "column"
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
    if (prevProps.userData.sports.teams !== this.props.userData.sports.teams) {
      this.props.parseTeamInfo(this.props.userData.sports.teams)
    }
    // if (prevProps.sportsData !== this.props.sportsData) {
    //   this.setState({...this.props.sportsData, loaded: true})
    //   this.props.sportsDataLoaded(true)
    // }
  }

  findGamesByDate (games) {
    const formatedDate = moment(Date.now()).format('MMDDYYYY')
    // const exactTime = moment(Date.now()).format('MMDDYYYYhhmm')

    const findNext =  games.find(gm => {
      return gm.schedule.playedStatus === "LIVE" ||
             gm.schedule.playedStatus === "UNPLAYED"
    })

  
    const gameIndex =  games.indexOf(findNext)
    const prevGame =  gameIndex !== 0 ? games[gameIndex - 1] : null // FIX NEED TO ACCOUNT FOR LIVE GAMES 
    // const prevGame = formated ? formated : games[ prevGameIndex ] 

    const findCurrent = games.find(gm => moment(gm.schedule.startTime).format('MMDDYYYY') === formatedDate) 
    const currentGame = findCurrent ? findCurrent : null
   
    // const findNext = games.find(gm => gm.schedule.playedStatus === "UNPLAYED" ) 
    const nextGame = findNext ? findNext : null

    return {
      prevGame: prevGame, 
      currentGame: currentGame, 
      nextGame: nextGame
    }
  }

  returnTeamLogo = (league, team) => {
    const logo = this.props.teamsList[league].find(tm => tm.strTeamShort === team)
    if (logo) {
      return logo.strTeamBadge
    }
    return null
  }

  render() {

    if (this.props.sportsDataLoaded)  { 
      const { teams, standings:rankings } = this.props.sportsData
      return (
        <div className="sports">
          {teams.map((team, i) => {
            // const { stats } = team.stats.teamStatsTotals[0]
            // const { gamesPlayed, standings } = stats
            const ranking = rankings[team.info.strLeague].teams.find(tm => tm.team.abbreviation === team.info.strTeamShort)
            const { rank, divisionName } = ranking.divisionRank   
            const { stats } = ranking
            const gameList = this.findGamesByDate(team.games.games)

            const nameRank = (
              <div className="name-and-rank">  
                {team.info.strTeam}
                <span style={{marginLeft: "8px", fontSize: "14px", fontWeight: "300"}}>
                  { `${rank}${firstSecond(rank)} - ${divisionName}` }
                </span>
              </div>
            )

            return (
              <div className="team-line" key={i}>

                {(team.info.strLeague === "NHL" &&
                  <div className="team">
                    <div className="logo-and-stats">
                      <div className="team-logo">
                        <img src={team.info.strTeamBadge} width="60px" height ="60px" alt="Team Logo"/>
                      </div>
                      <div>       
                        {nameRank}
                        <table className="stats-table">
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
                        </table>
                      </div>
                    </div>
                  
                    {/* ************************** PREVIOUS GAME ********************* */}

                    <div className="game-entry">
                      <div style={{display: "flex"}}>
                        <div className="last-game-title" 
                          style={{fontSize: "14px", marginRight: "5px", fontWeight: "400"}}>
                        Last Game
                        </div>
                        <Moment format="ddd, MMM Do h:mma" style={{fontSize: "12px"}}>
                          {gameList.prevGame.schedule.startTime}
                        </Moment>
                      </div>
                      <table>
                        <tbody>
                          <tr>
                            <th></th>
                            <th>1rst</th>
                            <th>2nd</th>
                            <th>3rd</th>
                            <th>OT</th>
                            {gameList.prevGame.score.periods[4] && <th>SO</th>}
                            <th>
                              {(gameList.prevGame.score.periods[3] && 
                                `Final/OT`) || `Final`}
                            </th>
                          </tr>
                          <tr>
                            <td className="team-score-logo">
                              <img 
                                src={this.returnTeamLogo("nhl", gameList.prevGame.schedule.homeTeam.abbreviation)} 
                                width="20px" height ="20px" alt="" style={{marginRight: "3px"}}
                              />
                              {gameList.prevGame.schedule.homeTeam.abbreviation}
                            </td>
                            <td>
                              {gameList.prevGame.score.periods[0].homeScore}
                            </td>
                            <td>
                              {gameList.prevGame.score.periods[1].homeScore}
                            </td>
                            <td>
                              {gameList.prevGame.score.periods[2].homeScore}
                            </td>
                            <td>
                              {(gameList.prevGame.score.periods[3] && gameList.prevGame.score.periods[3].homeScore) || null}
                            </td>
                            {gameList.prevGame.score.periods[4] && 
                              <td>
                                {gameList.prevGame.score.periods[4].homeScore}
                              </td>
                            }
                            <td>
                              {gameList.prevGame.score.homeScoreTotal}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src={this.returnTeamLogo("nhl", gameList.prevGame.schedule.awayTeam.abbreviation)} 
                                width="20px" height ="20px" alt="" style={{marginRight: "3px"}}/>
                              {gameList.prevGame.schedule.awayTeam.abbreviation} 
                            </td>

                            <td>
                              {gameList.prevGame.score.periods[0].awayScore}
                            </td>
                            <td>
                              {gameList.prevGame.score.periods[1].awayScore}
                            </td>
                            <td>
                              {gameList.prevGame.score.periods[2].awayScore}
                            </td>
                            <td>
                              {(gameList.prevGame.score.periods[3] &&  gameList.prevGame.score.periods[3].awayScore) || null}
                            </td>
                            {gameList.prevGame.score.periods[4] && 
                              <td>
                                {gameList.prevGame.score.periods[4].awayScore}
                              </td>
                            }
                            <td>{gameList.prevGame.score.awayScoreTotal}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
 
                    {/* ************************** NEXT GAME  ********************* */}

                    <div className="next-game-title" >
                      <span style={{fontSize: "14px", marginRight: "5px", fontWeight: "400"}}>Next Game</span>
                      <Moment format="ddd, MMM Do h:mma" style={{fontSize: "12px"}}>
                        {gameList.nextGame.schedule.startTime}
                      </Moment>
                      <div className="next-game-wrapper">
                        <div style={styles.nextGame}>
                            HOME
                          <div>
                            <img src={this.returnTeamLogo("nhl", gameList.nextGame.schedule.homeTeam.abbreviation)} 
                              width="40px" height ="40px" alt="" style={{marginRight: "3px"}}/>
                          </div>
                          <div>
                            {gameList.nextGame.schedule.homeTeam.abbreviation}
                          </div>
                        </div>
                        <div style={{fontSize: "26px", fontWeight: "400"}}> VS </div>
                        <div style={styles.nextGame}>
                            AWAY
                          <div>
                            <img src={this.returnTeamLogo("nhl", gameList.nextGame.schedule.awayTeam.abbreviation)} 
                              width="40px" height ="40px" alt="" style={{marginRight: "3px"}}/>
                          </div>
                          <div>
                            {gameList.nextGame.schedule.awayTeam.abbreviation}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                )

                
                  || (team.info.strLeague === "NFL" &&
                  <div>
                    <div className="team">
                      {nameRank}
                      <table className="stats-table">
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
                      </table>
                    </div>


                    <span style={{fontSize: "14px", marginRight: "5px", fontWeight: "400"}}>Last Game</span>
                    <Moment format="ddd, MMM Do h:mma" style={{fontSize: "12px"}}>
                      {gameList.prevGame.schedule.startTime}
                    </Moment>
                    <table>
                      <tbody>
                        <tr>
                          <th></th>
                          <th>1rst</th>
                          <th>2nd</th>
                          <th>3rd</th>
                          <th>4th</th>
                          <th>OT</th>
                          <th>{(gameList.prevGame.score.quarters[4] && `Final/OT`) || `Final`}</th>
                        </tr>
                        <tr>
                          <td>
                            <img src={this.returnTeamLogo("nfl", gameList.prevGame.schedule.homeTeam.abbreviation)} 
                              width="20px" height ="20px" alt="" style={{marginRight: "3px"}}/>
                            {gameList.prevGame.schedule.homeTeam.abbreviation}
                          </td>
                          <td>
                            {gameList.prevGame.score.quarters[0].homeScore}
                          </td>
                          <td>
                            {gameList.prevGame.score.quarters[1].homeScore}
                          </td>
                          <td>
                            {gameList.prevGame.score.quarters[2].homeScore}
                          </td>
                          <td>
                            {gameList.prevGame.score.quarters[3].homeScore}
                          </td>
                          {(gameList.prevGame.score.quarters[4] && 
                            <td>
                              {gameList.prevGame.score.quarters[4].homeScore}
                            </td>)
                              || 
                              <td>-</td>
                          }
                          <td>
                            {gameList.prevGame.score.homeScoreTotal}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img src={this.returnTeamLogo("nfl", gameList.prevGame.schedule.awayTeam.abbreviation)} 
                              width="20px" height ="20px" alt="" style={{marginRight: "3px"}}/>
                            {gameList.prevGame.schedule.awayTeam.abbreviation} 
                          </td>

                          <td>
                            {gameList.prevGame.score.quarters[0].awayScore}
                          </td>
                          <td>
                            {gameList.prevGame.score.quarters[1].awayScore}
                          </td>
                          <td>
                            {gameList.prevGame.score.quarters[2].awayScore}
                          </td>
                          <td>
                            {gameList.prevGame.score.quarters[3].awayScore}
                          </td>
                          {(gameList.prevGame.score.quarters[4] && 
                            <td>
                              {gameList.prevGame.score.quarters[4].awayScore}
                            </td>)
                              || <td>-</td>
                          }
                          <td>{gameList.prevGame.score.awayScoreTotal}</td>
                        </tr>
                      </tbody>
                    </table>


                    <div>
                      <span style={{fontSize: "14px", marginRight: "5px", fontWeight: "400"}}>Next Game</span>
                      <Moment format="ddd, MMM Do h:mma" style={{fontSize: "12px"}}>
                        {gameList.nextGame.schedule.startTime}
                      </Moment>
                      <div style={styles.nextGameWrapper}>
                        <div style={styles.nextGame}>
                            HOME

                          <div>
                            <img src={this.returnTeamLogo("nfl", gameList.nextGame.schedule.homeTeam.abbreviation)} 
                              width="40px" height ="40px" alt="" style={{marginRight: "3px"}}/>
                          </div>
                          <div>
                            {gameList.nextGame.schedule.homeTeam.abbreviation}
                          </div>
                        </div>
                        <div> VS </div>
                        <div style={styles.nextGame}>
                            AWAY
                          <div>
                                
                            <img src={this.returnTeamLogo("nfl", gameList.nextGame.schedule.awayTeam.abbreviation)} 
                              width="40px" height ="40px" alt="" style={{marginRight: "3px"}}/>
                          </div>
                          <div>
                            {gameList.nextGame.schedule.awayTeam.abbreviation}
                          </div>
                        </div>
                      </div> 
                    </div>

                  </div>)

                  || (team.info.strLeague === "NBA" &&
                    <div className="team">
                      <div className="logo-and-stats">
                        <div className="team-logo">
                          <img src={team.info.strTeamBadge} width="60px" height ="60px" alt="Team Logo"/>
                        </div>
                        <div> 
                          {nameRank}
                          <table className="stats-table">
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
                          </table>
                        </div>
                      </div>

                      <span style={{fontSize: "14px", marginRight: "5px", fontWeight: "400"}}>Last Game</span>
                      <Moment format="ddd, MMM Do h:mma" style={{fontSize: "12px"}}>
                        {gameList.prevGame.schedule.startTime}
                      </Moment>
                      <table>
                        <tbody>
                          <tr>
                            <th></th>
                            <th>1rst</th>
                            <th>2nd</th>
                            <th>3rd</th>
                            <th>4th</th>
                            <th>OT</th>
                            <th>{(gameList.prevGame.score.quarters[4] && `Final/OT`) || `Final`}</th>
                          </tr>
                          <tr>
                            <td>
                              <img src={this.returnTeamLogo("nba", gameList.prevGame.schedule.homeTeam.abbreviation)} 
                                width="20px" height ="20px" alt="" style={{marginRight: "3px"}}/>
                              {gameList.prevGame.schedule.homeTeam.abbreviation}
                            </td>
                            <td>
                              {gameList.prevGame.score.quarters[0].homeScore}
                            </td>
                            <td>
                              {gameList.prevGame.score.quarters[1].homeScore}
                            </td>
                            <td>
                              {gameList.prevGame.score.quarters[2].homeScore}
                            </td>
                            <td>
                              {gameList.prevGame.score.quarters[3].homeScore}
                            </td>
                            {(gameList.prevGame.score.quarters[4] && 
                            <td>
                              {gameList.prevGame.score.quarters[4].homeScore}
                            </td>)
                              || 
                              <td>-</td>
                            }
                            <td>
                              {gameList.prevGame.score.homeScoreTotal}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src={this.returnTeamLogo("nba", gameList.prevGame.schedule.awayTeam.abbreviation)} 
                                width="20px" height ="20px" alt="" style={{marginRight: "3px"}}/>
                              {gameList.prevGame.schedule.awayTeam.abbreviation} 
                            </td>

                            <td>
                              {gameList.prevGame.score.quarters[0].awayScore}
                            </td>
                            <td>
                              {gameList.prevGame.score.quarters[1].awayScore}
                            </td>
                            <td>
                              {gameList.prevGame.score.quarters[2].awayScore}
                            </td>
                            <td>
                              {gameList.prevGame.score.quarters[3].awayScore}
                            </td>
                            {(gameList.prevGame.score.quarters[4] && 
                            <td>
                              {gameList.prevGame.score.quarters[4].awayScore}
                            </td>)
                              || <td>-</td>
                            }
                            <td>{gameList.prevGame.score.awayScoreTotal}</td>
                          </tr>
                        </tbody>
                      </table>


                      <div>
                        <span style={{fontSize: "14px", marginRight: "5px", fontWeight: "400"}}>Next Game</span>
                        <Moment format="ddd, MMM Do h:mma" style={{fontSize: "12px"}}>
                          {gameList.nextGame.schedule.startTime}
                        </Moment>
                        <div style={styles.nextGameWrapper}>
                          <div style={styles.nextGame}>
                            HOME

                            <div>
                              <img src={this.returnTeamLogo("nba", gameList.nextGame.schedule.homeTeam.abbreviation)} 
                                width="40px" height ="40px" alt="" style={{marginRight: "3px"}}/>
                            </div>
                            <div>
                              {gameList.nextGame.schedule.homeTeam.abbreviation}
                            </div>
                          </div>
                          <div> VS </div>
                          <div style={styles.nextGame}>
                            AWAY
                            <div>
                                
                              <img src={this.returnTeamLogo("nba", gameList.nextGame.schedule.awayTeam.abbreviation)} 
                                width="40px" height ="40px" alt="" style={{marginRight: "3px"}}/>
                            </div>
                            <div>
                              {gameList.nextGame.schedule.awayTeam.abbreviation}
                            </div>
                          </div>
                        </div> 
                      </div>
                    </div> 
                  )
                  || (team.info.strLeague === "MLB" &&
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
                            <td>{stats.gamesPlayed}</td> 
                            <td>{stats.standings.wins}</td>
                            <td>{stats.standings.losses}</td>
                            <td>{stats.standings.gamesBack}</td>
                            <td>{removeLeadingZero(stats.standings.winPct)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>)
                }
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