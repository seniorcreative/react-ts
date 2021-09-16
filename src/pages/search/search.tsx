import React, { Component } from "react";
import SearchResults from "../../features/searchResults/searchResults";
import Pagination from "../../features/pagination/pagination";

interface Props {
    history: {
        push(url: string): void;
    };
}

class Search extends Component<Props> {

    state = {
        searchValue: '',
        repos: [],
        pageNum: 1,
        perPage: 12,
        total_count: 0
    };

    componentDidMount() {
        const currentUrlParams = new URLSearchParams(window.location.search);
    
        if (currentUrlParams.get('q')) {
            this.setState({
                searchValue: currentUrlParams.get('q'), 
                pageNum: currentUrlParams.get('page_num')
            },
            () => {
                this.fetchData();
            }
            );
        }
    }

    componentDidUpdate(prevProps: any) {
        const currentUrlParams = new URLSearchParams(window.location.search);
        if (currentUrlParams.get('page_num') && currentUrlParams.get('page_num') !== this.state.pageNum.toString()) {
            this.setState({ 
                pageNum: Number(currentUrlParams.get('page_num'))
            },
            () => {
                this.fetchData();
            }
            )
        }
    }

    render() {
        return <div className="grid grid-cols-3 gap-4 items-center mb-6">
            <p className="col-span-1 md:col-span-1 text-2xl font-bold">Git repo search</p>
            <div className="flex justify-between col-span-2 md:col-span-2">
                <form className="flex w-full" onSubmit={this.handleSearch}>
                    <input name="text" type="text" className="rounded-xl shadow-md w-3/4 m-1 px-2 py-3" placeholder="Search"
                        onChange={event => this.handleOnChange(event)}
                        value={this.state.searchValue} />
                    <button type="submit" disabled={!this.state.searchValue} className="rounded-xl shadow-md bg-black disabled:bg-black-200 disabled:text-gray disabled:cursor-not-allowed text-white w-1/4 m-1 px-1 py-3" onClick={this.handleSearch}>Search</button>
                </form>
            </div>
            {this.state.repos.length > 0 && (
                <div className="col-span-3">
                    <SearchResults searchResults={this.state.repos} pageNum={this.state.pageNum} searchQuery={this.state.searchValue} />
                    <Pagination total_count={this.state.total_count} history={this.props.history} />
                </div>
            )}
        </div>
    }

    handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchValue: event.target.value });
    };

    handleSearch = (e: any, rehydrate:Boolean = false) => {
        if (e) e.preventDefault();
        const currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('q', this.state.searchValue);
        currentUrlParams.set('page_num', this.state.pageNum.toString());
        if (!rehydrate) this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString())
        this.fetchData();
    }

    fetchData = () => {
        const searchUrl = `https://api.github.com/search/repositories?q=${this.state.searchValue}&page=${this.state.pageNum}&per_page=${this.state.perPage}`;
        fetch(searchUrl, { headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${process.env.REACT_APP_PERSONAL_TOKEN}`
        }})
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                this.setState({ repos: jsonData.items })
                this.setState({ total_count: jsonData.total_count })
            });
    };
}

export default Search;