import React from 'react'
import { connect } from 'react-redux'

class News extends React.Component {
    renderNews = news => {
        return news.map((article, index) => (
            <div key={ index } className="article">
                <a className='headline' href={article.url} target="_blank"><h4>{article.headline}</h4></a>
                <p>{article.summary}</p>
                <hr className='hrCenter' />
            </div>
        ))
    }

    render() {
        return(
            <>
                <br />
                <h2>{this.props.news.length > 0 ? 'News' : ''}</h2>
                <div id="news">
                    {/* <h2>{this.props.news.length > 0 ? 'News' : ''}</h2> */}
                    {this.props.news ? this.renderNews(this.props.news) : ''}
                </div>
            </>
        )
    }
}

const mSTP = state => ({
    news: state.news
})

export default connect(mSTP)(News);