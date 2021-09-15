import React, { Component } from "react";
import RepoCard from "../repoCard/repoCard"
import { GitRepoT } from "../../@types/GitRepo";


type Props = {
    searchResults: Array<GitRepoT>,
    pageNum: Number
}

class SearchResults extends Component<Props> {
    render() {
        return <div className="col-span-3">
            <div className="grid grid-cols-3 gap-2 md:gap-4">
                <div className="col-span-3 my-1">Showing <strong>{this.props.searchResults.length}</strong> result{this.props.searchResults.length === 1 ? '' : 's'} for page <strong>{this.props.pageNum}</strong></div>
                {this.props.searchResults.map((searchResult, index) =>
                    <RepoCard key={index} searchResult={searchResult} />
                )}
            </div>
        </div>
    };
}
export default SearchResults;