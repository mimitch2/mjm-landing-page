import React, { Component } from 'react'
import Moment from 'react-moment';
import * as moment from 'moment'
// import SportsGames from './SportsGames'
// import PropTypes from 'prop-types'
// import keys from "../config.js"
// require('dotenv').config()
import { firstSecond, removeLeadingZero } from "./Common"

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
    marginLeft: "30px"
  },
  tableRows: {
    width: '250px',
  },
  nextGameWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
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

  findGamesByDate (games) {
    const formatedDate = moment(Date.now()).format('MMDDYYYY')

    const findPrevious =  games.find(gm => moment(gm.schedule.startTime).format('MMDDYYYY') >= formatedDate )
    const prevGameIndex =  games.indexOf(findPrevious)
    const formated =  prevGameIndex !== -1 ? games[prevGameIndex].schedule : null
    const prevGame = moment(formated).format('MMDDYYYY') === formatedDate ? games[prevGameIndex - 1] : games[prevGameIndex] 

    const findCurrent = games.find(gm => moment(gm.schedule.startTime).format('MMDDYYYY') === formatedDate) 
    const currentGame = findCurrent ? findCurrent : null
   
    const findNext = games.find(gm => moment(gm.schedule.startTime).format('MMDDYYYY') > formatedDate ) 
    const nextGame = findNext ? findNext : null

    return {
      prevGame: prevGame, 
      currentGame: currentGame, 
      nextGame: nextGame
    }
  }

  returnTeamLogo = (league, team) => {
    const logo = this.props.teamsList[league].find(tm => tm.strTeamShort === team)
    return logo.strTeamBadge
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
            const { games } = this.state[team.strLeague][team.strTeamShort].games
            const teamData = this.returnWinLoss(team.strLeague, team.strTeamShort)
            const gameList = this.findGamesByDate(games)
            // const homeLogo = 

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
                      <div>

                        {/* ************ LAST GAME ************ */}

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
                              <th>OT</th>
                              {gameList.prevGame.score.periods[4] && <th>SO</th>}
                              <th>{gameList.prevGame.score.periods[3] && `Final/OT` || `Final`}</th>
                            </tr>
                            <tr>
                              <td>
                                <img src={this.returnTeamLogo("nhl", gameList.prevGame.schedule.homeTeam.abbreviation)} 
                                  width="20px" height ="20px" alt="" style={{marginRight: "3px"}}/>
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
                                {gameList.prevGame.score.periods[3] &&  gameList.prevGame.score.periods[3].homeScore || null}
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
                                {gameList.prevGame.score.periods[3] &&  gameList.prevGame.score.periods[3].awayScore || null}
                              </td>
                              {gameList.prevGame.score.periods[4] && 
                              <td>
                                {gameList.prevGame.score.periods[4].homeScore}
                              </td>
                              }
                              <td>{gameList.prevGame.score.awayScoreTotal}</td>
                            </tr>
                          </tbody>
                        </table>

                        {/********* NEXT GAME **********/}

                        <div>
                          <span style={{fontSize: "14px", marginRight: "5px", fontWeight: "400"}}>Next Game</span>
                          <Moment format="ddd, MMM Do h:mma" style={{fontSize: "12px"}}>
                            {gameList.nextGame.schedule.startTime}
                          </Moment>
                          <div style={styles.nextGameWrapper}>
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
                            <div> VS </div>
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
                    </div>
                  </div>
                  )

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

                    {/* ************ LAST GAME ************ */}

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
                          <th>{gameList.prevGame.score.quarters[4] && `Final/OT` || `Final`}</th>
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
                          {gameList.prevGame.score.quarters[4] && 
                              <td>
                                {gameList.prevGame.score.quarters[4].homeScore}
                              </td>
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
                            {gameList.prevGame.score.quarters[3] &&  gameList.prevGame.score.quarters[3].awayScore || null}
                          </td>
                          {gameList.prevGame.score.quarters[4] && 
                              <td>
                                {gameList.prevGame.score.quarters[4].homeScore}
                              </td>
                          }
                          <td>{gameList.prevGame.score.awayScoreTotal}</td>
                        </tr>
                      </tbody>
                    </table>

                    {/********* NEXT GAME **********/}

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