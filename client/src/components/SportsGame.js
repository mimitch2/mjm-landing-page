import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Moment from 'react-moment';
// import * as moment from 'moment'

class SportsGame extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {

  //   }
  // }


  
  render() {
    const { gameList, team, returnTeamLogo, league } = this.props
    return (
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
          {(team.info.strLeague === "NHL" &&
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
                  src={returnTeamLogo(league.toLowerCase(), gameList.prevGame.schedule.homeTeam.abbreviation)} 
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
                <img src={returnTeamLogo("nhl", gameList.prevGame.schedule.awayTeam.abbreviation)} 
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
          ) ||  (team.info.strLeague === "NFL" &&
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
                 <img src={returnTeamLogo(league.toLowerCase(), gameList.prevGame.schedule.homeTeam.abbreviation)} 
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
                 <img src={returnTeamLogo(league.toLowerCase(), gameList.prevGame.schedule.awayTeam.abbreviation)} 
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
          ) || (team.info.strLeague === "NBA" &&
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
               <img src={returnTeamLogo(league.toLowerCase(), gameList.prevGame.schedule.homeTeam.abbreviation)} 
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
                  {gameList.prevGame.score[4].homeScore}
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
               <img src={returnTeamLogo("nba", gameList.prevGame.schedule.awayTeam.abbreviation)} 
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
                {gameList.prevGame.score[4].awayScore}
              </td>)
              || <td>-</td>
             }
             <td>{gameList.prevGame.score.awayScoreTotal}</td>
           </tr>
         </tbody>) 
         || team.info.strLeague === "MLB" &&
          <tbody></tbody>
                          
          }

        </table>
      </div>
    )
  }
}

// SportsGame.propTypes = {
//   prop: PropTypes.array,
// }

export default SportsGame;