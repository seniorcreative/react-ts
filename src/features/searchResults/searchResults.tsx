import React, { Component } from "react";
import RepoCard from "../repoCard/repoCard"
import { GitRepoT } from "../../@types/GitRepo";


type Props = {
    searchResults: Array<GitRepoT>
}

class SearchResults extends Component<Props> {
    render() {
        return <div className="col-span-3">
            <div className="grid grid-cols-3">
                <div className="col-span-3 my-1">Found <strong>{this.props.searchResults.length}</strong> result{this.props.searchResults.length === 1 ? '' : 's'}</div>
                {this.props.searchResults.map((searchResult, index) =>
                    <RepoCard key={index} searchResult={searchResult} />
                )}
            </div>
        </div>
    };
}
export default SearchResults;