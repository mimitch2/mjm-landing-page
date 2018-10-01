import React, { Component } from 'react'
import PropTypes from 'prop-types'


const styles ={
  root: {
    // display: "flex",

  },
  content: {
    display: "flex",
    borderBottom: "1px solid grey",
    padding: "8px 0px 8px 0px"
  },
  newsText: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontSize: "1.2em",
    cursor: "pointer",
    fontWeight: "400",
    paddingLeft: "10px",
    marginRight: "4px",
    textAlign: "left"
  },
  imgSource: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  sourceName: {
    display: "flex",
    justifyContent: "flex-start",
    paddingTop: "4px",
    fontSize: "14px",
    color: "red"
  },
  image: {
    width: "100%",
    // height: "30%",
    cursor: "pointer"
  },
  article: {
    textAlign: "left",
    paddingLeft: "10px"
  },
  loading: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: "24px",
  }
}

class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news: null
    }
  }

  componentDidMount = () => {
    this.getData()
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.data !== this.props.data || prevProps.userName !== this.props.userName){
      this.getData()
    }
  }

  getData = () => {
    const newsSources = this.props.data.sources.join()
    fetch(`https://newsapi.org/v2/top-headlines?sources=${newsSources}&apiKey=cac7992187f24fc493e8b132bee398bb`).then((res) => {
      return res.json()
    }).then((news) => {
      this.setState({
        news: news,
      })     
    })
  }
  
  render() {
    if (this.state.news) {
      const { articles } = this.state.news
      return (
        <div className="news" style={styles.root}>
          {articles.map((article, i) => 
            <div style={styles.content} key={i}>
              <div className="img-source" style={styles.imgSource}>
                <a href={article.urlToImage} target="_blank" 
                  rel='noopener noreferrer' className="img-link">
                  <img src={article.urlToImage} style={styles.image} 
                    alt="" className="pic"/>
                </a>
                <div className="source" style={styles.sourceName}>{article.source.name}</div>
              </div>
              <div className="news-text" style={styles.newsText}>
                <a href={article.url} target="_blank" rel='noopener noreferrer'> 
                  <p className="article-title" style={styles.title}>{article.title}</p>
                </a>
                <div className="article-body" style={styles.article}>{article.content}</div>
              </div>
            </div>
          )}
        </div>
      )
    } else {
      return (
        <div className="loading" style={styles.loading}>
          <i className="fal fa-sync" style={styles.icon}></i>
        </div>
      )
    }
  }
}

News.propTypes = {
  prop: PropTypes.array,
}

export default News;