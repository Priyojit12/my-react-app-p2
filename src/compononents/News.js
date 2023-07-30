import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  articles = [];
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
  }
  async componentDidMount() {
    let url =
    `https://newsapi.org/v2/everything?q=apple&from=2023-07-28&to=2023-07-28&sortBy=popularity&apiKey=b7c7a9b0544d4a1393dc758de737d379&page=1&pageSize=${this.props.MyPageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles });
  }
  onPrevBtn = async () => {
    if (this.state.page > Math.ceil(this.state.totalResults / this.props.MyPageSize)) {
    } else {
      let url = `https://newsapi.org/v2/everything?q=apple&from=2023-07-28&to=2023-07-28&sortBy=popularity&apiKey=b7c7a9b0544d4a1393dc758de737d379&page=${
        this.state.page - 1
      }&pageSize=${this.props.MyPageSize}`;
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);

      this.setState({
        page: this.state.page - 1,
        articles: parseData.articles,
      });
    }
  };
  onNextBtn = async () => {
    let url = `https://newsapi.org/v2/everything?q=apple&from=2023-07-28&to=2023-07-28&sortBy=popularity&apiKey=b7c7a9b0544d4a1393dc758de737d379&page=${
      this.state.page + 1
    }&pageSize=${this.props.MyPageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);

    this.setState({
      page: this.state.page + 1,
      articles: parseData.articles
    });
  };
  render() {
    return (
      <div className="container">
        <h1 className="text-center">NewsMediax - Heart On fire</h1>
        <div className="row">
          {this.state.articles &&
            this.state.articles.map((Element) => {
              return (
                <div
                  className="col-md-4"
                  key={Element.url}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <NewsItem
                    title={
                      Element.title ? Element.title.slice(0, 45) + "... " : " "
                    }
                    description={
                      Element.description
                        ? Element.description.slice(0, 84)
                        : "  "
                    }
                    imageUrl={Element.urlToImage}
                    newsUrl={Element.url}
                  />
                </div>
              );
            })}
          ;
          <div className="d-flex justify-content-between">
            <button
              disabled={this.state.page === 1}
              type="button"
              onClick={this.onPrevBtn}
              className="btn btn-primary my-4"
            >
              &laquo; Previous
            </button>
            <button
              type="button"
              disabled={!this.state.page > Math.ceil(this.state.totalResults / this.props.MyPageSize)}
              className="btn btn-primary my-4"
              onClick={this.onNextBtn}
            >
              Next &raquo;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
