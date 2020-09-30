import React from 'react'
import { connect } from 'react-redux'

class News extends React.Component {
    renderNews = news => {
        return news.map((article, index) => (
            <div key={ index } className="article">
                <a href={article.url}><h4>{article.headline}</h4></a>
                <p>{article.summary}</p>
            </div>
        ))
    }

    render() {
        return(
            <div id="news">
                {this.props.news ? this.renderNews(this.props.news) : ''}
            </div>
        )
    }
}

const mSTP = state => ({
    news: state.news
})

export default connect(mSTP)(News);