import React, { Component } from 'react'
import Moment from 'react-moment';
import * as moment from 'moment'


class SportsGames extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


   

  render() {
    const { gameList, type } = this.props
    // const game = () => {
    //   if (this.props.type === "last" ) {
    //     return "prevGame"
    //   } else if (this.props.type === "today" ) {
    //     return "currentGame"
    //   } 
    //   return "nextGame"
    // }
    console.log(gameList[type], type)

    if (gameList[type] !== null && 1 === 1) {
      return (
        <div style={{padding: "0px 20px 0px 0px"}}>
          <span style={{fontSize: "14px", marginRight: "5px", fontWeight: "400"}}>
            {type === "prevGame" && `Last Game` ||
             type === "currentGame" && `Today's Game` ||
             type === "nextGame"  && `Next Game`}
          </span>
          <Moment format="ddd, MMM Do h:mma" style={{fontSize: "12px"}}>
            {gameList[type].schedule.startTime}
          </Moment>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>1rst</th>
                <th>2nd</th>
                <th>3rd</th>
                <th>OT</th>
                {gameList[type].score.periods[4] && <th>SO</th>}
                <th>{gameList[type].score.periods[3] && `Final/OT` || `Final`}</th>
              </tr>

              {gameList[type].score.periods.length > 0 &&
                <tr>
                  <td>
                    {/* <img src={team.strTeamBadge} width="20px" height ="20px" alt="" style={{marginRight: "3px"}}/> */}
                    {gameList[type].schedule.homeTeam.abbreviation}
                  </td>
                  <td>
                    {gameList[type].score.periods[0].homeScore}
                  </td>
                  <td>
                    {gameList[type].score.periods[1].homeScore}
                  </td>
                  <td>
                    {gameList[type].score.periods[2].homeScore}
                  </td>
                  <td>
                    {gameList[type].score.periods[3] &&  gameList[type].score.periods[3].homeScore || null}
                  </td>

                  {gameList[type].score.periods[4] && 
                  <td>
                    {gameList[type].score.periods[4].homeScore}
                  </td>
                  }
                  <td>
                    {gameList[type].score.homeScoreTotal}
                  </td>
                </tr>
              }
              {gameList[type].score.periods.length > 0 &&
              <tr>
                <td>
                  {gameList[type].schedule.awayTeam.abbreviation} 
                </td>
                <td>
                  {gameList[type].score.periods[0].awayScore}
                </td>
                <td>
                  {gameList[type].score.periods[1].awayScore}
                </td>
                <td>
                  {gameList[type].score.periods[2].awayScore}
                </td>
                <td>
                  {gameList[type].score.periods[3] &&  gameList[type].score.periods[3].awayScore || null}
                </td>
                {gameList[type].score.periods[4] && 
                    <td>
                      {gameList[type].score.periods[4].homeScore}
                    </td>
                }
                <td>{gameList[type].score.awayScoreTotal}</td>
              </tr>
              }
            </tbody>
          </table>
        </div>
      )} else {
      return <div>There are no games today</div>
    }
  }
}

export default SportsGames;