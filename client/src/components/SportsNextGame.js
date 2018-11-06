import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
// import * as moment from 'moment'

class SportsNextgame extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {

  //   }
  // }

  // nextGame: {
  //   display: "flex",
  //   flexDirection: "column"
  // }

  render() {
    const { gameList, returnTeamLogo, league } = this.props
    if (gameList.nextGame) {
      return (
        <div className="sports-next-game">
          <div className="next-game-title" >
            <span style={{fontSize: "14px", marginRight: "5px", fontWeight: "400"}}>Next Game</span>
            <Moment format="ddd, MMM Do h:mma" style={{fontSize: "12px"}}>
              {gameList.nextGame.schedule.startTime}
            </Moment>
            <div className="next-game-wrapper">
              <div className="team-logo-name">
                  HOME
                <div>
                  <img src={returnTeamLogo(league.toLowerCase(), gameList.nextGame.schedule.homeTeam.abbreviation)} 
                    width="40px" height ="40px" alt="" style={{marginRight: "3px"}}/>
                </div>
                <div>
                  {gameList.nextGame.schedule.homeTeam.abbreviation}
                </div>
              </div>
              <div style={{fontSize: "26px", fontWeight: "400"}}> VS </div>
              <div className="team-logo-name">
              AWAY
                <div>
                  <img src={returnTeamLogo(league.toLowerCase(), gameList.nextGame.schedule.awayTeam.abbreviation)} 
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
    } else return <div>Could not find next game...</div>
  }
}

SportsNextgame.propTypes = {
  prop: PropTypes.array,
}

export default SportsNextgame;