import React from 'react'
import PropTypes from 'prop-types'

const styles ={
  content: {
    display: "flex",
  },
  item: {
    marginLeft: "2px",
    marginRight: "2px"
  }
}

const Sports = (props) => {
  const { include, teams } = props.data
  return (
    <div className="sports">
      {teams.map((team, i) => 
        <div style={styles.content} key={i}>
          <span className="team-name item" style={styles.item}>{team}</span>
        </div>
      )}
    </div>
  )
}

Sports.propTypes = {
  data: PropTypes.object,
}

export default Sports;