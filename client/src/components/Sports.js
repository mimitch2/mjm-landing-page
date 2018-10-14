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

// const sportsKey = process.env.sportsKey
// console.log(sportsKey)

class Sports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gamesLoaded: false,
      statsLoaded: false,
      standingsLoaded: false
    }
  }

  componentDidMount () {
    console.log("mount")
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
    for (const key in teamObj) {
      teamObj[key].forEach(team => {
        this.getGames(key, team)
        this.getStandings(key)
        this.getStats(key, team)
        
      }
      )
      
    }
  }

  returnWinLoss (league, tm) {
    if (this.state.gamesLoaded && this.state.statsLoaded) {  
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
  }

  async getStats (league, teamcode) {
    try {
      const getStats = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/team_stats_totals.json?team=${teamcode}`,
        {
          type: "GET",
          headers: {
            "Authorization": "Basic " + btoa(keys.sportsKey)
          }
        })
      const stats = await getStats.json()
      console.log(stats)

      this.setState({
        [league]: {...{[teamcode]: stats}, ...this.state[league]},
      })

      setTimeout(() => {
        this.setState({
          statsLoaded: true,
        })
      }, 100);

    } catch (error) {
      console.log(error)
    }
  }

  async getStandings(league) { // FIX add variables for current season
    this.setState({statsLoaded: false})
    try {
      const getStandings = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/standings.json`,
        {
          type: "GET",
          headers: {
            "Authorization": "Basic " + btoa(keys.sportsKey)
          }
        })
      const standings = await getStandings.json()

      this.setState({
        [league]: {standings, ...this.state[league]},
      })

      setTimeout(() => {
        this.setState({
          standingsLoaded: true,
        })
      }, 100);
       
      
    } catch (error) {
      console.log(error)
    }
  }

  async getGames(league, teamcode) { // FIX add variables for current season
    this.setState({gamesLoaded: false})
    try {
      const getPast = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/games.json?team=${teamcode}`,
        {
          type: "GET",
          headers: {
            "Authorization": "Basic " + btoa(keys.sportsKey)
          }
        })
      const resp = await getPast.json()
      resp.team = teamcode
      const games  = await resp
      this.setState({
        [league]: {...{[teamcode]: games}, ...this.state[league]},
      })

      setTimeout(() => {
        this.setState({
          gamesLoaded: true,
        })
      }, 100);
      
  

    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { gamesLoaded, statsLoaded } = this.state
    console.log(gamesLoaded, statsLoaded)
    const { teams } = this.props.userData.sports
  
    if (gamesLoaded && statsLoaded && teams)  {

      return (
        <div className="sports">
          {teams.map((team, i) => {
            // console.log(this.returnWinLoss(team.strLeague, team.strTeamShort))

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