import React, { Component } from 'react'
import * as moment from 'moment'
import SportsStats from './SportsStats'
import SportsGame from './SportsGame'
import SportsNextGame from './SportsNextGame'

import './Sports.scss'

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
            const ranking = rankings[team.info.strLeague].teams.find(tm => tm.team.abbreviation === team.info.strTeamShort)
            const { rank, divisionName } = ranking.divisionRank   
            const { stats } = ranking
            const gameList = this.findGamesByDate(team.games.games)

            return (
              <div className="team-line" key={i}>

                <div className="team">

                  <SportsStats 
                    team={team}
                    rank={rank}
                    divisionName={divisionName}
                    stats={stats}
                  />
             
                  <SportsGame
                    gameList={ gameList }
                    team={ team }
                    teamsList={ this.props.teamsList }
                    returnTeamLogo={ this.returnTeamLogo }
                    league={ team.info.strLeague }
                  />

                  <SportsNextGame
                    gameList={ gameList }
                    returnTeamLogo={ this.returnTeamLogo }
                    league={ team.info.strLeague }
                  />

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