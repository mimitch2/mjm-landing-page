import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

    }
  }

  async componentDidMount () {
    // // https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-2019-regular/scoreboard.json?fordate=20181004
    // try {
    //   const getData = await fetch('https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-2019-regular/overall_team_standings.json',
    //     {
    //       type: "GET",
    //       headers: {
    //         "Authorization": "Basic " + btoa("65e9a273-7f71-46dd-883a-159a4c" + ":" + "Bladerunner80")
    //       }
    //     })
    //   const sportsInfo = await getData.json()

    //   // console.log(sportsInfo)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  render() {
    const { teams } = this.props.userData.sports
    if (this.props.userData.sports) {
      return (
        <div className="sports">
          {teams.map((team, i) => 
            <div style={styles.teamLine} key={i}>
              <img src={team.strTeamBadge} width="30px" height ="30px" alt=""/>
              <span className="team-name item" style={styles.item}>{team.strTeam}</span>
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