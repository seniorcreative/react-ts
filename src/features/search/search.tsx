import React, { Component } from "react";
import SearchResults from "../searchResults/searchResults";

class Search extends Component {
    
    state = {
        searchValue: '',
        repos: []
    };

    render() {
        return <div className="grid grid-cols-2 gap-4 items-center mb-6">
            <h1 className="col-span-3 md:col-span-1">What are you looking for?</h1>
            <div className="flex justify-between col-span-3 md:col-span-1">
                <input name="text" type="text" className="rounded-xl shadow-md w-3/4 m-1 px-2 py-3" placeholder="Search"
                    onChange={event => this.handleOnChange(event)}
                    value={this.state.searchValue} />
                <button className="rounded-xl shadow-md bg-blue text-white w-1/4 m-1 px-1 py-3" onClick={this.handleSearch}>Search</button>
            </div>
            {this.state.repos && (
                <SearchResults searchResults={this.state.repos} />
            )}
        </div>
    }

    handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchValue: event.target.value });
    };

    handleSearch = () => {
        this.fetchData(this.state.searchValue);
    }

    fetchData = (searchInput: any) => {
        const searchUrl = `https://api.github.com/search/repositories?q=${searchInput}`;
        fetch(searchUrl)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                this.setState({repos: jsonData.items})
                console.log(this.state)
            });
    };
}
export default Search;