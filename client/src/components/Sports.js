import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import keys from "../config.js"
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

let counter = 0;
const auth = {
  type: "GET",
  headers: {"Authorization": "Basic " + btoa(keys.sportsKey)}
} 

// const sportsKey = process.env.sportsKey
// console.log(sportsKey)

class Sports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
  }

  componentDidMount () {
    this.parseTeamInfo()
  }

  parseTeamInfo = () => {
    const teamObj = {}
    this.props.userData.sports.teams.forEach(team =>{
      const teamLeg = team.strLeague
      if (!(teamLeg in teamObj)) {
        teamObj[teamLeg] = []
      } 
      teamObj[teamLeg] = [...teamObj[teamLeg], team.strTeamShort]
    })  

    console.table(teamObj)


    this.getStandings(teamObj)
 
  }

  async getStandings(teamObj) { // FIX add variables for current season
    const newObj = {...teamObj}
    try {
      for (const league in teamObj) {
        const getStandings = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/standings.json`, auth)
        const result = await getStandings.json()
        newObj[league].standings = result
        // this.setState({
        //   [league]: {standings, ...this.state[league]},
        // })
      }

      console.table(newObj)
    
      // setTimeout(() => {
      //   this.setState({
      //     standingsLoaded: true,
      //   })
      // }, 100);
      
    } catch (error) {
      console.log(error)
    }
  }

  returnWinLoss (league, tm) {
    // debugger;      
    // console.log(this.state[league])
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

  // 1. send getData entire teamObj
  // 2. determine how many legues, and how many teams in each league there are
  // 3. inside getData, loop through leagues and call getStandings by passing the lesgues and the league count

  async getData (league, teamcode) {
    
    try {
      const getStats = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/team_stats_totals.json?team=${teamcode}`, auth)
      const getGames = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/games.json?team=${teamcode}`, auth)
      // const getStandings = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/standings.json`, auth)
      
      
      const res = await Promise.all([getGames])
      const dataArr = res.map(r => r.json())
      const [stats, standings, games] = await Promise.all(dataArr)
      // console.log(stats, standings, games)
      const tempState = {
        ...this.state[league],
        [teamcode]: {games: games, stats: stats}
      }
      // tempState.standings = standings
      // tempState[teamcode].games = games
      // tempState[teamcode].stats = stats
      // this.setState({
      //   [league]: {...tempState, standings}})
      
      if (standings) {
        this.setState({
          [league]: {...tempState, standings}
        })
        setTimeout(() => {
          this.setState({
            loaded: true
          })
        }, 200);
       
      }
   
      // console.log(stats, standings, games)





      // const stats = await getStats.json()
      // console.log(stats)

      // this.setState({
      //   [league]: {...{[teamcode]: stats}, ...this.state[league]},
      // })

      // setTimeout(() => {
      //   this.setState({
      //     statsLoaded: true,
      //   })
      // }, 100);

    } catch (error) {
      console.log(error)
    }
  }



  // async getGamesAndStats(teamObj) { // FIX add variables for current season
  //   try {

  //     for (const league in object) {
  //       for (const key in object) {
  //         if (object.hasOwnProperty(key)) {
  //           const element = object[key];
            
  //         }
  //       }
  //       const getStats = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/team_stats_totals.json?team=${teamcode}`, auth)
  //       const getGames = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/games.json?team=${teamcode}`, auth)
  //     }
     


  //     const resp = await getPast.json()
  //     resp.team = teamcode
  //     const games  = await resp
  //     this.setState({
  //       [league]: {...{[teamcode]: games}, ...this.state[league]},
  //     })

  //     setTimeout(() => {
  //       this.setState({
  //         gamesLoaded: true,
  //       })
  //     }, 100);
      
  

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  render() {
    const { loaded } = this.state
    const { teams } = this.props.userData.sports
  
    if (loaded && teams)  {

      return (
        <div className="sports">
          {teams.map((team, i) => {
            console.log(this.returnWinLoss(team.strLeague, team.strTeamShort))

            return (
              <div style={styles.teamLine} key={i}>
                <img src={team.strTeamBadge} width="30px" height ="30px" alt=""/>
                <span className="team-name item" style={styles.item}>           
                  {team.strTeam}
                </span>

                {team.strLeague === "NHL" &&
              <div key={i}> 
                <div>
                  {/* {teamData.w} */}
                </div>
              </div>
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