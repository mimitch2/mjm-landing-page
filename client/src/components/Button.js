import React from 'react'
// import PropTypes from 'prop-types'

const Button = (props) => {

  const button = document.getElementById(props.button)
  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName === "Enter") {
      // document.getElementById(props.button).click()
      handleClick(props.clickInfo)
    }
  });
  

  const handleClick = (info) => {
    if (props.input.length > 1) {
      button.style.transform = "scale(.98)"
      button.style.color = "grey"
      setTimeout(() => {
        button.style.transition = ".05s"
        button.style.transform = "scale(1)"
        button.style.color = props.color
      }, 40);
      props.click(info, props.button)
    }
  }

  const styles = {
    root: {
      userSelect: "none",
      background: props.background,
      height: props.height,
      width: props.width,
      color: props.color,
      cursor: "pointer",
      padding: "2px",
      textTransform: "uppercase",
      margin: "0px 4px 0px 4px",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }
  return (
    <div style={styles.root} id={props.button} 
      onClick={() => handleClick(props.clickInfo)}
      unselectable="on"
    >
      {props.label}
    </div>
  )
}

// Button.propTypes = {
//   prop: PropTypes.array,
// }

export default Button;