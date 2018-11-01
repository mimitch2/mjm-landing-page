import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
// import 'moment-timezone';

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
  time: {
    display: "flex",
    justifyContent: "flex-start",
    paddingTop: "4px",
    fontSize: "14px",
    color: "black"
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
    if (prevProps.userData !== this.props.userData){
      this.getData()
    }
    // if (prevProps.newsArticles !== this.props.newsArticles) {
    //   this.setState({news: this.props.newsArticles})
    // }

  }

  async getData (options) {
    try {
      const newsSources = await this.props.userData.news.sources.map(src =>{
        return src.id
      }).join()

      options ? this.props.loadNewsArticles(options) : this.props.loadNewsArticles(newsSources)
   
    } catch (error) {
      document.getElementById('news').innerHTML = error
      console.log(error);
    }  
  }



  render() {
    if (this.props.newsArticlesLoaded) {
      const { articles } = this.props.newsArticles

      return (
        <div className="news" id="news" style={styles.root}>
          {this.props.newsArticles.status === "ok" && (articles.map((article, i) => 
            <div style={styles.content} key={i}>
              <div className="img-source" style={styles.imgSource}>
                <a href={article.urlToImage} target="_blank" 
                  rel='noopener noreferrer' className="img-link">
                  <img src={article.urlToImage} style={styles.image} 
                    alt="" className="pic"/>
                </a>
                <div className="source" style={styles.sourceName}>{article.source.name}
                </div>
                <Moment format="MM/DD/YYYY hh:mma" style={styles.time}>          
                  {article.publishedAt} 
                </Moment>
              </div>
              <div className="news-text" style={styles.newsText}>
                <a href={article.url} target="_blank" rel='noopener noreferrer'> 
                  <p className="article-title" style={styles.title}>
                    {article.title}
                  </p>
                </a>
                <div className="article-body" style={styles.article}>
                  {article.content}
                </div>
              </div>
            </div>
          ) || <div>Nothing here</div>) }
        </div>
      )
    } else {
      return (
        <div className="loading" style={styles.loading}>
          <i className="fal fa-sync spin-sync" style={styles.icon}></i>
        </div>
      )
    }
  }
}

News.propTypes = {
  prop: PropTypes.array,
}

export default News;