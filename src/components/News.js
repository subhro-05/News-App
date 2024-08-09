import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
        };
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=b15f0247678c407183080164a8c48b9b&page=1&pageSize=20";
        let data = await fetch(url);
        let perseData = await data.json();
        console.log(perseData);
        this.setState({ articles: perseData.articles, totalResults: perseData.totalResults });
    }

    handlePrev = async () => {
        console.log("Previes");

        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b15f0247678c407183080164a8c48b9b&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let perseData = await data.json();
        console.log(perseData);
        this.setState({
            page: this.state.page - 1,
            articles: perseData.articles
        })
    }

    handleNext = async () => {
        console.log("Next");
        if( !this.state.page + 1 > Math.ceil(this.state.totalResults/20)){
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b15f0247678c407183080164a8c48b9b&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let perseData = await data.json();
            console.log(perseData);
            this.setState({
                page: this.state.page + 1,
                articles: perseData.articles
            });
        }
    }


    render() {
        return (
            <div className='container my3'>
                <h2>DailyNews - Top Headline</h2>
                <div className="row" >
                    {this.state.articles.map((element) => (
                        <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    ))}

                </div>
                <div className="container d-flex justify-content-between mb-4">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&larr; Previes</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div>  
            </div>
        )
    }
}

export default News
