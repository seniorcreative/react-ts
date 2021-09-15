import React, { Component } from "react";
import SearchResults from "../../features/searchResults/searchResults";

class Search extends Component {

    state = {
        searchValue: '',
        repos: [],
        pageNum: 1,
        perPage: 10
    };

    render() {
        return <div className="grid grid-cols-3 gap-4 items-center mb-6">
            <p className="col-span-1 md:col-span-1 text-2xl font-bold">Git repo search</p>
            <div className="flex justify-between col-span-2 md:col-span-2">
                <form className="flex w-full" onSubmit={this.handleSearch}>
                <input name="text" type="text" className="rounded-xl shadow-md w-3/4 m-1 px-2 py-3" placeholder="Search"
                    onChange={event => this.handleOnChange(event)}
                    value={this.state.searchValue} />
                <button type="submit" className="rounded-xl shadow-md bg-black text-white w-1/4 m-1 px-1 py-3" onClick={this.handleSearch}>Search</button>
                </form>
            </div>
            {this.state.repos.length > 0 && (
                <SearchResults searchResults={this.state.repos} pageNum={this.state.pageNum} />
            )}
        </div>
    }

    handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchValue: event.target.value });
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('page_num', this.state.pageNum.toString());
        this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString())
    };

    handleSearch = (e: any) => {
        e.preventDefault()
        this.fetchData();
    }

    fetchData = () => {
        const searchUrl = `https://api.github.com/search/repositories?q=${this.state.searchValue}&page=${this.state.pageNum}&per_page=${this.state.perPage}`;
        fetch(searchUrl)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                this.setState({repos: jsonData.items})
            });
    };
}
export default Search;