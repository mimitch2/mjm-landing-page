import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keys from "../config.js"

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



class Sports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
  }
  // ***********  FIX need to write function that determines type of leage, then each team in leage then makes calls ******************//
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
    // this.buildDataObject(teamObj)
    for (const key in teamObj) {
      teamObj[key].forEach(team => {
        this.getGames(key, team)
        this.getStandings(key)
      }
      )
      
    }
  }

  // getStandings = (league, team) => {
  //   setTimeout(() => {
  //     const standings = this.state[league].division.map(tm => {
  //       const stand = tm.teamentry.filter(tm => {
  //         const final = tm.filter(team => team.Abbreviation === team)
     
  //       })
  //       return stand
  //     })
  //     console.log(standings)
  //   }, 5000);
    
  //   // 
      
  //   // .find(tm =>{
  //   // return tm.Abbreviation === team}))
    
  // }

  async getStandings(league) {
    try {
      
      const getStandings = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/standings.json`,
        {
          type: "GET",
          headers: {
            "Authorization": "Basic " + btoa(keys.sportsDB)
          }
        })
      const standings = await getStandings.json()

      this.setState({
        [league]: {standings, ...this.state[league]},
      })

      if (standings) {
        // setTimeout(() => {
        this.setState({
          loaded: true,
        })
        // }, 300);
      }
    } catch (error) {
      console.log(error)
    }
  }



  async getGames(league, teamcode) { // add variables for current season
    try {
      const getPast = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/games.json?team=${teamcode}`,
        {
          type: "GET",
          headers: {
            "Authorization": "Basic " + btoa(keys.sportsDB)
          }
        })
      const resp = await getPast.json()
      resp.team = teamcode
      const games  = await resp
      console.log(games)

  
      // const getStandings = await fetch(`https://api.mysportsfeeds.com/v2.0/pull/${league}/2018-2019-regular/standings.json`,
      //   {
      //     type: "GET",
      //     headers: {
      //       "Authorization": "Basic " + btoa(keys.sportsDB)
      //     }
      //   })
      // const standings = await getStandings.json()

      this.setState({
        [league]: {...{[teamcode]: games}, ...this.state[league]},
      })

      if (games) {
        // setTimeout(() => {
        this.setState({
          loaded: true,
        })
        // }, 300);
      }

    } catch (error) {
      console.log(error)
    }
  }

  //rkznb5zmqy8vwh9zegt3w2at
  //DGsm2bbsUs

  render() {
    const { teams } = this.props.userData.sports
    const { NHL, NFL, NBA, MLB } = this.state
    if (this.props.userData.sports && this.state.loaded) {
      return (
        <div className="sports">
          {teams.map((team, i) => 
            <div style={styles.teamLine} key={i}>
              <img src={team.strTeamBadge} width="30px" height ="30px" alt=""/>
              <span className="team-name item" style={styles.item}>           
                {team.strTeam}
              </span>

              {teams.map((team, i) => { 
                const flrStanding = this.state[team.strLeague]
                // console.log(flrStanding)
                return (
                  <div key={i}>
                    
                    <div></div>
                    
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

Sports.propTypes = {
  prop: PropTypes.array,
}

export default Sports;